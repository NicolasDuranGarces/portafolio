import { getCase } from '../content/cases'
import { homeCopy } from '../content/home'
import { notFoundCopy, ui } from '../content/ui'
import type { Lang } from './lang'
import { alternates, pathOf, type Alternate, type Route } from './routes'
import { absoluteUrl, site } from './site'

type PageMeta = {
  lang: Lang
  title: string
  description: string
  canonical: string
  alternates: Alternate[]
  robots: string
  ogType: 'website' | 'article'
  ogLocale: string
  ogLocaleAlternate: string
  ogImage: string
  ogImageAlt: string
  jsonLd: Record<string, unknown>
}

const ogLocales: Record<Lang, string> = { es: 'es_CO', en: 'en_US' }
const inLanguage: Record<Lang, string> = { es: 'es-CO', en: 'en-US' }
const indexable = 'index, follow, max-snippet:-1, max-image-preview:large'

const personId = `${absoluteUrl('/')}#person`
const websiteId = `${absoluteUrl('/')}#website`
const sameAs = [site.linkedin, site.github]

const knowsAbout = [
  'Python',
  'Java',
  'TypeScript',
  'Amazon Web Services',
  'FastAPI',
  'Spring Boot',
  'NestJS',
  'Microservices',
  'LLM agents',
  'Retrieval augmented generation',
  'IoT ingestion',
  'Browser automation',
]

function personNode(lang: Lang) {
  return {
    '@type': 'Person',
    '@id': personId,
    name: site.name,
    alternateName: site.alternateNames,
    jobTitle: homeCopy[lang].seo.jobTitle,
    url: absoluteUrl('/'),
    image: absoluteUrl(site.ogImage),
    email: `mailto:${site.email}`,
    sameAs,
    knowsAbout,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      addressCountry: site.location.countryCode,
    },
    worksFor: { '@type': 'Organization', name: 'Bheex', url: site.bheex },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Institución Universitaria EAM' },
  }
}

function webPageNode(name: string, description: string, location?: { url: string; lang: Lang }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    ...(location ? { url: location.url, inLanguage: inLanguage[location.lang] } : {}),
    author: { '@id': personId },
  }
}

export function getPageMeta(route: Route): PageMeta {
  if (route.page === 'notFound') {
    const canonical = absoluteUrl('/')
    const title = `${notFoundCopy.es.heading} · ${notFoundCopy.en.heading} | ${site.name}`
    const description = `${notFoundCopy.es.body} ${notFoundCopy.en.body}`
    return {
      lang: 'es',
      title,
      description,
      canonical,
      alternates: alternates({ page: 'home', lang: 'es' }),
      robots: 'noindex, follow',
      ogType: 'website',
      ogLocale: ogLocales.es,
      ogLocaleAlternate: ogLocales.en,
      ogImage: absoluteUrl(site.ogImage),
      ogImageAlt: site.name,
      jsonLd: webPageNode(title, description),
    }
  }

  const { lang } = route
  const canonical = absoluteUrl(pathOf(route))
  const common = {
    lang,
    canonical,
    alternates: alternates(route),
    robots: indexable,
    ogLocale: ogLocales[lang],
    ogLocaleAlternate: ogLocales[lang === 'es' ? 'en' : 'es'],
    ogImage: absoluteUrl(site.ogImage),
    ogImageAlt: `${site.name}, ${homeCopy[lang].seo.jobTitle}`,
  }

  switch (route.page) {
    case 'home': {
      const { title, description } = homeCopy[lang].seo
      return {
        ...common,
        title,
        description,
        ogType: 'website',
        jsonLd: {
          '@context': 'https://schema.org',
          '@graph': [
            personNode(lang),
            {
              '@type': 'WebSite',
              '@id': websiteId,
              name: site.name,
              url: absoluteUrl('/'),
              inLanguage: Object.values(inLanguage),
              publisher: { '@id': personId },
            },
          ],
        },
      }
    }
    case 'case': {
      const entry = getCase(route.slug)
      const copy = entry.copy[lang]
      const title = `${copy.title} | ${site.name}`
      return {
        ...common,
        title,
        description: copy.summary,
        ogType: 'article',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: copy.title,
          description: copy.summary,
          url: canonical,
          inLanguage: inLanguage[lang],
          mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
          image: [absoluteUrl(site.ogImage)],
          keywords: entry.stack.join(', '),
          author: {
            '@type': 'Person',
            '@id': personId,
            name: site.name,
            url: absoluteUrl('/'),
            sameAs,
          },
        },
      }
    }
    case 'privacy': {
      const copy = ui[lang].privacy
      const title = `${copy.title} | ${site.name}`
      return {
        ...common,
        title,
        description: copy.lead,
        ogType: 'website',
        jsonLd: webPageNode(title, copy.lead, { url: canonical, lang }),
      }
    }
  }
}

function escapeAttr(value: string) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** Serializes the head tags that depend on the page. Static tags live in index.html. */
export function renderHead(meta: PageMeta): string {
  const tags = [
    `<title>${escapeAttr(meta.title)}</title>`,
    `<meta name="description" content="${escapeAttr(meta.description)}">`,
    `<meta name="author" content="${escapeAttr(site.name)}">`,
    `<meta name="robots" content="${meta.robots}">`,
    `<link rel="canonical" href="${meta.canonical}">`,
    ...meta.alternates.map((alt) => `<link rel="alternate" hreflang="${alt.hrefLang}" href="${alt.href}">`),
    `<meta property="og:type" content="${meta.ogType}">`,
    `<meta property="og:site_name" content="${escapeAttr(site.name)}">`,
    `<meta property="og:title" content="${escapeAttr(meta.title)}">`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}">`,
    `<meta property="og:url" content="${meta.canonical}">`,
    `<meta property="og:locale" content="${meta.ogLocale}">`,
    `<meta property="og:locale:alternate" content="${meta.ogLocaleAlternate}">`,
    `<meta property="og:image" content="${meta.ogImage}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="${escapeAttr(meta.ogImageAlt)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeAttr(meta.title)}">`,
    `<meta name="twitter:description" content="${escapeAttr(meta.description)}">`,
    `<meta name="twitter:image" content="${meta.ogImage}">`,
    `<meta name="twitter:image:alt" content="${escapeAttr(meta.ogImageAlt)}">`,
    // "<" is escaped so the payload can never close the script tag or open an HTML comment.
    `<script type="application/ld+json">${JSON.stringify(meta.jsonLd).replace(/</g, '\\u003c')}</script>`,
  ]
  return tags.join('\n    ')
}
