import { Section } from '../components/Section'
import { experience } from '../data/experience'
import { useLanguage } from '../components/LanguageProvider'

export function Experience() {
  const { t, lang } = useLanguage()
  const items = experience[lang]
  return (
    <Section id="experience" title={t('experience.title')} lead={t('experience.lead')}>
      <ol className="timeline">
        {items.map((e) => (
          <li key={e.company + e.period} className="timeline-item card">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div>
                <h3 style={{ margin: 0 }}>{e.role}</h3>
                <div style={{ color: 'var(--muted)' }}>{e.company}{e.location ? ` · ${e.location}` : ''}</div>
              </div>
              <span className="badge" aria-label={t('experience.periodLabel')} style={{ alignSelf: 'center' }}>{e.period}</span>
            </header>
            <ul style={{ marginTop: '.5rem' }}>
              {e.achievements.map((a) => (
                <li key={a} style={{ color: 'var(--muted)' }}>{a}</li>
              ))}
            </ul>
            {e.stack && (
              <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginTop: '.5rem' }}>
                {e.stack.map((s) => (
                  <span key={s} className="badge">{s}</span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>
    </Section>
  )
}
