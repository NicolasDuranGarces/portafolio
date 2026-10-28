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
    // Focus moves into main, which is not interactive: it must not get a ring around the whole page.
    await expect(page.locator('main')).toBeFocused()
    await expect(page.locator('main')).toHaveCSS('outline-style', 'none')
  })

  test('marks the section being read as the current item', async ({ page, isMobile }) => {
    test.skip(isMobile, 'On phones the section links live in the full screen menu, covered by quality.spec.ts')
    await page.goto('/')
    await page.locator('#experience').evaluate((element) => element.scrollIntoView({ block: 'start' }))
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Experiencia' })).toHaveAttribute('aria-current', 'location')
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Casos' })).not.toHaveAttribute('aria-current')
  })

  test('keeps external links explicit and safe, and serves the CV for download', async ({ page, request }) => {
    await page.goto('/')
    const github = page.getByRole('link', { name: 'GitHub', exact: true })
    const linkedin = page.getByRole('link', { name: 'LinkedIn', exact: true })
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
