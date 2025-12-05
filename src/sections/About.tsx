import { motion } from 'framer-motion'
import { FiMapPin, FiClock, FiZap } from 'react-icons/fi'
import { useLanguage } from '../components/LanguageProvider'

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

export function About() {
  const { t } = useLanguage()
  const story = t('about.story').split('|').map((item) => item.trim()).filter(Boolean)
  const principles = t('about.principles').split('|').map((item) => item.trim()).filter(Boolean)
  const meta = [
    { icon: FiMapPin, label: t('about.meta.location'), value: t('about.meta.locationValue') },
    { icon: FiClock, label: t('about.meta.experience'), value: t('about.meta.experienceValue') },
    { icon: FiZap, label: t('about.meta.availability'), value: t('about.meta.availabilityValue') },
  ]

  return (
    <section id="about" className="section container">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        transition={{ staggerChildren: 0.1 }}
        className="about-simple-grid"
      >
        <motion.div variants={fade} transition={{ duration: 0.5 }}>
          <h2 className="about-simple-heading">{t('about.title')}</h2>
          <p className="about-simple-lead">{t('about.lead')}</p>
        </motion.div>

        {/* Main story card */}
        <motion.article
          variants={fade}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card about-simple-story"
        >
          <p className="about-simple-tagline">{t('about.tagline')}</p>
          <div className="about-simple-text">
            {story.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="about-simple-meta">
            {meta.map((item) => (
              <div key={item.label} className="about-simple-meta-item">
                <item.icon />
                <div>
                  <span className="about-simple-meta-label">{item.label}</span>
                  <p className="about-simple-meta-value">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="about-simple-principles">
            {principles.map((principle) => (
              <span key={principle} className="about-simple-chip">
                {principle}
              </span>
            ))}
          </div>
        </motion.article>
      </motion.div>
    </section>
  )
}
