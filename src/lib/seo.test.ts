import { describe, expect, it } from 'vitest'
import { pageRoutes, pathOf, type Route } from './routes'
import { getPageMeta, renderHead } from './seo'

const routes: Route[] = [...pageRoutes(), { page: 'notFound' }]

describe('page metadata', () => {
  it('gives every page its own title and description', () => {
    const titles = routes.map((route) => getPageMeta(route).title)
    const descriptions = routes.map((route) => getPageMeta(route).description)
    expect(new Set(titles).size).toBe(routes.length)
    expect(new Set(descriptions).size).toBe(routes.length)
  })

  it('keeps titles and descriptions inside the length search results show', () => {
    for (const route of routes) {
      const meta = getPageMeta(route)
      expect(meta.title.length, meta.title).toBeLessThanOrEqual(70)
      expect(meta.description.length, meta.description).toBeLessThanOrEqual(170)
    }
  })

  it('points the canonical URL at the page itself, in absolute form', () => {
    for (const route of pageRoutes()) {
      expect(getPageMeta(route).canonical).toBe(`https://niduga.dev${pathOf(route)}`)
    }
  })

  it('keeps the 404 out of the index', () => {
    expect(getPageMeta({ page: 'notFound' }).robots).toContain('noindex')
    expect(getPageMeta({ page: 'home', lang: 'es' }).robots).not.toContain('noindex')
  })

  it('describes the person and the site on the home page, with profile links', () => {
    const jsonLd = getPageMeta({ page: 'home', lang: 'en' }).jsonLd as { '@graph': Record<string, unknown>[] }
    const types = jsonLd['@graph'].map((node) => node['@type'])
    expect(types).toEqual(['Person', 'WebSite'])

    const person = jsonLd['@graph'][0]
    expect(person.jobTitle).toBe('Backend and AI engineer')
    expect(person.sameAs).toEqual([
      'https://www.linkedin.com/in/garcesnicolas',
      'https://github.com/NicolasDuranGarces',
    ])
    expect(person.knowsAbout).toEqual(expect.arrayContaining(['Python', 'Java', 'TypeScript']))
  })

  it('publishes each case as an Article authored by the person', () => {
    for (const route of pageRoutes().filter((candidate) => candidate.page === 'case')) {
      const article = getPageMeta(route).jsonLd as Record<string, unknown>
      expect(article['@type']).toBe('Article')
      expect(article.author).toMatchObject({ '@type': 'Person', name: 'Nicolás Durán Garcés' })
      expect(article.mainEntityOfPage).toMatchObject({ '@id': getPageMeta(route).canonical })
    }
  })

  it('never ships FAQ structured data', () => {
    for (const route of routes) {
      expect(JSON.stringify(getPageMeta(route).jsonLd)).not.toContain('FAQPage')
    }
  })
})

describe('renderHead', () => {
  const meta = getPageMeta({ page: 'home', lang: 'es' })

  it('escapes text that would break out of an attribute or a tag', () => {
    const head = renderHead({ ...meta, title: 'A "quoted" <tag> & more', description: 'say "hi" <b>' })
    expect(head).toContain('<title>A &quot;quoted&quot; &lt;tag&gt; &amp; more</title>')
    expect(head).toContain('content="say &quot;hi&quot; &lt;b&gt;"')
  })

  it('cannot be closed early by JSON-LD content', () => {
    const head = renderHead({ ...meta, jsonLd: { name: '</script><script>alert(1)</script>' } })
    const script = head.slice(head.indexOf('<script type="application/ld+json">'))
    expect(script.match(/<\/script>/g)).toHaveLength(1)
    expect(script).toContain('\\u003c/script>')
  })

  it('emits the tags crawlers read before any JavaScript runs', () => {
    const head = renderHead(meta)
    expect(head).toContain('<link rel="canonical" href="https://niduga.dev/">')
    expect(head).toContain('hreflang="es-CO" href="https://niduga.dev/"')
    expect(head).toContain('hreflang="en-US" href="https://niduga.dev/en/"')
    expect(head).toContain('hreflang="x-default" href="https://niduga.dev/"')
    expect(head).toContain('<meta property="og:image" content="https://niduga.dev/og-image.png">')
    expect(head).toContain('type="application/ld+json"')
  })
})
