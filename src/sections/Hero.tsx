import { motion } from 'framer-motion'
import { useLanguage } from '../components/LanguageProvider'

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

export function Hero() {
  const { t } = useLanguage()
  const specialties = t('hero.specialties').split('|').map((item) => item.trim()).filter(Boolean)
  const stats = [
    { value: t('hero.stats.years.value'), label: t('hero.stats.years.label') },
    { value: t('hero.stats.projects.value'), label: t('hero.stats.projects.label') },
    { value: t('hero.stats.repos.value'), label: t('hero.stats.repos.label') },
    { value: t('hero.stats.coffee.value'), label: t('hero.stats.coffee.label') },
  ]

  return (
    <section id="top" className="hero-section container">
      <div className="hero-grid">
        <motion.div
          className="hero-copy"
          initial="hidden"
          animate="show"
          variants={fade}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="hero-overline">{t('hero.overline')}</p>
          <h1>
            {t('hero.title')} <span className="gradient-text">{t('hero.highlight')}</span>
          </h1>
          <p className="hero-description">{t('hero.sub')}</p>

          <div className="hero-specialties">
            {specialties.map((item) => (
              <span className="hero-chip" key={item}>{item}</span>
            ))}
          </div>

          <div className="hero-cta">
            <a className="btn" href="#projects">{t('hero.ctaProjects')}</a>
            <a className="btn ghost" href="#contact">{t('hero.ctaContact')}</a>
            <a className="btn ghost" href="/CV_NICOLAS_DURAN.pdf" download aria-label={t('hero.downloadCV')}>
              📄 {t('hero.ctaCV')}
            </a>
          </div>
          <p className="hero-tagline">{t('hero.tagline')}</p>
        </motion.div>

        <motion.div
          className="hero-panel card fancy"
          initial="hidden"
          animate="show"
          variants={fade}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-panel__identity">
            <div className="hero-avatar">
              <img src="/assets/avatar.jpg" alt={t('hero.avatarAlt')} loading="lazy" />
            </div>
            <span className="hero-panel__name">{t('hero.greeting')}</span>
            <span className="hero-panel__role">{t('hero.role')}</span>
          </div>

          <div className="hero-panel__spotlight">
            <p className="hero-panel__label">{t('hero.spotlight.title')}</p>
            <p>{t('hero.spotlight.body')}</p>
          </div>

          <div className="hero-stats hero-stats--card">
            {stats.map((stat, index) => (
              <div className={`hero-stat${index === stats.length - 1 ? ' hero-stat--full' : ''}`} key={stat.label}>
                <span className="hero-stat__value">{stat.value}</span>
                <span className="hero-stat__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
