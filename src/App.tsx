import { lazy, Suspense } from 'react'
import { ThemeProvider } from './components/ThemeProvider'
import { LanguageProvider } from './components/LanguageProvider'
import { Hero } from './sections/Hero'
import { Footer } from './components/Footer'
import { SEOHead } from './components/SEO'
import { ScrollProgress } from './components/ScrollProgress'
import { ParallaxOrbs } from './components/ParallaxOrbs'
import { SideRails } from './components/SideRails'
import { CornerControls } from './components/CornerControls'

// Lazy load heavy sections for better performance
const About = lazy(() => import('./sections/About').then(m => ({ default: m.About })))
const Skills = lazy(() => import('./sections/Skills').then(m => ({ default: m.Skills })))
const Projects = lazy(() => import('./sections/Projects').then(m => ({ default: m.Projects })))
const Contact = lazy(() => import('./sections/Contact').then(m => ({ default: m.Contact })))
const Experience = lazy(() => import('./sections/Experience').then(m => ({ default: m.Experience })))

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
            <Suspense fallback={<div style={{ minHeight: '400px' }} />}>
              <Experience />
            </Suspense>
            <Suspense fallback={<div style={{ minHeight: '400px' }} />}>
              <About />
            </Suspense>
            <Suspense fallback={<div style={{ minHeight: '400px' }} />}>
              <Skills />
            </Suspense>
            <Suspense fallback={<div style={{ minHeight: '600px' }} />}>
              <Projects />
            </Suspense>
            <Suspense fallback={<div style={{ minHeight: '400px' }} />}>
              <Contact />
            </Suspense>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  )
}
