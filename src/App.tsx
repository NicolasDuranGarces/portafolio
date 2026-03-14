import { useCallback, useEffect, useRef, useState } from 'react'
import { ThemeProvider } from './components/ThemeProvider'
import { LanguageProvider } from './components/LanguageProvider'
import { Hero } from './sections/Hero'
import { Footer } from './components/Footer'
import { SEOHead } from './components/SEO'
import { ScrollProgress } from './components/ScrollProgress'
import { ParallaxOrbs } from './components/ParallaxOrbs'
import { CornerControls } from './components/CornerControls'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { Projects } from './sections/Projects'
import { Experience } from './sections/Experience'
import { Services } from './sections/Services'
import type { Lang } from './components/LanguageProvider'

type Props = {
  initialLang?: Lang
}

export function App({ initialLang }: Props) {
  const appRef = useRef<HTMLDivElement | null>(null)
  const [heroFocusActive, setHeroFocusActive] = useState(false)

  const applyHeroFocusState = useCallback((active: boolean) => {
    setHeroFocusActive(active)
    document.documentElement.classList.toggle('hero-focus-active', active)
    document.body.classList.toggle('hero-focus-active', active)
  }, [])

  useEffect(() => {
    const syncHeroFocus = () => {
      applyHeroFocusState(document.fullscreenElement === document.documentElement)
    }

    document.addEventListener('fullscreenchange', syncHeroFocus)
    return () => {
      document.removeEventListener('fullscreenchange', syncHeroFocus)
      document.documentElement.classList.remove('hero-focus-active')
      document.body.classList.remove('hero-focus-active')
    }
  }, [applyHeroFocusState])

  const handleToggleHeroFocus = useCallback(async () => {
    const appNode = appRef.current
    const fullscreenTarget = document.documentElement
    if (!appNode) return

    if (document.fullscreenElement === fullscreenTarget) {
      await document.exitFullscreen()
      applyHeroFocusState(false)
      return
    }

    window.scrollTo({ top: 0, behavior: 'auto' })

    if (document.fullscreenElement && document.fullscreenElement !== fullscreenTarget) {
      await document.exitFullscreen()
    }

    if (fullscreenTarget.requestFullscreen) {
      await fullscreenTarget.requestFullscreen({ navigationUI: 'hide' })
      applyHeroFocusState(true)
      return
    }

    applyHeroFocusState(true)
  }, [applyHeroFocusState])

  return (
    <LanguageProvider initialLang={initialLang}>
      <ThemeProvider>
        <div ref={appRef} className={`app${heroFocusActive ? ' app--hero-focus' : ''}`}>
          <SEOHead />
          <ScrollProgress />
          <CornerControls heroFocusActive={heroFocusActive} onToggleHeroFocus={handleToggleHeroFocus} />
          <ParallaxOrbs />
          <main id="main-content">
            <Hero />
            <Experience />
            <About />
            <Skills />
            <Services />
            <Projects />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  )
}
