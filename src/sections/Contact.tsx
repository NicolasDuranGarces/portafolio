import { motion } from 'framer-motion'
import { Section } from '../components/Section'
import { SocialLinks } from '../components/SocialLinks'
import { useLanguage } from '../components/LanguageProvider'

const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

export function Contact() {
  const { t, lang } = useLanguage()

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
        <p style={{ color: 'var(--muted)', margin: 0, maxWidth: '36rem', lineHeight: 1.7 }}>
          {lang === 'es'
            ? 'Si estas buscando un backend developer, un ingeniero de software en Armenia Quindio o alguien que te ayude a estructurar APIs y despliegues con criterio, aqui es donde me encuentras.'
            : 'If you are looking for a backend developer, a software engineer based in Armenia Quindio, or someone to help structure APIs and deployments with discipline, this is where you can reach me.'}
        </p>
        <SocialLinks
          github="https://github.com/NicolasDuranGarces"
          linkedin="https://www.linkedin.com/in/garcesnicolas/"
          email="niduga@outlook.es"
        />
      </motion.div>
    </Section>
  )
}
