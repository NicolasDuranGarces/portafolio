import { Section } from '../components/Section'
import { useLanguage } from '../components/LanguageProvider'
import { IconTiles } from '../components/IconTiles'

export function About() {
  const { t } = useLanguage()
  const principles = t('about.principles').split('|').map((item) => item.trim()).filter(Boolean)
  const highlights = [
    { title: t('about.highlights.architecture.title'), body: t('about.highlights.architecture.body') },
    { title: t('about.highlights.leadership.title'), body: t('about.highlights.leadership.body') },
    { title: t('about.highlights.delivery.title'), body: t('about.highlights.delivery.body') },
  ]
  const metrics = [
    { value: t('about.metrics.years.value'), label: t('about.metrics.years.label') },
    { value: t('about.metrics.squads.value'), label: t('about.metrics.squads.label') },
    { value: t('about.metrics.uptime.value'), label: t('about.metrics.uptime.label') },
  ]

  return (
    <Section id="about" title={t('about.title')} lead={t('about.lead')}>
      <div className="about-layout">
        <article className="card about-bio">
          <div className="about-bio__text">
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
            <p>{t('about.p3')}</p>
          </div>
          <div className="about-principles" aria-label={t('about.principlesAria')}>
            {principles.map((principle) => (
              <span key={principle} className="pill">{principle}</span>
            ))}
          </div>
        </article>

        <div className="about-sidebar">
          <div className="about-highlights" aria-label={t('about.highlightsAria')}>
            {highlights.map((item) => (
              <article key={item.title} className="about-highlight">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>

          <div className="card about-systems">
            <div>
              <h3>{t('about.cloudTitle')}</h3>
              <IconTiles items={['AWS', 'EC2', 'S3', 'ECR', 'Fargate', 'DynamoDB', 'Lambda']} />
            </div>
            <div>
              <h4>{t('about.dataTitle')}</h4>
              <IconTiles items={['MySQL', 'PostgreSQL', 'MongoDB']} />
            </div>
          </div>

          <div className="card about-stats" aria-label={t('about.metricsAria')}>
            {metrics.map((metric) => (
              <div key={metric.label} className="about-stat">
                <span className="about-stat__value">{metric.value}</span>
                <span className="about-stat__label">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
