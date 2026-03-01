import { ThemeProvider } from './components/ThemeProvider'
import { LanguageProvider } from './components/LanguageProvider'
import { Hero } from './sections/Hero'
import { Footer } from './components/Footer'
import { SEOHead } from './components/SEO'
import { ScrollProgress } from './components/ScrollProgress'
import { ParallaxOrbs } from './components/ParallaxOrbs'
import { SideRails } from './components/SideRails'
import { CornerControls } from './components/CornerControls'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { Projects } from './sections/Projects'
import { Contact } from './sections/Contact'
import { Experience } from './sections/Experience'
import { Services } from './sections/Services'
import { FAQ } from './sections/FAQ'
import type { Lang } from './components/LanguageProvider'

type Props = {
  initialLang?: Lang
}

export function App({ initialLang }: Props) {
  return (
    <LanguageProvider initialLang={initialLang}>
      <ThemeProvider>
        <div className="app">
          <SEOHead />
          <ScrollProgress />
          <ParallaxOrbs />
          <SideRails />
          <CornerControls />
          <main id="main-content">
            <Hero />
            <Experience />
            <About />
            <Skills />
            <Services />
            <Projects />
            <FAQ />
            <Contact />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  )
}
