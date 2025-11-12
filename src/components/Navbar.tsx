import { ThemeToggle } from './ThemeToggle'
import { LanguageToggle } from './LanguageToggle'
import { useLanguage } from './LanguageProvider'

const sections = ['about', 'skills', 'experience', 'projects', 'contact'] as const

export function Navbar() {
  const { t } = useLanguage()
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#top" className="nav-brand" aria-label={t('nav.brandAria')}>
          <span className="nav-brand__name">Nicolas Duran Garces</span>
          <span className="nav-brand__role">{t('hero.role')}</span>
        </a>

        <nav className="nav-links" aria-label={t('nav.sectionsAria')}>
          {sections.map((section) => (
            <a key={section} href={`#${section}`}>{t(`nav.${section}`)}</a>
          ))}
        </nav>

        <div className="nav-controls">
          <div className="nav-toggle">
            <LanguageToggle />
          </div>
          <div className="nav-toggle">
            <ThemeToggle />
          </div>
          <a className="nav-cta" href="#projects">{t('hero.ctaProjects')}</a>
        </div>
      </div>
    </header>
  )
}
