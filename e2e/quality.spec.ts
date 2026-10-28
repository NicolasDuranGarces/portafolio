import { expect, test, type Page } from '@playwright/test'

const paths = [
  '/',
  '/en/',
  '/casos/bheex/',
  '/en/cases/price-match-automation/',
  '/casos/quindio-inteligente-iot/',
  '/en/cases/warehouse-conveyor-backend/',
  '/privacidad/',
  '/en/privacy/',
  '/no-existe',
]

/** Console errors, uncaught exceptions and failed requests; CSP violations surface as console errors. */
function watchProblems(page: Page) {
  const problems: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error' || message.type() === 'warning') problems.push(`${message.type()}: ${message.text()}`)
  })
  page.on('pageerror', (error) => problems.push(`pageerror: ${error.message}`))
  page.on('requestfailed', (request) => problems.push(`requestfailed: ${request.url()}`))
  return problems
}

test.describe('Runtime health', () => {
  for (const path of paths) {
    test(`${path} hydrates with no console errors, failed requests or CSP violations`, async ({ page }) => {
      const problems = watchProblems(page)
      await page.goto(path)
      await page.waitForLoadState('networkidle')
      // The app is interactive once hydrated: the theme button swaps from its server state when needed.
      await page.waitForTimeout(300)
      // Chromium reports the 404 status of the document itself as a console error; that one is expected on the 404 page.
      const expected = path === '/no-existe' ? ['error: Failed to load resource: the server responded with a status of 404 (Not Found)'] : []
      expect(problems).toEqual(expected)
    })
  }
})

for (const viewport of [
  { width: 1280, height: 800 },
  { width: 390, height: 844 },
]) {
  test.describe(`Layout at ${viewport.width}px`, () => {
    test.use({ viewport })

    for (const path of paths) {
      test(`${path} has no horizontal overflow`, async ({ page }) => {
        await page.goto(path)
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
        expect(overflow).toBeLessThanOrEqual(0)
      })
    }

    test('buttons, language switch and theme toggle share the control height token', async ({ page }) => {
      await page.goto('/')
      const expected = await page.evaluate(() => {
        const probe = document.createElement('div')
        probe.style.height = getComputedStyle(document.documentElement).getPropertyValue('--control-h')
        document.body.append(probe)
        const height = probe.getBoundingClientRect().height
        probe.remove()
        return height
      })
      expect(expected).toBe(40)

      const nav = page.getByRole('navigation')
      const controls = [
        nav.getByRole('link', { name: 'English' }),
        nav.getByRole('button', { name: 'Cambiar a tema oscuro' }),
        page.getByRole('link', { name: 'Descargar CV' }).first(),
        page.getByRole('link', { name: 'Escríbeme' }).first(),
        viewport.width < 768 ? nav.getByRole('button', { name: 'Abrir menú' }) : nav.getByRole('link', { name: 'Casos' }),
      ]
      for (const control of controls) {
        const box = await control.boundingBox()
        expect(box?.height).toBe(expected)
      }
    })
  })
}

test.describe('Keyboard and focus', () => {
  test('every stop on the home page shows the accent focus ring at once, not faded in', async ({ page }) => {
    await page.goto('/')
    const accent = await page.evaluate(() => {
      const probe = document.createElement('i')
      probe.style.color = 'var(--color-accent)'
      document.body.append(probe)
      const color = getComputedStyle(probe).color
      probe.remove()
      return color
    })

    const stops = 24
    for (let index = 0; index < stops; index += 1) {
      await page.keyboard.press('Tab')
      // Read the ring in the same frame as the focus change: a transition would still show the old color or width.
      const ring = await page.evaluate(() => {
        const element = document.activeElement as HTMLElement
        // A card that is one big link shows its ring on the card, not on the title text.
        const target = element.closest<HTMLElement>('.card-link') ?? element
        const style = getComputedStyle(target)
        return { name: `${element.tagName} ${(element.textContent ?? '').trim().slice(0, 30)}`, style: style.outlineStyle, width: style.outlineWidth, color: style.outlineColor }
      })
      expect(ring, ring.name).toMatchObject({ style: 'solid', width: '2px', color: accent })
    }
  })

  test('the mobile menu opens, navigates and closes', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    await page.getByRole('button', { name: 'Abrir menú' }).click()
    const menu = page.locator('#menu')
    await expect(menu.getByRole('link', { name: 'Experiencia' })).toBeVisible()

    await menu.getByRole('link', { name: 'Experiencia' }).click()
    await expect(page).toHaveURL('/#experience')
    await expect(page.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute('aria-expanded', 'false')
    await expect(page.locator('main')).not.toHaveAttribute('inert', /.*/)
    await expect(page.locator('#experience')).toBeInViewport()
  })
})

