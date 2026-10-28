import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { ui } from './content/ui'
import { useReveal } from './hooks/useReveal'
import { CasePage } from './pages/CasePage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PrivacyPage } from './pages/PrivacyPage'
import type { Route } from './lib/routes'

export function App({ route }: { route: Route }) {
  useReveal()

  if (route.page === 'notFound') return <NotFoundPage />

  const { lang } = route
  return (
    <>
      <a
        href="#main"
        className="control control-primary fixed top-4 left-4 z-60 -translate-y-24 focus:translate-y-0"
      >
        {ui[lang].skipToContent}
      </a>
      <Nav route={route} />
      <main id="main" tabIndex={-1}>
        {route.page === 'home' && <HomePage lang={lang} />}
        {route.page === 'case' && <CasePage lang={lang} slug={route.slug} />}
        {route.page === 'privacy' && <PrivacyPage lang={lang} />}
      </main>
      <Footer lang={lang} />
    </>
  )
}
