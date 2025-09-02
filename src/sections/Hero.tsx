import { motion } from 'framer-motion'
import { useLanguage } from '../components/LanguageProvider'

export function Hero() {
  const { t } = useLanguage()
  return (
    <section id="top" className="container" style={{ paddingTop: '6rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr .8fr', gap: '2rem' }}>
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: 'clamp(2rem, 2.2rem + 1vw, 3rem)', marginBottom: '.5rem' }}
          >
            {t('hero.greeting')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            style={{ color: 'var(--muted)', fontSize: '1.05rem' }}
          >
            {t('hero.sub')}
          </motion.p>
          <div style={{ display: 'flex', gap: '.75rem', marginTop: '1.25rem' }}>
            <a className="btn" href="#projects">{t('hero.ctaProjects')}</a>
            <a className="btn ghost" href="#contact">{t('hero.ctaContact')}</a>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="card"
          style={{ display: 'grid', placeItems: 'center', minHeight: 220, animation: 'float 6s ease-in-out infinite' }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3.2rem' }}>🚀</div>
            <div style={{ color: 'var(--muted)' }}>Construyendo experiencias con intención</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
