export const siteConfig = {
  author: 'Nicolas Duran Garces',
  alternateName: 'NIDUGA',
  siteName: 'Nicolas Duran Garces · Backend Software Engineer',
  siteUrl: 'https://niduga.dev',
  defaultLocale: 'es',
  locales: ['es', 'en'] as const,
  email: 'niduga@outlook.es',
  github: 'https://github.com/NicolasDuranGarces',
  linkedin: 'https://www.linkedin.com/in/garcesnicolas/',
  image: '/og-image.png',
  location: {
    city: 'Armenia',
    region: 'Quindio',
    country: 'Colombia',
    countryCode: 'CO',
  },
} as const

export type SiteLocale = (typeof siteConfig.locales)[number]

const localePrefixes: Record<SiteLocale, string> = {
  es: '/',
  en: '/en/',
}

export function isLocale(value: string | null | undefined): value is SiteLocale {
  return value === 'es' || value === 'en'
}

export function getLocaleFromPathname(pathname: string): SiteLocale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'es'
}

export function getLocaleFromSearch(search: string): SiteLocale | null {
  const params = new URLSearchParams(search)
  const lang = params.get('lang')
  return isLocale(lang) ? lang : null
}

export function getLocalizedPath(locale: SiteLocale, hash = '') {
  const basePath = localePrefixes[locale]
  return hash ? `${basePath}${hash}` : basePath
}

export function getPreferredLocale(pathname: string, search = '', stored?: string | null): SiteLocale {
  const localeFromPath = getLocaleFromPathname(pathname)
  if (localeFromPath === 'en') return localeFromPath

  const localeFromSearch = getLocaleFromSearch(search)
  if (localeFromSearch) return localeFromSearch

  return isLocale(stored) ? stored : siteConfig.defaultLocale
}

export function getCanonicalPath(locale: SiteLocale) {
  return getLocalizedPath(locale)
}

export function getAbsoluteUrl(path: string) {
  const base = siteConfig.siteUrl.endsWith('/') ? siteConfig.siteUrl.slice(0, -1) : siteConfig.siteUrl
  if (path.startsWith('http')) return path
  if (path.startsWith('/')) return `${base}${path}`
  return `${base}/${path}`
}

export function getAlternateUrls() {
  return [
    { hrefLang: 'es-CO', href: getAbsoluteUrl(getCanonicalPath('es')) },
    { hrefLang: 'en-US', href: getAbsoluteUrl(getCanonicalPath('en')) },
    { hrefLang: 'x-default', href: getAbsoluteUrl(getCanonicalPath('es')) },
  ]
}

export function normalizeLegacyLanguageUrl(currentUrl: URL) {
  const legacyLocale = getLocaleFromSearch(currentUrl.search)
  if (!legacyLocale) return null

  const normalized = new URL(currentUrl.href)
  normalized.pathname = getCanonicalPath(legacyLocale)
  normalized.searchParams.delete('lang')
  return `${normalized.pathname}${normalized.search}${normalized.hash}`
}
