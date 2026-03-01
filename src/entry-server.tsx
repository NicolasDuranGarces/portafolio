import { renderToString } from 'react-dom/server'
import { App } from './App'
import { SEOProvider } from './components/SEO'
import { getLocaleFromPathname } from './lib/site'

export function renderPage(pathname: string) {
  const helmetContext: Record<string, unknown> = {}
  const locale = getLocaleFromPathname(pathname)
  const appHtml = renderToString(
    <SEOProvider context={helmetContext}>
      <App initialLang={locale} pathname={pathname} />
    </SEOProvider>
  )

  return { appHtml, helmetContext, locale }
}
