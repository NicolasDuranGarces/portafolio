import { Helmet, HelmetProvider } from 'react-helmet-async'
import { SEO as cfg } from '../seo.config'
import { useLanguage } from './LanguageProvider'

export function SEOProvider({ children }: { children: React.ReactNode }) {
  return <HelmetProvider>{children}</HelmetProvider>
}

export function SEOHead() {
  const { lang } = useLanguage()
  const title = lang === 'es' ? 'Nicolas Duran Garces — Portafolio' : 'Nicolas Duran Garces — Portfolio'
  const desc = lang === 'es'
    ? 'Desarrollador de software. Backend con Python (FastAPI, Django), UIs en React y despliegue con Docker. Experiencia creando APIs escalables y productos de calidad.'
    : 'Software developer. Python backend (FastAPI, Django), React UIs, and Docker deployments. Experience building scalable APIs and quality products.'
  const url = cfg.siteUrl
  const img = cfg.image
  const locale = lang === 'es' ? 'es_CO' : 'en_US'
  return (
    <Helmet prioritizeSeoTags>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#0b0c10" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={cfg.siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={locale} />
      <meta property="og:image" content={img} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {cfg.twitter && <meta name="twitter:site" content={cfg.twitter} />}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />

      {/* JSON-LD Person + WebSite */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Nicolas Duran Garces',
          url,
          sameAs: [
            'https://github.com/tu-usuario',
            'https://www.linkedin.com/in/tu-usuario/',
            'https://twitter.com/tu-usuario',
          ],
          jobTitle: 'Software Engineer',
          worksFor: { '@type': 'Organization', name: 'Freelance' },
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: cfg.siteName,
          url,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${url}/?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        })}
      </script>
    </Helmet>
  )
}
