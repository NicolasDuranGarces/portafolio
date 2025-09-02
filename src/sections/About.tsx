import { Section } from '../components/Section'
import { useLanguage } from '../components/LanguageProvider'

export function About() {
  const { t } = useLanguage()
  return (
    <Section id="about" title={t('about.title')} lead={t('about.lead')}>
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <p>{t('about.p1')}</p>
        <p>{t('about.p2')}</p>
      </div>
    </Section>
  )
}
