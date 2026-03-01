import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display page title with brand and location keywords', async ({ page }) => {
    await expect(page).toHaveTitle(/Nicolas Duran Garces.*Armenia, Quindio/)
  })

  test('should render all main sections', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Nicolas Duran Garces')

    // Check sections exist
    await expect(page.locator('#experience')).toBeVisible()
    await expect(page.locator('#about')).toBeVisible()
    await expect(page.locator('#skills')).toBeVisible()
    await expect(page.locator('#projects')).toBeVisible()
    await expect(page.locator('#contact')).toBeVisible()
  })

  test('should have proper meta description with SEO keywords', async ({ page }) => {
    const description = await page.locator('meta[name="description"]').getAttribute('content')
    expect(description).toContain('Armenia, Quindio')
    expect(description).toBeTruthy()
  })

  test('should have proper Open Graph tags', async ({ page }) => {
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content')
    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content')
    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content')
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content')

    expect(ogTitle).toBeTruthy()
    expect(ogTitle).toContain('NIDUGA')
    expect(ogDescription).toBeTruthy()
    expect(ogUrl).toBeTruthy()
    expect(ogImage).toBeTruthy()
  })

  test('should have canonical URL', async ({ page }) => {
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
    expect(canonical).toBeTruthy()
    expect(canonical).toBe('https://niduga.dev/')
  })

  test('should have hreflang alternate tags for SEO', async ({ page }) => {
    const esLink = page.locator('link[rel="alternate"][hreflang="es-CO"]')
    const enLink = page.locator('link[rel="alternate"][hreflang="en-US"]')
    const defaultLink = page.locator('link[rel="alternate"][hreflang="x-default"]')

    await expect(esLink).toHaveCount(1)
    await expect(enLink).toHaveCount(1)
    await expect(defaultLink).toHaveCount(1)
  })

  test('should have JSON-LD structured data', async ({ page }) => {
    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent()
    expect(jsonLd).toBeTruthy()

    if (jsonLd) {
      const data = JSON.parse(jsonLd)
      expect(data['@context']).toBe('https://schema.org')
      expect(data['@graph']).toBeDefined()

      const person = data['@graph'].find((item: any) => item['@type'] === 'Person')
      expect(person).toBeDefined()
      expect(person.name).toBe('Nicolas Duran Garces')
      expect(person.address.addressLocality).toBe('Armenia')

      const website = data['@graph'].find((item: any) => item['@type'] === 'WebSite')
      expect(website).toBeDefined()

      const faqPage = data['@graph'].find((item: any) => item['@type'] === 'FAQPage')
      expect(faqPage).toBeDefined()
    }
  })

  test('should expose a dedicated english route with localized metadata', async ({ page }) => {
    await page.goto('/en/')
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page).toHaveTitle(/Backend software engineer/)

    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
    expect(canonical).toBe('https://niduga.dev/en/')
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.locator('h1')).toContainText('Nicolas Duran Garces')
  })
})
