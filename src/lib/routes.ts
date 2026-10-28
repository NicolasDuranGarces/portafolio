import { caseSlugs, isCaseSlug, type CaseSlug } from '../content/cases'
import { langs, type Lang } from './lang'
import { absoluteUrl } from './site'

/** Pages that exist in both languages and are indexable. */
export type PageRoute =
  | { page: 'home'; lang: Lang }
  | { page: 'case'; lang: Lang; slug: CaseSlug }
  | { page: 'privacy'; lang: Lang }

/** The 404 page is bilingual, so it carries no language. */
export type Route = PageRoute | { page: 'notFound' }

const segments: Record<Lang, { prefix: string; cases: string; privacy: string }> = {
  es: { prefix: '', cases: 'casos', privacy: 'privacidad' },
  en: { prefix: 'en/', cases: 'cases', privacy: 'privacy' },
}

export function pathOf(route: PageRoute): string {
  const seg = segments[route.lang]
  switch (route.page) {
    case 'home':
      return `/${seg.prefix}`
    case 'case':
      return `/${seg.prefix}${seg.cases}/${route.slug}/`
    case 'privacy':
      return `/${seg.prefix}${seg.privacy}/`
  }
}

/** Location of the prerendered HTML file inside dist. */
export function fileOf(route: Route): string {
  return route.page === 'notFound' ? '404.html' : `${pathOf(route).slice(1)}index.html`
}

/** nginx decodes the URI before it looks for a file, so the client must resolve the same path. */
function safeDecode(pathname: string): string {
  try {
    return decodeURIComponent(pathname)
  } catch {
    return pathname
  }
}

export function resolveRoute(pathname: string): Route {
  const parts = safeDecode(pathname).split('/').filter(Boolean)
  if (parts[parts.length - 1] === 'index.html') parts.pop()

  const lang: Lang = parts[0] === 'en' ? 'en' : 'es'
  const rest = lang === 'en' ? parts.slice(1) : parts
  const seg = segments[lang]

  if (rest.length === 0) return { page: 'home', lang }
  if (rest.length === 1 && rest[0] === seg.privacy) return { page: 'privacy', lang }
  if (rest.length === 2 && rest[0] === seg.cases && isCaseSlug(rest[1])) {
    return { page: 'case', lang, slug: rest[1] }
  }
  return { page: 'notFound' }
}

/** Every page that gets prerendered, in both languages. */
export function pageRoutes(): PageRoute[] {
  return langs.flatMap((lang): PageRoute[] => [
    { page: 'home', lang },
    ...caseSlugs.map((slug): PageRoute => ({ page: 'case', lang, slug })),
    { page: 'privacy', lang },
  ])
}

export function withLang(route: PageRoute, lang: Lang): PageRoute {
  return { ...route, lang }
}

export function homePath(lang: Lang, hash?: string): string {
  return `${pathOf({ page: 'home', lang })}${hash ? `#${hash}` : ''}`
}

export type Alternate = { hrefLang: string; href: string }

const hrefLangs: Record<Lang, string> = { es: 'es-CO', en: 'en-US' }

/** hreflang set shared by <head> and sitemap: every language version plus x-default (Spanish). */
export function alternates(route: PageRoute): Alternate[] {
  const spanish = absoluteUrl(pathOf(withLang(route, 'es')))
  return [
    ...langs.map((lang) => ({ hrefLang: hrefLangs[lang], href: absoluteUrl(pathOf(withLang(route, lang))) })),
    { hrefLang: 'x-default', href: spanish },
  ]
}
