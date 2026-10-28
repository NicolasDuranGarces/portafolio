import { expect, test } from '@playwright/test'

// Crawlers and previews read the HTML as delivered, so this runs with JavaScript off.
test.use({ javaScriptEnabled: false })

const cases = ['bheex', 'price-match-automation', 'quindio-inteligente-iot', 'warehouse-conveyor-backend']

const pages = [
  { path: '/', lang: 'es', canonical: 'https://niduga.dev/' },
  { path: '/en/', lang: 'en', canonical: 'https://niduga.dev/en/' },
  { path: '/privacidad/', lang: 'es', canonical: 'https://niduga.dev/privacidad/' },
  { path: '/en/privacy/', lang: 'en', canonical: 'https://niduga.dev/en/privacy/' },
  ...cases.flatMap((slug) => [
    { path: `/casos/${slug}/`, lang: 'es', canonical: `https://niduga.dev/casos/${slug}/` },
    { path: `/en/cases/${slug}/`, lang: 'en', canonical: `https://niduga.dev/en/cases/${slug}/` },
  ]),
]

for (const page of pages) {
  test(`${page.path} delivers h1, title, canonical, hreflang and JSON-LD in the HTML`, async ({ page: tab }) => {
    const response = await tab.goto(page.path)
    expect(response?.status()).toBe(200)

    await expect(tab.locator('html')).toHaveAttribute('lang', page.lang)
    await expect(tab.locator('h1')).toHaveCount(1)
    await expect(tab.locator('h1')).not.toBeEmpty()
    expect((await tab.title()).length).toBeGreaterThan(10)
    await expect(tab.locator('meta[name="description"]')).toHaveAttribute('content', /.{40,}/)
    await expect(tab.locator('link[rel="canonical"]')).toHaveAttribute('href', page.canonical)
    for (const hreflang of ['es-CO', 'en-US', 'x-default']) {
      await expect(tab.locator(`link[rel="alternate"][hreflang="${hreflang}"]`)).toHaveCount(1)
    }

    const jsonLd = JSON.parse((await tab.locator('script[type="application/ld+json"]').textContent()) ?? '')
    expect(jsonLd['@context']).toBe('https://schema.org')
  })
}

test('the home page ships its content, not an empty shell', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Nicolás Durán Garcés')
  await expect(page.getByRole('heading', { level: 2, name: 'Casos de estudio' })).toBeVisible()
  for (const slug of cases) {
    await expect(page.locator(`a[href="/casos/${slug}/"]`).first()).toBeAttached()
  }
  // Without JavaScript nothing may stay hidden waiting for a scroll reveal.
  await expect(page.getByRole('heading', { level: 2, name: 'Contacto' })).toBeVisible()
})

test('the sitemap lists every page with its alternates', async ({ request }) => {
  const xml = await (await request.get('/sitemap.xml')).text()
  for (const page of pages) expect(xml).toContain(`<loc>${page.canonical}</loc>`)
  expect(xml.match(/hreflang="x-default"/g)).toHaveLength(pages.length)
})
