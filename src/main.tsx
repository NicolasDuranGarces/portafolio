import React from 'react'
import ReactDOM from 'react-dom/client'
import { hydrateRoot } from 'react-dom/client'
import { App } from './App'
import { SEOProvider } from './components/SEO'
import { getPreferredLocale, normalizeLegacyLanguageUrl } from './lib/site'
import './styles/global.css'

if (typeof window !== 'undefined') {
  const legacyPath = normalizeLegacyLanguageUrl(new URL(window.location.href))
  if (legacyPath) {
    window.history.replaceState({}, '', legacyPath)
  }
}

const rootElement = document.getElementById('root')!
const initialLang = getPreferredLocale(
  window.location.pathname,
  window.location.search,
  window.localStorage.getItem('lang')
)

const app = (
  <React.StrictMode>
    <SEOProvider>
      <App initialLang={initialLang} pathname={window.location.pathname} />
    </SEOProvider>
  </React.StrictMode>
)

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app)
} else {
  ReactDOM.createRoot(rootElement).render(app)
}
