import { expect, test } from '@playwright/test'

async function clickByAriaLabel(page: import('@playwright/test').Page, ariaLabel: string) {
  await page.evaluate((label) => {
    const element = document.querySelector<HTMLElement>(`[aria-label="${label}"]`)
    if (!element) throw new Error(`Missing control ${label}`)
    element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
  }, ariaLabel)
}

test.describe('Theme and Language Toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
  })

  test('toggles theme and persists it across reloads', async ({ page }) => {
    const html = page.locator('html')
    const themeButton = page.getByRole('button', { name: /Cambiar a modo (claro|oscuro)/ })

    const initialTheme = await html.getAttribute('data-theme')
    expect(initialTheme).toBeTruthy()

    await clickByAriaLabel(page, await themeButton.getAttribute('aria-label') as string)

    const nextTheme = initialTheme === 'dark' ? 'light' : 'dark'
    await expect(html).toHaveAttribute('data-theme', nextTheme)
    await expect
      .poll(async () => page.evaluate(() => window.localStorage.getItem('theme')))
      .toBe(nextTheme)

    await page.reload()

    await expect(html).toHaveAttribute('data-theme', nextTheme)
    await expect
      .poll(async () => page.evaluate(() => window.localStorage.getItem('theme')))
      .toBe(nextTheme)
  })

  test('switches from Spanish to English and updates route, content, and SEO metadata', async ({ page }) => {
    await expect(page.locator('html')).toHaveAttribute('lang', 'es')
    await expect(page.locator('#hero-title')).toHaveText(
      'Ingeniero de software backend en Colombia que construye APIs escalables y plataformas confiables',
    )

    await clickByAriaLabel(page, 'Cambiar idioma a EN')

    await expect(page).toHaveURL(/\/en\/$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.locator('#hero-title')).toHaveText(
      'Backend software engineer in Colombia building scalable APIs and reliable platform systems',
    )
    await expect(page).toHaveTitle(
      'Nicolas Duran Garces (NIDUGA) | Backend software engineer in Armenia, Quindio',
    )
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      'Portfolio of Nicolas Duran Garces, backend software engineer based in Armenia, Quindio, Colombia. Focused on Python, FastAPI, scalable APIs, Docker, AWS, and software architecture for remote teams.',
    )
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://niduga.dev/en/')
  })

  test('switches from English to Spanish and restores the default route metadata', async ({ page }) => {
    await page.goto('/en/')
    await page.waitForLoadState('domcontentloaded')

    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://niduga.dev/en/')

    await clickByAriaLabel(page, 'Switch language to ES')

    await expect(page).toHaveURL(/\/$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'es')
    await expect(page).toHaveTitle(
      'Nicolas Duran Garces (NIDUGA) | Ingeniero de software backend en Armenia, Quindio',
    )
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      'Portafolio de Nicolas Duran Garces, ingeniero de software backend en Armenia, Quindio. Especialista en Python, FastAPI, APIs escalables, Docker, AWS y arquitectura de software para equipos remotos.',
    )
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://niduga.dev/')
  })

  test('persists the chosen language across reloads', async ({ page }) => {
    await clickByAriaLabel(page, 'Cambiar idioma a EN')

    await expect(page).toHaveURL(/\/en\/$/)
    await expect
      .poll(async () => page.evaluate(() => window.localStorage.getItem('lang')))
      .toBe('en')

    await page.reload()

    await expect(page).toHaveURL(/\/en\/$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.locator('.hero-bento__panel--profile .hero-bento__role')).toHaveText('FullStack software engineer')
    await expect
      .poll(async () => page.evaluate(() => window.localStorage.getItem('lang')))
      .toBe('en')
  })
})
