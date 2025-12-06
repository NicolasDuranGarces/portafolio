import { motion } from 'framer-motion'
import { Section } from '../components/Section'
import { SocialLinks } from '../components/SocialLinks'
import { useLanguage } from '../components/LanguageProvider'

const container = { show: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

export function Contact() {
  const { t } = useLanguage()
  return (
    <Section id="contact" title={t('contact.title')} lead={t('contact.lead')}>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, .8fr)', gap: '2rem' }}
      >
        <motion.form 
          variants={item}
          className="card fancy" 
          style={{ padding: '2rem' }}
          onSubmit={(e) => e.preventDefault()} 
          aria-label={t('contact.formAria')}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <label>
              <div style={{ marginBottom: '0.5rem', fontWeight: 500 }}>{t('contact.name')}</div>
              <input required placeholder={t('contact.placeholders.name')} name="name" />
            </label>
            <label>
              <div style={{ marginBottom: '0.5rem', fontWeight: 500 }}>{t('contact.email')}</div>
              <input type="email" required placeholder={t('contact.placeholders.email')} name="email" />
            </label>
          </div>
          <label style={{ display: 'block', marginTop: '1rem' }}>
            <div style={{ marginBottom: '0.5rem', fontWeight: 500 }}>{t('contact.message')}</div>
            <textarea required rows={5} placeholder={t('contact.placeholders.message')} name="message" />
          </label>
          <div style={{ marginTop: '1.5rem' }}>
            <button className="btn" type="submit">{t('contact.send')}</button>
          </div>
        </motion.form>
        
        <motion.div 
          variants={item}
          className="card fancy" 
          style={{ padding: '2rem', display: 'grid', alignContent: 'center', gap: '1rem' }}
        >
          <h3 style={{ margin: 0 }}>{t('contact.socialTitle')}</h3>
          <p style={{ color: 'var(--muted)', marginTop: 0 }}>{t('contact.socialLead')}</p>
          <SocialLinks
            github="https://github.com/tu-usuario"
            linkedin="https://www.linkedin.com/in/tu-usuario/"
            twitter="https://twitter.com/tu-usuario"
            email="correo@ejemplo.com"
          />
        </motion.div>
      </motion.div>
      
      <style>{`
        @media (max-width: 768px) {
          #contact > div > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </Section>
  )
}
