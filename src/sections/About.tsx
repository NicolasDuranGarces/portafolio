import { Section } from '../components/Section'
import { useLanguage } from '../components/LanguageProvider'
import { TechIcon } from '../components/TechIcon'
import { IconTiles } from '../components/IconTiles'

export function About() {
  const { t } = useLanguage()
  return (
    <Section id="about" title={t('about.title')} lead={t('about.lead')}>
      <div className="grid about-grid" style={{ gridTemplateColumns: '1.1fr .9fr' }}>
        <div>
          <p>{t('about.p1')}</p>
          <p>{t('about.p2')}</p>
          <p>{t('about.p3')}</p>
        </div>
        <aside className="card" aria-label={t('about.highlightsAria')} style={{ alignSelf: 'start' }}>
          <h3 style={{ marginTop: 0 }}>{t('about.cloudTitle')}</h3>
          <IconTiles items={['AWS', 'EC2', 'S3', 'ECR', 'Fargate', 'DynamoDB', 'Lambda']} />
          <h4 style={{ marginBottom: '.35rem', marginTop: '1rem' }}>{t('about.dataTitle')}</h4>
          <IconTiles items={['MySQL', 'MongoDB']} />
        </aside>
      </div>
    </Section>
  )
}
