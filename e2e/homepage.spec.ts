import { expect, test } from '@playwright/test'

const seo = {
  es: {
    lang: 'es',
    title: 'Nicolas Duran Garces (NIDUGA) | Ingeniero de software backend en Armenia, Quindio',
    description:
      'Portafolio de Nicolas Duran Garces, ingeniero de software backend en Armenia, Quindio. Especialista en Python, FastAPI, APIs escalables, Docker, AWS y arquitectura de software para equipos remotos.',
    canonical: 'https://niduga.dev/',
    ogLocale: 'es_CO',
    heading: 'Ingeniero de software backend en Colombia que construye APIs escalables y plataformas confiables',
    role: 'Ingeniero de software FullStack',
    spotlight: 'Delivery con contexto de producto',
  },
  en: {
    lang: 'en',
    title: 'Nicolas Duran Garces (NIDUGA) | Backend software engineer in Armenia, Quindio',
    description:
      'Portfolio of Nicolas Duran Garces, backend software engineer based in Armenia, Quindio, Colombia. Focused on Python, FastAPI, scalable APIs, Docker, AWS, and software architecture for remote teams.',
    canonical: 'https://niduga.dev/en/',
    ogLocale: 'en_US',
    heading: 'Backend software engineer in Colombia building scalable APIs and reliable platform systems',
    role: 'FullStack software engineer',
    spotlight: 'Delivery with product context',
  },
} as const

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
  })

  test('renders the bento opening with hero copy, CTA entry points, and central card', async ({ page }) => {
    const hero = page.locator('#top')
    const introPanel = page.locator('.hero-bento__panel--intro')
    const heroCard = page.locator('.hero-bento__panel--profile')
    const metricsPanel = page.locator('.hero-bento__panel--metrics')

    await expect(page.locator('html')).toHaveAttribute('lang', seo.es.lang)
    await expect(hero).toBeVisible()
    await expect(page.locator('#hero-title')).toHaveText(seo.es.heading)
    await expect(page.locator('.hero-bento__eyebrow')).toHaveText('NIDUGA · Software engineer · Backend specialist')
    await expect(page.locator('.hero-bento__kicker')).toHaveText('Arquitectura, entrega y claridad operativa.')
    await expect(page.locator('.hero-bento__title')).toHaveText(
      'Backend con Python, FastAPI, Node.js y arquitectura lista para produccion',
    )
    await expect(page.locator('.hero-bento__description')).toContainText(
      'Ayudo a equipos de producto a diseñar APIs',
    )

    const heroChips = page.locator('.hero-bento__chip')
    await expect(heroChips).toHaveCount(4)
    await expect(heroChips).toContainText([
      'Python y FastAPI',
      'Arquitectura backend',
      'Docker y AWS',
      'APIs observables',
    ])

    await expect(page.getByRole('link', { name: 'Ver proyectos' })).toHaveAttribute('href', '#projects')
    await expect(page.getByRole('link', { name: 'Trabaja conmigo' })).toHaveAttribute('href', '#contact')
    await expect(page.getByRole('link', { name: 'Descargar mi hoja de vida en formato PDF' })).toHaveAttribute(
      'href',
      '/CV_NICOLAS_DURAN.pdf',
    )

    await expect(introPanel).toBeVisible()
    await expect(heroCard).toBeVisible()
    await expect(heroCard.getByRole('img', { name: 'Retrato de Nicolas Duran Garces sonriendo' })).toBeVisible()
    await expect(heroCard.locator('.hero-bento__label')).toHaveText('Resultados reales')
    await expect(heroCard.locator('.hero-bento__status')).toHaveAttribute(
      'title',
      'Remoto, consultoría y roles senior backend',
    )
    await expect(heroCard.locator('.hero-bento__name')).toHaveText('Nicolas Duran Garces')
    await expect(heroCard.locator('.hero-bento__role')).toHaveText(seo.es.role)
    await expect(heroCard.locator('.hero-bento__tagline')).toContainText(
      '5+ años de experiencia, 15+ proyectos entregados y 20 proyectos open source',
    )

    await expect(page.locator('.hero-bento__panel--signal')).toContainText('Armenia, Quindío, Colombia')
    await expect(page.locator('.hero-bento__panel--spotlight')).toContainText(seo.es.spotlight)
    await expect(metricsPanel.locator('.hero-bento__stat')).toHaveCount(3)
    await expect(metricsPanel).toContainText('5+')
    await expect(metricsPanel).toContainText('15+')
    await expect(metricsPanel).toContainText('20')
    await expect(page.locator('.hero-bento__panel--terminal')).toContainText('Python / FastAPI / Node.js')
  })

  test('ships aligned Spanish SEO metadata on the default opening', async ({ page }) => {
    await expect(page).toHaveTitle(seo.es.title)

    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', seo.es.description)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    )
    const keywords = await page.locator('meta[name="keywords"]').getAttribute('content')
    expect(keywords).toBeTruthy()
    expect(keywords).toContain('Nicolas Duran Garces')
    expect(keywords).toContain('NIDUGA')
    expect(keywords).toContain('Ingeniero de software backend Armenia Quindio')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', seo.es.canonical)

    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website')
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute(
      'content',
      'Nicolas Duran Garces · Backend Software Engineer',
    )
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', seo.es.title)
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', seo.es.description)
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', seo.es.canonical)
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', seo.es.ogLocale)
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://niduga.dev/og-image.png')
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', seo.es.title)
    await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute('content', seo.es.description)

    await expect(page.locator('link[rel="alternate"][hreflang="es-CO"]')).toHaveAttribute('href', 'https://niduga.dev/')
    await expect(page.locator('link[rel="alternate"][hreflang="en-US"]')).toHaveAttribute('href', 'https://niduga.dev/en/')
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute(
      'href',
      'https://niduga.dev/',
    )
  })

  test('exposes structured data that matches the Spanish home opening', async ({ page }) => {
    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent()

    expect(jsonLd).toBeTruthy()

    const data = JSON.parse(jsonLd ?? '{}')
    expect(data['@context']).toBe('https://schema.org')
    expect(Array.isArray(data['@graph'])).toBe(true)

    const person = data['@graph'].find((item: Record<string, unknown>) => item['@type'] === 'Person')
    expect(person).toMatchObject({
      '@id': 'https://niduga.dev/#person',
      '@type': 'Person',
      name: 'Nicolas Duran Garces',
      alternateName: 'NIDUGA',
      jobTitle: 'Ingeniero de software backend',
      url: seo.es.canonical,
    })
    expect(person.address).toMatchObject({
      addressLocality: 'Armenia',
      addressRegion: 'Quindio',
      addressCountry: 'CO',
    })

    const webpage = data['@graph'].find((item: Record<string, unknown>) => item['@type'] === 'WebPage')
    expect(webpage).toMatchObject({
      '@id': 'https://niduga.dev/#webpage',
      url: seo.es.canonical,
      name: seo.es.title,
      description: seo.es.description,
      inLanguage: seo.es.ogLocale,
    })

    const faqPage = data['@graph'].find((item: Record<string, unknown>) => item['@type'] === 'FAQPage')
    expect(faqPage).toBeDefined()
    expect(Array.isArray(faqPage.mainEntity)).toBe(true)
    expect(faqPage.mainEntity.length).toBeGreaterThan(0)
  })

  test('keeps English opening copy and metadata aligned on the dedicated route', async ({ page }) => {
    await page.goto('/en/')
    await page.waitForLoadState('domcontentloaded')

    await expect(page.locator('html')).toHaveAttribute('lang', seo.en.lang)
    await expect(page).toHaveTitle(seo.en.title)
    await expect(page.locator('#hero-title')).toHaveText(seo.en.heading)
    await expect(page.locator('.hero-bento__title')).toHaveText(
      'Backend delivery with Python, FastAPI, Node.js, and production-ready architecture',
    )
    await expect(page.locator('.hero-bento__panel--profile .hero-bento__role')).toHaveText(seo.en.role)
    await expect(page.locator('.hero-bento__panel--spotlight .hero-bento__label')).toHaveText(seo.en.spotlight)

    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', seo.en.description)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', seo.en.canonical)
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', seo.en.title)
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', seo.en.description)
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', seo.en.canonical)
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', seo.en.ogLocale)
  })

  test('keeps the hero opening usable on mobile without dropping the central card', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')

    await expect(page.locator('#hero-title')).toHaveText(seo.es.heading)
    await expect(page.locator('.hero-bento__panel--profile')).toBeVisible()
    await expect(page.locator('.corner-controls')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Ver proyectos' })).toBeVisible()
  })
})
