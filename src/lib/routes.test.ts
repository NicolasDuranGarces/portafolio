import { describe, expect, it } from 'vitest'
import { caseSlugs } from '../content/cases'
import { alternates, fileOf, pageRoutes, pathOf, resolveRoute, withLang } from './routes'

describe('routes', () => {
  it('prerenders every page in both languages: home, privacy and each case', () => {
    expect(pageRoutes()).toHaveLength(2 * (2 + caseSlugs.length))
  })

  it('resolves every path the site generates back to the same route', () => {
    for (const route of pageRoutes()) {
      expect(resolveRoute(pathOf(route))).toEqual(route)
    }
  })

  it('keeps one canonical path per language', () => {
    expect(pathOf({ page: 'home', lang: 'es' })).toBe('/')
    expect(pathOf({ page: 'home', lang: 'en' })).toBe('/en/')
    expect(pathOf({ page: 'case', lang: 'es', slug: 'bheex' })).toBe('/casos/bheex/')
    expect(pathOf({ page: 'case', lang: 'en', slug: 'bheex' })).toBe('/en/cases/bheex/')
    expect(pathOf({ page: 'privacy', lang: 'es' })).toBe('/privacidad/')
    expect(pathOf({ page: 'privacy', lang: 'en' })).toBe('/en/privacy/')
  })

  it('treats anything else as not found, including URLs that mix languages', () => {
    for (const path of [
      '/no-existe',
      '/casos/no-existe/',
      '/en/cases/no-existe/',
      '/casos/bheex/extra/',
      '/en/casos/bheex/',
      '/cases/bheex/',
      '/en/privacidad/',
      '/privacy/',
    ]) {
      expect(resolveRoute(path)).toEqual({ page: 'notFound' })
    }
  })

  it('accepts a missing trailing slash and an explicit index.html, as the dev server and nginx can serve them', () => {
    expect(resolveRoute('/casos/bheex')).toEqual({ page: 'case', lang: 'es', slug: 'bheex' })
    expect(resolveRoute('/en')).toEqual({ page: 'home', lang: 'en' })
    expect(resolveRoute('/en/index.html')).toEqual({ page: 'home', lang: 'en' })
  })

  it('maps each route to the file nginx will find for its URL', () => {
    expect(fileOf({ page: 'home', lang: 'es' })).toBe('index.html')
    expect(fileOf({ page: 'home', lang: 'en' })).toBe('en/index.html')
    expect(fileOf({ page: 'case', lang: 'en', slug: 'price-match-automation' })).toBe(
      'en/cases/price-match-automation/index.html',
    )
    expect(fileOf({ page: 'notFound' })).toBe('404.html')
  })

  it('declares hreflang alternates that point at each other and default to Spanish', () => {
    for (const route of pageRoutes()) {
      const set = alternates(route)
      expect(set.map((alt) => alt.hrefLang)).toEqual(['es-CO', 'en-US', 'x-default'])
      expect(set[0].href).toBe(`https://niduga.dev${pathOf(withLang(route, 'es'))}`)
      expect(set[1].href).toBe(`https://niduga.dev${pathOf(withLang(route, 'en'))}`)
      expect(set[2].href).toBe(set[0].href)
      // The alternate set is identical when computed from the other language version.
      expect(alternates(withLang(route, route.lang === 'es' ? 'en' : 'es'))).toEqual(set)
    }
  })
})
