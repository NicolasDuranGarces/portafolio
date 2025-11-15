import { FiBookOpen, FiCode, FiLayers, FiServer, FiZap, FiClock, FiMapPin, FiCheck } from 'react-icons/fi'
import { Section } from '../components/Section'
import { useLanguage } from '../components/LanguageProvider'
import { IconTiles } from '../components/IconTiles'

export function About() {
  const { t } = useLanguage()
  const story = t('about.story').split('|').map((item) => item.trim()).filter(Boolean)
  const principles = t('about.principles').split('|').map((item) => item.trim()).filter(Boolean)
  const focus = t('about.focus').split('|').map((item) => item.trim()).filter(Boolean)
  const highlights = [
    { title: t('about.highlights.architecture.title'), body: t('about.highlights.architecture.body') },
    { title: t('about.highlights.leadership.title'), body: t('about.highlights.leadership.body') },
    { title: t('about.highlights.delivery.title'), body: t('about.highlights.delivery.body') },
  ]
  const teachingBullets = t('about.teaching.bullets').split('|').map((item) => item.trim()).filter(Boolean)
  const lowCodeTools = t('about.lowcode.tools').split('|').map((item) => item.trim()).filter(Boolean)
  const metrics = [
    { value: t('about.metrics.years.value'), label: t('about.metrics.years.label') },
    { value: t('about.metrics.squads.value'), label: t('about.metrics.squads.label') },
    { value: t('about.metrics.uptime.value'), label: t('about.metrics.uptime.label') },
  ]
  const meta = [
    { icon: FiMapPin, label: t('about.meta.location'), value: t('about.meta.locationValue') },
    { icon: FiClock, label: t('about.meta.experience'), value: t('about.meta.experienceValue') },
    { icon: FiZap, label: t('about.meta.availability'), value: t('about.meta.availabilityValue') },
  ]

  return (
    <Section id="about" title={t('about.title')} lead={t('about.lead')}>
      <div className="about-shell">
        <div className="about-bento">
          <article className="card about-profile">
            <p className="eyebrow">{t('about.tagline')}</p>
            <div className="about-story">
              {story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <ul className="about-meta" aria-label={t('about.metaAria')}>
              {meta.map((item) => (
                <li key={item.label} className="about-meta__item">
                  <item.icon aria-hidden="true" />
                  <div>
                    <span className="about-meta__label">{item.label}</span>
                    <p className="about-meta__value">{item.value}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="about-principles" aria-label={t('about.principlesAria')}>
              {principles.map((principle) => (
                <span key={principle} className="pill">
                  <FiCheck aria-hidden="true" />
                  {principle}
                </span>
              ))}
            </div>
          </article>

          <article className="card about-focus" aria-label={t('about.focusAria')}>
            <div className="about-card-heading">
              <FiLayers aria-hidden="true" />
              <div>
                <p className="eyebrow">{t('about.focusTitle')}</p>
                <h3>{t('about.focusHeadline')}</h3>
              </div>
            </div>
            <ul className="about-focus__list">
              {focus.map((item) => (
                <li key={item} className="about-focus__item">
                  <FiServer aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="card about-teaching">
            <div className="about-card-heading">
              <FiBookOpen aria-hidden="true" />
              <div>
                <p className="eyebrow">{t('about.teaching.title')}</p>
                <h3>{t('about.teaching.title')}</h3>
              </div>
            </div>
            <p>{t('about.teaching.body')}</p>
            <ul className="about-list">
              {teachingBullets.map((item) => (
                <li key={item}>
                  <FiCheck aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="card about-lowcode">
            <div className="about-card-heading">
              <FiCode aria-hidden="true" />
              <div>
                <p className="eyebrow">{t('about.lowcode.title')}</p>
                <h3>{t('about.lowcode.title')}</h3>
              </div>
            </div>
            <p>{t('about.lowcode.body')}</p>
            <div className="about-tools">
              {lowCodeTools.map((tool) => (
                <span key={tool} className="pill">{tool}</span>
              ))}
            </div>
          </article>

          <div className="card about-highlights" aria-label={t('about.highlightsAria')}>
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
              <IconTiles items={['MySQL', 'PostgreSQL', 'MongoDB', 'DynamoDB']} />
            </div>
          </div>

          <article className="card about-metrics" aria-label={t('about.metricsAria')}>
            <div className="about-metrics__grid">
              {metrics.map((metric) => (
                <div key={metric.label} className="about-metric">
                  <span className="about-metric__value">{metric.value}</span>
                  <span className="about-metric__label">{metric.label}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </Section>
  )
}
