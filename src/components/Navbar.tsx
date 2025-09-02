import { ThemeToggle } from './ThemeToggle'
import { LanguageToggle } from './LanguageToggle'
import { useLanguage } from './LanguageProvider'

export function Navbar() {
  const { t } = useLanguage()
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#top" className="brand" aria-label="Inicio">
          Nicolas<span className="dot">.</span>
        </a>
        <nav className="nav-links" aria-label="Secciones">
          <a href="#about">{t('nav.about')}</a>
          <a href="#skills">{t('nav.skills')}</a>
          <a href="#experience">{t('nav.experience')}</a>
          <a href="#projects">{t('nav.projects')}</a>
          <a href="#contact">{t('nav.contact')}</a>
        </nav>
        <div style={{ display: 'flex', gap: '.5rem' }}>
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
