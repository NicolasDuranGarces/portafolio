import { ThemeProvider } from './components/ThemeProvider'
import { LanguageProvider } from './components/LanguageProvider'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { Projects } from './sections/Projects'
import { Contact } from './sections/Contact'
import { Experience } from './sections/Experience'
import { Footer } from './components/Footer'
import { SEOHead } from './components/SEO'
import { ScrollProgress } from './components/ScrollProgress'
import { ParallaxOrbs } from './components/ParallaxOrbs'
import { SideRails } from './components/SideRails'
import { CornerControls } from './components/CornerControls'

export function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <div className="app">
          <SEOHead />
          <ScrollProgress />
          <ParallaxOrbs />
          <SideRails />
          <CornerControls />
          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  )
}
