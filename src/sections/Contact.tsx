import { Section } from '../components/Section'
import { SocialLinks } from '../components/SocialLinks'
import { useLanguage } from '../components/LanguageProvider'

export function Contact() {
  const { t } = useLanguage()
  return (
    <Section id="contact" title={t('contact.title')} lead={t('contact.lead')}>
      <div className="grid" style={{ gridTemplateColumns: '1.2fr .8fr' }}>
        <form className="card" onSubmit={(e) => e.preventDefault()} aria-label={t('contact.formAria')}>
          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <label>
              <div>{t('contact.name')}</div>
              <input required placeholder={t('contact.placeholders.name')} name="name" />
            </label>
            <label>
              <div>{t('contact.email')}</div>
              <input type="email" required placeholder={t('contact.placeholders.email')} name="email" />
            </label>
          </div>
          <label style={{ display: 'block', marginTop: '.75rem' }}>
            <div>{t('contact.message')}</div>
            <textarea required rows={5} placeholder={t('contact.placeholders.message')} name="message" />
          </label>
          <div style={{ marginTop: '1rem' }}>
            <button className="btn" type="submit">{t('contact.send')}</button>
          </div>
        </form>
        <div className="card" style={{ display: 'grid', alignContent: 'center', gap: '1rem' }}>
          <h3 style={{ margin: 0 }}>{t('contact.socialTitle')}</h3>
          <p style={{ color: 'var(--muted)', marginTop: 0 }}>{t('contact.socialLead')}</p>
          <SocialLinks
            github="https://github.com/tu-usuario"
            linkedin="https://www.linkedin.com/in/tu-usuario/"
            twitter="https://twitter.com/tu-usuario"
            email="correo@ejemplo.com"
          />
        </div>
      </div>
    </Section>
  )
}
