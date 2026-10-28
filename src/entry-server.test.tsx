import { describe, expect, it } from 'vitest'
import { caseSlugs } from './content/cases'
import { listPages, renderRoute } from './entry-server'

const pages = listPages()

describe('prerendered pages', () => {
  it('emits home, privacy and every case in both languages, plus one bilingual 404', () => {
    expect(pages.map((page) => page.file).sort()).toEqual(
      [
        'index.html',
        'en/index.html',
        'privacidad/index.html',
        'en/privacy/index.html',
        '404.html',
        ...caseSlugs.map((slug) => `casos/${slug}/index.html`),
        ...caseSlugs.map((slug) => `en/cases/${slug}/index.html`),
      ].sort(),
    )
  })

  it.each(pages.map((page) => [page.file, page.route] as const))(
    '%s carries one h1, a title and structured data without running any script',
    (_file, route) => {
      const page = renderRoute(route)
      expect(page.html.match(/<h1[\s>]/g)).toHaveLength(1)
      expect(page.head).toMatch(/<title>[^<]+<\/title>/)
      expect(page.head).toContain('rel="canonical"')
      expect(page.head).toContain('hreflang="x-default"')
      expect(page.head).toContain('type="application/ld+json"')
    },
  )

  it('sets the document language that matches each version', () => {
    expect(renderRoute({ page: 'home', lang: 'es' }).lang).toBe('es')
    expect(renderRoute({ page: 'home', lang: 'en' }).lang).toBe('en')
    expect(renderRoute({ page: 'case', lang: 'en', slug: 'bheex' }).lang).toBe('en')
  })

  it('links the home page to every case with real anchors a crawler can follow', () => {
    const es = renderRoute({ page: 'home', lang: 'es' }).html
    const en = renderRoute({ page: 'home', lang: 'en' }).html
    for (const slug of caseSlugs) {
      expect(es).toContain(`href="/casos/${slug}/"`)
      expect(en).toContain(`href="/en/cases/${slug}/"`)
    }
  })

  it('serves the CV that matches the language, and the contact details visitors need', () => {
    expect(renderRoute({ page: 'home', lang: 'es' }).html).toContain('href="/cv/nicolas-duran-garces-cv-es.pdf"')
    expect(renderRoute({ page: 'home', lang: 'en' }).html).toContain('href="/cv/nicolas-duran-garces-resume-en.pdf"')
    const html = renderRoute({ page: 'home', lang: 'es' }).html
    expect(html).toContain('mailto:niduga@outlook.es')
    expect(html).toContain('https://www.linkedin.com/in/garcesnicolas')
    expect(html).toContain('https://github.com/NicolasDuranGarces')
    expect(html).not.toMatch(/\+57|305 797/)
  })

  it('stays compatible with a strict CSP: no inline style attributes and no inline executable script', () => {
    for (const { route } of pages) {
      const page = renderRoute(route)
      expect(page.html).not.toMatch(/\sstyle=/)
      expect(page.head.replace(/<script type="application\/ld\+json">.*?<\/script>/gs, '')).not.toContain('<script')
    }
  })

  it('tells the visitor, in both languages, when a page does not exist', () => {
    const html = renderRoute({ page: 'notFound' }).html
    expect(html).toContain('Página no encontrada')
    expect(html).toContain('Page not found')
    expect(html).toContain('href="/"')
    expect(html).toContain('href="/en/"')
  })
})
