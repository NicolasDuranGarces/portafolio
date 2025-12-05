import { Helmet, HelmetProvider } from 'react-helmet-async'
import { SEO as cfg } from '../seo.config'
import { useLanguage } from './LanguageProvider'

const trackingParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'ref']

export function SEOProvider({ children }: { children: React.ReactNode }) {
  return <HelmetProvider>{children}</HelmetProvider>
}

const getAbsoluteUrl = (path: string) => {
  const base = cfg.siteUrl.endsWith('/') ? cfg.siteUrl.slice(0, -1) : cfg.siteUrl
  if (path.startsWith('http')) return path
  if (path.startsWith('/')) return `${base}${path}`
  return `${base}/${path}`
}

export function SEOHead() {
  const { lang, t } = useLanguage()
  const locale = lang === 'es' ? cfg.locale : cfg.alternateLocale
  const pageTitle = lang === 'es'
    ? 'Nicolas Duran Garces (NIDUGA) · Ingeniero de Software Backend | Python FastAPI'
    : 'Nicolas Duran Garces (NIDUGA) · Backend Software Engineer | Python FastAPI'
  const rawDesc = lang === 'es'
    ? cfg.description
    : 'Nicolas Duran Garces (NIDUGA) - Backend software engineer specialized in Python (FastAPI, Django), scalable API architecture, and observable systems. Full-stack capabilities with React for end-to-end delivery. DevOps experience with Docker, AWS Lambda, and CI/CD pipelines.'
  const description = rawDesc.length > 155 ? `${rawDesc.slice(0, 152)}…` : rawDesc
  const isBrowser = typeof window !== 'undefined'
  const relativePath = isBrowser ? `${window.location.pathname}${window.location.search}` : '/'
  const absoluteUrl = getAbsoluteUrl(relativePath || '/')
  const canonicalUrl = (() => {
    const url = new URL(absoluteUrl)
    trackingParams.forEach(param => url.searchParams.delete(param))
    return url.toString()
  })()
  const ogImage = getAbsoluteUrl(cfg.image)
  const robots = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
  const keywords = cfg.keywords?.join(', ')
  const alternates = [
    { hrefLang: 'es-CO', href: getAbsoluteUrl('/') },
    { hrefLang: 'en-US', href: getAbsoluteUrl('/?lang=en') },
    { hrefLang: 'x-default', href: getAbsoluteUrl('/') },
  ]
  const breadcrumbs = [
    { id: '#about', label: t('nav.about') },
    { id: '#skills', label: t('nav.skills') },
    { id: '#experience', label: t('nav.experience') },
    { id: '#projects', label: t('nav.projects') },
    { id: '#contact', label: t('nav.contact') },
  ].map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    item: getAbsoluteUrl(`/${item.id}`.replace('//', '/')),
  }))
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        name: cfg.author,
        jobTitle: cfg.jobTitle,
        description,
        url: canonicalUrl,
        sameAs: cfg.sameAs,
        email: `mailto:${cfg.contact.email}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: cfg.contact.location,
          addressCountry: 'CO',
        },
        knowsAbout: cfg.keywords ?? [],
        worksFor: {
          '@type': 'Organization',
          name: cfg.worksFor.name,
        },
      },
      {
        '@type': 'WebSite',
        name: cfg.siteName,
        url: getAbsoluteUrl('/'),
        inLanguage: locale,
        description,
        publisher: {
          '@type': 'Person',
          name: cfg.author,
        },
        potentialAction: {
          '@type': 'ContactAction',
          target: `${getAbsoluteUrl('/#contact')}`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs,
      },
    ],
  }

  return (
    <Helmet prioritizeSeoTags>
      <html lang={lang} />
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      <meta name="author" content={cfg.author} />
      <meta name="application-name" content={cfg.siteName} />
      <meta name="theme-color" content="#0b0c10" />
      <meta name="apple-mobile-web-app-title" content={cfg.author} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="copyright" content={`${new Date().getFullYear()} ${cfg.author}`} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={canonicalUrl} />
      {alternates.map(link => (
        <link rel="alternate" hrefLang={link.hrefLang} href={link.href} key={link.hrefLang} />
      ))}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={cfg.siteName} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content={locale} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:alt" content={`${cfg.author} portfolio preview`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {cfg.twitter && (
        <>
          <meta name="twitter:site" content={cfg.twitter} />
          <meta name="twitter:creator" content={cfg.twitter} />
        </>
      )}
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${cfg.author} portfolio preview`} />

      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(schemaGraph)}
      </script>
    </Helmet>
  )
}