test.describe('Motion', () => {
  test('reveals below the fold content on scroll', async ({ page }) => {
    await page.goto('/')
    const block = page.locator('#contact [data-reveal]').first()
    await expect(block).toHaveCSS('opacity', '0')

    await block.scrollIntoViewIfNeeded()
    await expect(block).toHaveAttribute('data-in-view', '')
    await expect(block).toHaveCSS('opacity', '1', { timeout: 3000 })
  })

  test.describe('with reduced motion requested', () => {
    test.use({ reducedMotion: 'reduce' })

    test('shows everything at once, with no hidden blocks and no muted tagline', async ({ page }) => {
      await page.goto('/')
      await expect(page.locator('#contact [data-reveal]').first()).toHaveCSS('opacity', '1')
      const opacities = await page.locator('[data-word]').evaluateAll((words) => words.map((word) => getComputedStyle(word).opacity))
      expect(new Set(opacities)).toEqual(new Set(['1']))
      expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto')
    })
  })
})

test.describe('Delivery', () => {
  test('sends the security headers and a script policy without unsafe-inline', async ({ request }) => {
    const response = await request.get('/')
    const headers = response.headers()
    const csp = headers['content-security-policy']

    expect(csp).toContain("default-src 'self'")
    const scriptSrc = csp.split(';').find((directive) => directive.trim().startsWith('script-src')) ?? ''
    expect(scriptSrc).toContain("'self'")
    expect(scriptSrc).not.toContain('unsafe-inline')
    expect(scriptSrc).not.toContain('unsafe-eval')
    expect(headers['x-frame-options']).toBe('DENY')
    expect(headers['x-content-type-options']).toBe('nosniff')
    expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin')
    expect(headers['strict-transport-security']).toBeUndefined()
  })

  test('caches hashed assets for a year and revalidates the HTML', async ({ page, request }) => {
    expect((await request.get('/')).headers()['cache-control']).toBe('no-cache')

    const response = await page.goto('/')
    const asset = await page.locator('script[type="module"]').getAttribute('src')
    expect(response?.status()).toBe(200)
    const assetResponse = await request.get(asset ?? '')
    expect(assetResponse.headers()['cache-control']).toBe('public, max-age=31536000, immutable')
    expect((await request.get('/init.js')).headers()['cache-control']).toBe('public, max-age=3600')
  })

  test('answers 404, never 403, for directories without an index page', async ({ request }) => {
    for (const path of ['/casos/', '/en/cases/', '/assets/']) {
      expect((await request.get(path)).status(), path).toBe(404)
    }
    expect((await request.get('/')).status()).toBe(200)
  })

  test('hero photo is the prioritized image: sized, eager, described', async ({ page }) => {
    await page.goto('/')
    const photo = page.getByRole('img', { name: 'Retrato de Nicolás Durán Garcés' })
    await expect(photo).toHaveAttribute('width', '576')
    await expect(photo).toHaveAttribute('height', '720')
    await expect(photo).toHaveAttribute('fetchpriority', 'high')
    await expect(photo).not.toHaveAttribute('loading', 'lazy')
    expect(await photo.getAttribute('src')).toMatch(/^\/assets\/avatar-.+\.webp$/)
  })

  test('self hosts the typeface and preloads it', async ({ page }) => {
    const external: string[] = []
    page.on('request', (request) => {
      if (!request.url().startsWith('http://127.0.0.1')) external.push(request.url())
    })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await expect(page.locator('link[rel="preload"][as="font"]')).toHaveAttribute('href', /geist-latin-wght-normal-.+\.woff2$/)
    expect(external).toEqual([])
    expect(await page.evaluate(() => getComputedStyle(document.body).fontFamily)).toContain('Geist')
    expect(await page.evaluate(() => document.fonts.check('16px Geist'))).toBe(true)
  })
})
