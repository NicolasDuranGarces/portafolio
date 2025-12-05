import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display page title with NIDUGA keyword', async ({ page }) => {
    await expect(page).toHaveTitle(/Nicolas Duran Garces.*NIDUGA/)
  })

  test('should render all main sections', async ({ page }) => {
    // Hero section
    await expect(page.locator('text=Nicolas Duran Garces')).toBeVisible()

    // Check sections exist
    await expect(page.locator('#experience')).toBeVisible()
    await expect(page.locator('#about')).toBeVisible()
    await expect(page.locator('#skills')).toBeVisible()
    await expect(page.locator('#projects')).toBeVisible()
    await expect(page.locator('#contact')).toBeVisible()
  })

  test('should have proper meta description with SEO keywords', async ({ page }) => {
    const description = await page.locator('meta[name="description"]').getAttribute('content')
    expect(description).toContain('NIDUGA')
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
    expect(canonical).toContain('nicolasdurangarces.com')
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

      // Check for Person schema
      const person = data['@graph'].find((item: any) => item['@type'] === 'Person')
      expect(person).toBeDefined()
      expect(person.name).toBe('Nicolas Duran Garces')
      expect(person.jobTitle).toBeTruthy()

      // Check for WebSite schema
      const website = data['@graph'].find((item: any) => item['@type'] === 'WebSite')
      expect(website).toBeDefined()

      // Check for BreadcrumbList schema
      const breadcrumbs = data['@graph'].find((item: any) => item['@type'] === 'BreadcrumbList')
      expect(breadcrumbs).toBeDefined()
    }
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.locator('text=Nicolas Duran Garces')).toBeVisible()
  })
})
