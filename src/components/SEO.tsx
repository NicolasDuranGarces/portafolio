import { Helmet, HelmetProvider } from 'react-helmet-async'
import { SEO as cfg } from '../seo.config'
import { useLanguage } from './LanguageProvider'
import { getFaqEntries } from '../content/faq'
import { getAbsoluteUrl, getAlternateUrls, getCanonicalPath } from '../lib/site'

export function SEOProvider({ children, context }: { children: React.ReactNode; context?: Record<string, unknown> }) {
  return <HelmetProvider context={context}>{children}</HelmetProvider>
}

type Props = {
  pathname?: string
}

export function SEOHead({ pathname }: Props) {
  const { lang, t } = useLanguage()
  const locale = lang === 'es' ? cfg.locale : cfg.alternateLocale
  const canonicalPath = getCanonicalPath(lang)
  const canonicalUrl = getAbsoluteUrl(pathname && pathname.startsWith('/en') ? '/en/' : canonicalPath)
  const description = t('seo.description')
  const pageTitle = t('seo.title')
  const ogImage = getAbsoluteUrl(cfg.image)
  const robots = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
  const keywords = [...cfg.keywords.shared, ...cfg.keywords[lang]].join(', ')
  const alternates = getAlternateUrls()
  const faqEntries = getFaqEntries(lang)
  const sameAs = cfg.sameAs

  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${getAbsoluteUrl('/') }#person`,
        name: cfg.author,
        alternateName: cfg.alternateName,
        jobTitle: lang === 'es' ? 'Ingeniero de software backend' : 'Backend software engineer',
        description,
        url: canonicalUrl,
        sameAs,
        email: `mailto:${cfg.email}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: cfg.location.city,
          addressRegion: cfg.location.region,
          addressCountry: cfg.location.countryCode,
        },
        homeLocation: {
          '@type': 'Place',
          name: `${cfg.location.city}, ${cfg.location.region}, ${cfg.location.country}`,
        },
        knowsAbout: [...cfg.keywords.shared, ...cfg.keywords[lang]],
        worksFor: {
          '@type': 'Organization',
          name: cfg.worksFor.name,
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${getAbsoluteUrl('/')}#website`,
        name: cfg.siteName,
        url: getAbsoluteUrl('/'),
        inLanguage: ['es-CO', 'en-US'],
        description,
        publisher: {
          '@id': `${getAbsoluteUrl('/')}#person`,
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: pageTitle,
        description,
        inLanguage: locale,
        isPartOf: {
          '@id': `${getAbsoluteUrl('/')}#website`,
        },
        about: {
          '@id': `${getAbsoluteUrl('/')}#person`,
        },
      },
      {
        '@type': 'CollectionPage',
        name: lang === 'es' ? 'Portafolio backend y proyectos destacados' : 'Backend portfolio and featured projects',
        url: canonicalUrl,
        inLanguage: locale,
        about: {
          '@id': `${getAbsoluteUrl('/')}#person`,
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqEntries.map((entry) => ({
          '@type': 'Question',
          name: entry.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: entry.answer,
          },
        })),
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
      <meta property="og:image:alt" content={lang === 'es' ? 'Vista previa del portafolio de Nicolas Duran Garces' : 'Preview of Nicolas Duran Garces portfolio'} />

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
      <meta name="twitter:image:alt" content={lang === 'es' ? 'Vista previa del portafolio de Nicolas Duran Garces' : 'Preview of Nicolas Duran Garces portfolio'} />

      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(schemaGraph)}
      </script>
    </Helmet>
  )
}
