import { expect, test } from '@playwright/test'

test.describe('Language', () => {
  test('switches Spanish to English and back, landing on the matching URL, title and canonical', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('lang', 'es')

    await page.getByRole('link', { name: 'English' }).click()
    await expect(page).toHaveURL('/en/')
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page).toHaveTitle('Nicolás Durán Garcés | Backend and AI engineer')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://niduga.dev/en/')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Backend and AI engineer.')

    await page.getByRole('link', { name: 'Español' }).click()
    await expect(page).toHaveURL('/')
    await expect(page).toHaveTitle('Nicolás Durán Garcés | Ingeniero backend e IA')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://niduga.dev/')
  })

  test('keeps the visitor on the same case when the language changes', async ({ page }) => {
    await page.goto('/casos/quindio-inteligente-iot/')
    await page.getByRole('link', { name: 'English' }).click()
    await expect(page).toHaveURL('/en/cases/quindio-inteligente-iot/')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Quindío Inteligente: serverless IoT ingestion')

    await page.getByRole('link', { name: 'Español' }).click()
    await expect(page).toHaveURL('/casos/quindio-inteligente-iot/')
  })

  test('declares the alternate language on every page for crawlers', async ({ page }) => {
    await page.goto('/en/privacy/')
    await expect(page.locator('link[rel="alternate"][hreflang="es-CO"]')).toHaveAttribute('href', 'https://niduga.dev/privacidad/')
    await expect(page.locator('link[rel="alternate"][hreflang="en-US"]')).toHaveAttribute('href', 'https://niduga.dev/en/privacy/')
  })
})

test.describe('Theme', () => {
  test.use({ colorScheme: 'light' })

  test('follows the system theme until the visitor chooses', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('html')).not.toHaveAttribute('data-theme', /.*/)
    expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe('rgb(255, 255, 255)')

    await page.emulateMedia({ colorScheme: 'dark' })
    expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe('rgb(0, 0, 0)')
  })

  test('toggles, persists across reload and carries over to other pages without a flash', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Cambiar a tema oscuro' }).click()

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe('dark')
    expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe('rgb(0, 0, 0)')

    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    await expect(page.getByRole('button', { name: 'Cambiar a tema claro' })).toBeVisible()

    // The saved theme is applied by init.js before first paint, so it is there as soon as the next page parses.
    await page.goto('/casos/bheex/', { waitUntil: 'commit' })
    await page.waitForLoadState('domcontentloaded')
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')

    await page.getByRole('button', { name: 'Cambiar a tema claro' }).click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
    expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe('rgb(255, 255, 255)')
  })

  test('an explicit choice beats the system preference', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('theme', 'light'))
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
    expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe('rgb(255, 255, 255)')
  })
})
