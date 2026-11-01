import { expect, test } from '@playwright/test'

const cases = [
  { slug: 'bheex', es: 'Bheex: SaaS de atención al cliente con IA', en: 'Bheex: AI customer service SaaS' },
  { slug: 'price-match-automation', es: 'Automatización de price match y reembolsos', en: 'Price match and refund automation' },
  { slug: 'quindio-inteligente-iot', es: 'Quindío Inteligente: ingesta IoT serverless', en: 'Quindío Inteligente: serverless IoT ingestion' },
  { slug: 'warehouse-conveyor-backend', es: 'Backend de banda transportadora de bodega', en: 'Warehouse conveyor backend' },
]

test.describe('Navigation', () => {
  test('opens a case from the home page and comes back to the cases section', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: cases[0].es }).click()

    await expect(page).toHaveURL('/casos/bheex/')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(cases[0].es)

    // The featured case has its own section on the home page.
    await page.getByRole('link', { name: 'Volver a casos' }).first().click()
    await expect(page).toHaveURL('/#featured')
    await expect(page.locator('#featured')).toBeInViewport()
  })

  test('a case that is a row on the home page comes back to the cases section', async ({ page }) => {
    await page.goto('/casos/price-match-automation/')
    await page.getByRole('link', { name: 'Volver a casos' }).first().click()
    await expect(page).toHaveURL('/#cases')
    await expect(page.locator('#cases')).toBeInViewport()
  })

  test('browser back returns from a case to the page the visitor came from', async ({ page }) => {
    await page.goto('/en/')
    await page.getByRole('link', { name: cases[1].en }).click()
    await expect(page).toHaveURL('/en/cases/price-match-automation/')

    await page.goBack()
    await expect(page).toHaveURL('/en/')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Nicolás Durán Garcés')
  })

  for (const entry of cases) {
    for (const lang of ['es', 'en'] as const) {
      const path = lang === 'es' ? `/casos/${entry.slug}/` : `/en/cases/${entry.slug}/`
      test(`${path} states role, decisions and result`, async ({ page }) => {
        await page.goto(path)
        const labels =
          lang === 'es'
            ? ['Mi rol', 'Decisiones clave', 'Qué lo hacía difícil', 'Resultado']
            : ['My role', 'Key decisions', 'What made it hard', 'Result']
        await expect(page.getByRole('heading', { level: 1 })).toHaveText(entry[lang])
        for (const label of labels) {
          await expect(page.getByRole('heading', { level: 2, name: label })).toBeAttached()
        }
        const decisions = await page.getByRole('heading', { level: 3 }).count()
        expect(decisions).toBeGreaterThanOrEqual(2)
        expect(decisions).toBeLessThanOrEqual(3)
      })
    }
  }

  test('lets keyboard users jump past the navigation', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Tab')
    const skip = page.getByRole('link', { name: 'Saltar al contenido' })
    await expect(skip).toBeFocused()
    await expect(skip).toBeVisible()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL('/#main')
    // Focus moves into the content column, not into the side column with the name, and it gets no ring.
    await expect(page.locator('#main')).toBeFocused()
    await expect(page.locator('#main')).toHaveCSS('outline-style', 'none')
  })

  test('marks the section being read in the side column nav', async ({ page, isMobile }) => {
    test.skip(isMobile, 'On phones the section links live in the full screen menu, covered by quality.spec.ts')
    await page.goto('/')
    const nav = page.getByRole('navigation')
    await expect(nav.getByRole('link', { name: 'Sobre mí' })).toHaveAttribute('aria-current', 'location')

    await page.locator('#experience').evaluate((element) => element.scrollIntoView({ block: 'start' }))
    await expect(nav.getByRole('link', { name: 'Trayectoria' })).toHaveAttribute('aria-current', 'location')
    await expect(nav.getByRole('link', { name: 'Sobre mí' })).not.toHaveAttribute('aria-current')
  })

  test('keeps the side column in place while the sections scroll, and shows the year in view', async ({ page, isMobile }) => {
    test.skip(isMobile, 'The side column is sticky from the lg breakpoint')
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
    const side = page.locator('header#top')
    const before = await side.boundingBox()
    await page.locator('#experience').evaluate((element) => element.scrollIntoView({ block: 'start' }))
    await expect(page.locator('#experience')).toBeInViewport()
    const after = await side.boundingBox()
    expect(after?.y).toBe(before?.y)
    expect(after?.height).toBeCloseTo(900, 0)

    const now = page.locator('.now')
    await expect(now).toHaveAttribute('data-live', '')
    await expect(now).toHaveCSS('opacity', '1')
    await expect(now).toContainText(/^Trayectoria\s*\d{4}/)

    await page.locator('#contact').evaluate((element) => element.scrollIntoView({ block: 'start' }))
    await expect(now).not.toHaveAttribute('data-live', /.*/)
  })

  // The side column never scrolls inside. It is pinned only when the window is tall enough for all of it; otherwise it is
  // a normal block and the page scroll reaches everything. Either way nothing inside may be clipped.
  for (const path of ['/', '/en/']) {
    for (const size of [
      { width: 1440, height: 900 },
      { width: 1440, height: 720 },
      { width: 1280, height: 720 },
      { width: 1024, height: 768 },
    ]) {
      test(`${path} side column at ${size.width}x${size.height} is never clipped and never scrolls inside`, async ({ page, isMobile }) => {
        test.skip(isMobile, 'The side column starts at the lg breakpoint')
        await page.setViewportSize(size)
        await page.goto(path)
        const side = await page.locator('header#top').evaluate((element) => {
          const style = getComputedStyle(element)
          const viewport = window.innerHeight
          const lowest = Math.max(
            ...[...element.querySelectorAll<HTMLElement>('*')]
              .filter((child) => child.getClientRects().length > 0)
              .map((child) => child.getBoundingClientRect().bottom),
          )
          return {
            overflowY: style.overflowY,
            sticky: style.position === 'sticky',
            scrollHeight: element.scrollHeight,
            clientHeight: element.clientHeight,
            lowestBottom: lowest,
            viewport,
          }
        })
        expect(['auto', 'scroll']).not.toContain(side.overflowY)
        if (side.sticky) {
          expect(side.scrollHeight).toBeLessThanOrEqual(side.clientHeight)
          expect(side.lowestBottom).toBeLessThanOrEqual(side.viewport)
        }
      })
    }
  }

  test('the side column is pinned at the laptop sizes it is designed for', async ({ page, isMobile }) => {
    test.skip(isMobile, 'The side column starts at the lg breakpoint')
    for (const size of [
      { width: 1440, height: 720 },
      { width: 1280, height: 720 },
      { width: 1440, height: 900 },
    ]) {
      await page.setViewportSize(size)
      await page.goto('/')
      await expect(page.locator('header#top')).toHaveCSS('position', 'sticky')
      await expect(page.locator('.now')).toBeVisible()
    }
  })

  test('keeps external links explicit and safe, and serves the CV for download', async ({ page, request }) => {
    await page.goto('/')
    // The side column and the contact section both carry these links; each one has to be right.
    for (const group of [page.getByRole('link', { name: /^GitHub/ }), page.getByRole('link', { name: /^LinkedIn/ })]) {
      expect(await group.count()).toBeGreaterThanOrEqual(2)
      for (const link of await group.all()) {
        await expect(link).toHaveAttribute('target', '_blank')
        await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      }
    }
    const github = page.getByRole('link', { name: /^GitHub/ }).first()
    const linkedin = page.getByRole('link', { name: /^LinkedIn/ }).first()
    await expect(github).toHaveAttribute('href', 'https://github.com/NicolasDuranGarces')
    await expect(github).toHaveAttribute('rel', 'noopener noreferrer')
    await expect(github).toHaveAttribute('target', '_blank')
    await expect(linkedin).toHaveAttribute('href', 'https://www.linkedin.com/in/garcesnicolas')
    await expect(linkedin).toHaveAttribute('rel', 'noopener noreferrer')

    const cv = page.getByRole('link', { name: 'Descargar CV' }).first()
    await expect(cv).toHaveAttribute('href', '/cv/nicolas-duran-garces-cv-es.pdf')
    await expect(cv).toHaveAttribute('download', '')
    const response = await request.get('/cv/nicolas-duran-garces-cv-es.pdf')
    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toBe('application/pdf')

    await page.goto('/en/')
    await expect(page.getByRole('link', { name: 'Download resume' }).first()).toHaveAttribute(
      'href',
      '/cv/nicolas-duran-garces-resume-en.pdf',
    )
    expect((await request.get('/cv/nicolas-duran-garces-resume-en.pdf')).status()).toBe(200)
  })

  test('shows no phone number anywhere in the page', async ({ page }) => {
    for (const path of ['/', '/en/']) {
      await page.goto(path)
      expect(await page.locator('body').innerText()).not.toMatch(/\+57|305\s?797/)
    }
  })
})

test.describe('Missing pages', () => {
  for (const path of ['/no-existe', '/no-existe/', '/casos/no-existe/', '/en/cases/no-existe/', '/en/casos/bheex/']) {
    test(`${path} answers 404 with the branded page, not the home page`, async ({ page }) => {
      const response = await page.goto(path)
      expect(response?.status()).toBe(404)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Página no encontrada\s+Page not found/)
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
    })
  }

  test('offers a way home in each language', async ({ page }) => {
    await page.goto('/no-existe')
    await page.getByRole('link', { name: 'Back to home' }).click()
    await expect(page).toHaveURL('/en/')
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  })

  test('redirects a folder URL without trailing slash to the slash version', async ({ request }) => {
    const response = await request.get('/casos/bheex', { maxRedirects: 0 })
    expect(response.status()).toBe(301)
    expect(response.headers()['location']).toBe('/casos/bheex/')
  })
})
