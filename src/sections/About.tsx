import { motion } from 'framer-motion'
import { FiClock, FiCoffee, FiCode, FiMapPin, FiTrendingUp, FiZap } from 'react-icons/fi'
import { useLanguage } from '../components/LanguageProvider'
import { Section } from '../components/Section'

const container = { show: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

export function About() {
  const { t, lang } = useLanguage()
  const story = t('about.story').split('|').map((entry) => entry.trim()).filter(Boolean)
  const principles = t('about.principles').split('|').map((entry) => entry.trim()).filter(Boolean)
  const focus = t('about.focus').split('|').map((entry) => entry.trim()).filter(Boolean)
  const highlights = lang === 'es'
    ? [
        {
          title: 'Backend con foco de negocio',
          body: 'Priorizo APIs claras, rendimiento sano y decisiones de arquitectura que aguanten producto y operacion, no solo una demo.',
        },
        {
          title: 'Remote-first desde Armenia, Quindio',
          body: 'Estoy basado en Colombia y colaboro con equipos que necesitan seniority backend sin importar si el equipo esta local o distribuido.',
        },
        {
          title: 'Entrega completa cuando hace falta',
          body: 'Puedo moverme entre Python, FastAPI, Node.js, Docker, AWS y piezas puntuales de React cuando un feature exige mirada end-to-end.',
        },
      ]
    : [
        {
          title: 'Backend tied to business impact',
          body: 'I prioritize clear APIs, healthy performance, and architecture decisions that can support product and operations beyond a demo.',
        },
        {
          title: 'Remote-first from Armenia, Quindio',
          body: 'I am based in Colombia and collaborate with teams that need senior backend execution whether the team is local or distributed.',
        },
        {
          title: 'Full delivery when needed',
          body: 'I work across Python, FastAPI, Node.js, Docker, AWS, and focused React pieces when a feature needs end-to-end ownership.',
        },
      ]

  const supportCards = [
    {
      icon: <FiMapPin aria-hidden="true" style={{ fontSize: '1.4rem', color: 'var(--primary)' }} />,
      label: t('about.meta.location'),
      value: t('about.meta.locationValue'),
      note: lang === 'es'
        ? 'Disponible para trabajo remoto en Colombia, Latinoamerica, USA y Europa.'
        : 'Available for remote work across Colombia, Latin America, the US, and Europe.',
    },
    {
      icon: <FiClock aria-hidden="true" style={{ fontSize: '1.4rem', color: 'var(--primary)' }} />,
      label: t('about.meta.experience'),
      value: t('about.meta.experienceValue'),
      note: lang === 'es'
        ? 'Experiencia en backend, arquitectura de datos y despliegue cloud-native.'
        : 'Experience across backend engineering, data architecture, and cloud-native delivery.',
    },
    {
      icon: <FiZap aria-hidden="true" style={{ fontSize: '1.4rem', color: 'var(--success)' }} />,
      label: t('about.meta.availability'),
      value: t('about.meta.availabilityValue'),
      note: lang === 'es'
        ? 'Busco roles senior de backend, arquitectura de software y consultoria tecnica.'
        : 'Targeting senior backend, software architecture, and technical consulting work.',
    },
  ]

  return (
    <Section id="about" title={t('about.title')} lead={t('about.lead')}>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-50px' }}
        style={{ display: 'grid', gap: '1.5rem' }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          <motion.article
            variants={item}
            className="card fancy"
            style={{
              padding: '2.35rem',
              display: 'grid',
              gap: '1.5rem',
              background: 'linear-gradient(160deg, color-mix(in oklab, var(--panel) 90%, transparent), color-mix(in oklab, var(--panel) 70%, transparent))',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <FiCoffee aria-hidden="true" style={{ fontSize: '2rem', color: 'var(--primary)' }} />
              <div>
                <p style={{ margin: '0 0 0.35rem', textTransform: 'uppercase', letterSpacing: '.24em', fontSize: '.72rem', color: 'var(--muted)' }}>
                  {lang === 'es' ? 'Detras del build' : 'Behind the build'}
                </p>
                <h3 style={{ margin: 0, fontSize: 'clamp(1.7rem, 1.2rem + 1vw, 2.2rem)', fontWeight: 700 }}>{t('about.tagline')}</h3>
              </div>
            </div>

            <div style={{ color: 'var(--muted)', lineHeight: '1.8', fontSize: '1rem', display: 'grid', gap: '0.9rem' }}>
              {story.map((paragraph, index) => (
                <p key={index} style={{ margin: 0 }}>{paragraph}</p>
              ))}
            </div>

            <div
              style={{
                display: 'grid',
                gap: '0.9rem',
                padding: '1.3rem',
                borderRadius: '18px',
                background: 'color-mix(in oklab, var(--primary) 5%, transparent)',
                border: '1px solid color-mix(in oklab, var(--primary) 15%, transparent)',
              }}
            >
              <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <FiTrendingUp aria-hidden="true" style={{ color: 'var(--primary)' }} />
                {lang === 'es' ? 'Donde aporto mas valor' : 'Where I add the most value'}
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.8rem' }}>
                {focus.map((entry, index) => (
                  <div
                    key={entry}
                    style={{
                      padding: '0.95rem 1rem',
                      borderRadius: '14px',
                      background: 'color-mix(in oklab, var(--panel) 72%, transparent)',
                      border: '1px solid color-mix(in oklab, var(--text) 10%, transparent)',
                    }}
                  >
                    <span style={{ display: 'block', marginBottom: '0.55rem', color: 'var(--primary)', fontSize: '.76rem', fontWeight: 700 }}>
                      0{index + 1}
                    </span>
                    <p style={{ margin: 0, lineHeight: '1.6', color: 'var(--text)' }}>{entry}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.article>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {supportCards.map((card) => (
              <motion.article key={card.label} variants={item} className="card fancy" style={{ padding: '1.6rem', display: 'grid', gap: '0.85rem', alignContent: 'start' }}>
                {card.icon}
                <strong style={{ display: 'block', fontSize: '1rem' }}>{card.label}</strong>
                <span style={{ color: card.label === t('about.meta.availability') ? 'var(--success)' : 'var(--text)', fontWeight: 700, fontSize: '1rem' }}>
                  {card.value}
                </span>
                <p style={{ margin: 0, color: 'var(--muted)', lineHeight: '1.65', fontSize: '.92rem' }}>{card.note}</p>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.article variants={item} className="card fancy" style={{ padding: '2.2rem', display: 'grid', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <FiCode aria-hidden="true" style={{ fontSize: '1.9rem', color: 'var(--primary)' }} />
            <div>
              <p style={{ margin: '0 0 0.3rem', textTransform: 'uppercase', letterSpacing: '.24em', fontSize: '.72rem', color: 'var(--muted)' }}>
                {lang === 'es' ? 'Forma de trabajo' : 'Operating style'}
              </p>
              <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{lang === 'es' ? 'Principios y alcance de ejecucion' : 'Principles and execution scope'}</h3>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {principles.map((principle) => (
              <span key={principle} className="badge" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                {principle}
              </span>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.1rem' }}>
            {highlights.map((highlight) => (
              <article
                key={highlight.title}
                style={{
                  padding: '1.2rem',
                  borderRadius: '16px',
                  border: '1px solid color-mix(in oklab, var(--text) 8%, transparent)',
                  background: 'color-mix(in oklab, var(--panel) 72%, transparent)',
                }}
              >
                <strong style={{ display: 'block', marginBottom: '0.7rem' }}>{highlight.title}</strong>
                <p style={{ margin: 0, color: 'var(--muted)', lineHeight: '1.65' }}>{highlight.body}</p>
              </article>
            ))}
          </div>
        </motion.article>
      </motion.div>
    </Section>
  )
}
