import { motion } from 'framer-motion'
import { Section } from '../components/Section'
import { SocialLinks } from '../components/SocialLinks'
import { useLanguage } from '../components/LanguageProvider'

const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

export function Contact() {
  const { t } = useLanguage()

  return (
    <Section id="contact" title={t('contact.title')} lead={t('contact.lead')}>
      <motion.div
        variants={item}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="card fancy"
        style={{
          padding: '3rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          textAlign: 'center',
          maxWidth: '500px',
          margin: '0 auto'
        }}
      >
        <h3 style={{ margin: 0 }}>{t('contact.socialTitle')}</h3>
        <p style={{ color: 'var(--muted)', margin: 0 }}>{t('contact.socialLead')}</p>
        <SocialLinks
          github="https://github.com/NicolasDuranGarces"
          linkedin="https://www.linkedin.com/in/garcesnicolas/"
          email="niduga@outlook.es"
        />
      </motion.div>
    </Section>
  )
}

