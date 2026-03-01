import { motion } from 'framer-motion'
import { FiArrowUpRight, FiCompass, FiLayers, FiShield } from 'react-icons/fi'
import { Section } from '../components/Section'
import { useLanguage } from '../components/LanguageProvider'
import { getServiceCards, getServiceOverview } from '../content/services'

const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

export function Services() {
  const { t, lang } = useLanguage()
  const overview = getServiceOverview(lang)
  const cards = getServiceCards(lang)
  const supportPoints = lang === 'es'
    ? [
        { icon: <FiCompass aria-hidden="true" />, label: 'Entrada flexible', value: 'Discovery, ejecucion o soporte puntual segun la etapa del producto.' },
        { icon: <FiShield aria-hidden="true" />, label: 'Menos friccion', value: 'Decisiones tecnicas con foco en bajar riesgo y no inflar procesos.' },
      ]
    : [
        { icon: <FiCompass aria-hidden="true" />, label: 'Flexible entry point', value: 'Discovery, direct execution, or focused support depending on product stage.' },
        { icon: <FiShield aria-hidden="true" />, label: 'Lower friction', value: 'Technical decisions aimed at reducing risk without bloating process.' },
      ]

  return (
    <Section id="services" title={t('services.title')} lead={t('services.lead')}>
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          <motion.article
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="card fancy"
            style={{
              padding: '2.2rem',
              display: 'grid',
              gap: '1.5rem',
              background: 'linear-gradient(155deg, color-mix(in oklab, var(--panel) 90%, transparent), color-mix(in oklab, var(--panel) 70%, transparent))',
            }}
          >
            <div>
              <p style={{ margin: '0 0 0.85rem', textTransform: 'uppercase', letterSpacing: '.24em', fontSize: '.72rem', color: 'var(--muted)' }}>
                {overview.eyebrow}
              </p>
              <h3 style={{ margin: 0, fontSize: 'clamp(1.7rem, 1.2rem + 1.2vw, 2.35rem)', lineHeight: 1.08 }}>
                {overview.title}
              </h3>
            </div>

            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.8, maxWidth: '60ch' }}>
              {overview.description}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
              {overview.points.map((point, index) => (
                <div
                  key={point}
                  style={{
                    padding: '1rem 1.1rem',
                    borderRadius: '16px',
                    border: '1px solid color-mix(in oklab, var(--text) 10%, transparent)',
                    background: 'color-mix(in oklab, var(--panel) 68%, transparent)',
                  }}
                >
                  <span style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--primary)', fontSize: '.78rem', fontWeight: 700 }}>
                    0{index + 1}
                  </span>
                  <p style={{ margin: 0, color: 'var(--text)', lineHeight: 1.65 }}>{point}</p>
                </div>
              ))}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                padding: '1rem 1.15rem',
                borderRadius: '18px',
                border: '1px solid color-mix(in oklab, var(--primary) 18%, transparent)',
                background: 'color-mix(in oklab, var(--primary) 7%, transparent)',
              }}
            >
              <div>
                <p style={{ margin: '0 0 0.35rem', textTransform: 'uppercase', letterSpacing: '.2em', fontSize: '.7rem', color: 'var(--muted)' }}>
                  {overview.proof.label}
                </p>
                <p style={{ margin: 0, lineHeight: 1.6 }}>{overview.proof.value}</p>
              </div>
              <FiArrowUpRight aria-hidden="true" style={{ flexShrink: 0, fontSize: '1.35rem', color: 'var(--primary)' }} />
            </div>
          </motion.article>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {supportPoints.map((point) => (
              <motion.article
                key={point.label}
                variants={item}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="card fancy"
                style={{ padding: '1.6rem', display: 'grid', gap: '0.9rem', alignContent: 'start' }}
              >
                <span style={{ fontSize: '1.3rem', color: 'var(--primary)' }}>{point.icon}</span>
                <strong style={{ fontSize: '1.05rem' }}>{point.label}</strong>
                <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.7 }}>{point.value}</p>
              </motion.article>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {cards.map((card) => (
            <motion.article
              key={card.title}
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="card fancy"
              style={{ padding: '1.85rem', display: 'grid', gap: '1.1rem', alignContent: 'start' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    borderRadius: '999px',
                    border: '1px solid color-mix(in oklab, var(--text) 10%, transparent)',
                    padding: '0.45rem 0.8rem',
                    fontSize: '.76rem',
                    textTransform: 'uppercase',
                    letterSpacing: '.16em',
                    color: 'var(--muted)',
                  }}
                >
                  <FiLayers aria-hidden="true" style={{ color: 'var(--primary)' }} />
                  {card.eyebrow}
                </span>
              </div>

              <div>
                <h3 style={{ margin: '0 0 0.7rem' }}>{card.title}</h3>
                <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.75 }}>{card.description}</p>
              </div>

              <ul style={{ paddingLeft: '1.1rem', margin: 0, color: 'var(--muted)', lineHeight: 1.8 }}>
                {card.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>

              <div
                style={{
                  padding: '1rem 1.05rem',
                  borderRadius: '16px',
                  background: 'color-mix(in oklab, var(--panel) 70%, transparent)',
                  border: '1px solid color-mix(in oklab, var(--text) 10%, transparent)',
                }}
              >
                <p style={{ margin: '0 0 0.55rem', textTransform: 'uppercase', letterSpacing: '.18em', fontSize: '.7rem', color: 'var(--muted)' }}>
                  {lang === 'es' ? 'Resultado esperado' : 'Expected outcome'}
                </p>
                <div style={{ display: 'grid', gap: '0.45rem' }}>
                  {card.outcomes.map((outcome) => (
                    <p key={outcome} style={{ margin: 0, lineHeight: 1.6 }}>
                      {outcome}
                    </p>
                  ))}
                </div>
              </div>

              <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65, fontSize: '.94rem' }}>
                {card.fit}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  )
}
