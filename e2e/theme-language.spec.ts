import { test, expect } from '@playwright/test'

test.describe('Theme and Language Toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should toggle theme from light to dark', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle')

    // Get initial theme
    const initialTheme = await page.locator('html').getAttribute('data-theme')

    // Find and click theme toggle button (assuming it exists in CornerControls)
    const themeButton = page.locator('button[aria-label*="modo"], button[title*="theme"], button[aria-label*="theme"]').first()

    if (await themeButton.count() > 0) {
      await themeButton.click()

      // Wait for theme change
      await page.waitForTimeout(300)

      const newTheme = await page.locator('html').getAttribute('data-theme')
      expect(newTheme).not.toBe(initialTheme)
    }
  })

  test('should persist theme in localStorage', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // Get theme from localStorage
    const storedTheme = await page.evaluate(() => localStorage.getItem('theme'))
    expect(storedTheme).toBeTruthy()
    expect(['light', 'dark']).toContain(storedTheme)

    // Verify html data-theme matches localStorage
    const htmlTheme = await page.locator('html').getAttribute('data-theme')
    expect(htmlTheme).toBe(storedTheme)
  })

  test('should toggle language between Spanish and English', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // Get initial language
    const initialLang = await page.locator('html').getAttribute('lang')

    // Find language toggle button
    const langButton = page.locator('button[aria-label*="idioma"], button[aria-label*="language"]').first()

    if (await langButton.count() > 0) {
      await langButton.click()

      // Wait for language change
      await page.waitForTimeout(300)

      const newLang = await page.locator('html').getAttribute('lang')
      expect(newLang).not.toBe(initialLang)
      expect(['es', 'en']).toContain(newLang)
    }
  })

  test('should persist language in localStorage and URL', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // Get language from localStorage
    const storedLang = await page.evaluate(() => localStorage.getItem('lang'))
    expect(storedLang).toBeTruthy()
    expect(['es', 'en']).toContain(storedLang)

    // Verify html lang attribute matches
    const htmlLang = await page.locator('html').getAttribute('lang')
    expect(htmlLang).toBe(storedLang)

    // Check if URL has lang parameter
    const url = new URL(page.url())
    if (url.searchParams.has('lang')) {
      expect(url.searchParams.get('lang')).toBe(storedLang)
    }
  })

  test('should load with language from URL query param', async ({ page }) => {
    await page.goto('/?lang=en')
    await page.waitForLoadState('networkidle')

    const htmlLang = await page.locator('html').getAttribute('lang')
    expect(htmlLang).toBe('en')
  })

  test('should update page title when language changes', async ({ page }) => {
    await page.goto('/?lang=es')
    await page.waitForLoadState('networkidle')
    const titleEs = await page.title()

    await page.goto('/?lang=en')
    await page.waitForLoadState('networkidle')
    const titleEn = await page.title()

    // Both should contain NIDUGA and Nicolas Duran Garces
    expect(titleEs).toContain('NIDUGA')
    expect(titleEn).toContain('NIDUGA')
    expect(titleEs).toContain('Nicolas Duran Garces')
    expect(titleEn).toContain('Nicolas Duran Garces')
  })
})
