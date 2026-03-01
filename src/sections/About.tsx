import { motion } from 'framer-motion'
import { FiMapPin, FiClock, FiZap, FiCoffee, FiCode, FiTrendingUp } from 'react-icons/fi'
import { useLanguage } from '../components/LanguageProvider'
import { Section } from '../components/Section'

const container = { show: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

export function About() {
  const { t, lang } = useLanguage()
  const story = t('about.story').split('|').map((item) => item.trim()).filter(Boolean)
  const principles = t('about.principles').split('|').map((item) => item.trim()).filter(Boolean)
  const focus = t('about.focus').split('|').map((item) => item.trim()).filter(Boolean)
  const highlights = lang === 'es'
    ? [
        {
          title: 'Backend con foco de negocio',
          body: 'Trabajo como backend developer y software engineer priorizando APIs claras, tiempos de respuesta sanos y decisiones que sostengan producto y operacion.',
        },
        {
          title: 'Armenia, Quindio con alcance remoto',
          body: 'Estoy basado en Armenia, Quindio, y colaboro de forma remota con equipos que necesitan seniority backend en Colombia y fuera de ella.',
        },
        {
          title: 'Entrega completa cuando hace falta',
          body: 'Puedo moverme entre Python, FastAPI, Node.js, Docker, AWS y algo de React cuando un feature necesita una mirada end-to-end.',
        },
      ]
    : [
        {
          title: 'Backend tied to business impact',
          body: 'I work as a backend developer and software engineer with a strong focus on clear APIs, healthy response times, and decisions that support product and operations.',
        },
        {
          title: 'Armenia, Quindio with remote reach',
          body: 'I am based in Armenia, Quindio, and collaborate remotely with teams that need senior backend execution in Colombia and internationally.',
        },
        {
          title: 'Full delivery when needed',
          body: 'I move comfortably across Python, FastAPI, Node.js, Docker, AWS, and selected React work when a feature needs end-to-end ownership.',
        },
      ]

  return (
    <Section id="about" title={t('about.title')} lead={t('about.lead')}>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-50px' }}
        style={{ display: 'grid', gap: '2rem' }}
      >
        <motion.article variants={item} className="card fancy" style={{ padding: '2.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <FiCoffee style={{ fontSize: '2rem', color: 'var(--primary)' }} />
              <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>{t('about.tagline')}</h2>
            </div>
            <div style={{ color: 'var(--muted)', lineHeight: '1.7', fontSize: '1rem' }}>
              {story.map((paragraph, i) => (
                <p key={i} style={{ marginBottom: '1rem' }}>{paragraph}</p>
              ))}
              <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'color-mix(in oklab, var(--primary) 5%, transparent)', borderRadius: '12px', border: '1px solid color-mix(in oklab, var(--primary) 15%, transparent)' }}>
                <h4 style={{ margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FiTrendingUp style={{ color: 'var(--primary)' }} />
                  {lang === 'es' ? 'Donde aporto mas valor' : 'Where I add the most value'}
                </h4>
                <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                  {focus.map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.article>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <motion.article variants={item} className="card fancy" style={{ padding: '2rem' }}>
            <FiMapPin style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1rem' }} />
            <strong style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{t('about.meta.location')}</strong>
            <span style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>{t('about.meta.locationValue')}</span>
            <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
              {lang === 'es' ? 'Disponible para trabajo remoto en Colombia, Latinoamerica, USA y Europa.' : 'Available for remote work across Colombia, Latin America, the US, and Europe.'}
            </p>
          </motion.article>

          <motion.article variants={item} className="card fancy" style={{ padding: '2rem' }}>
            <FiClock style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1rem' }} />
            <strong style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{t('about.meta.experience')}</strong>
            <span style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>{t('about.meta.experienceValue')}</span>
            <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
              {lang === 'es' ? 'Experiencia en backend, arquitectura de datos y despliegue cloud-native.' : 'Experience across backend engineering, data architecture, and cloud-native delivery.'}
            </p>
          </motion.article>

          <motion.article variants={item} className="card fancy" style={{ padding: '2rem' }}>
            <FiZap style={{ fontSize: '2rem', color: 'var(--success)', marginBottom: '1rem' }} />
            <strong style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{t('about.meta.availability')}</strong>
            <span style={{ color: 'var(--success)', fontWeight: 600, fontSize: '0.95rem' }}>{t('about.meta.availabilityValue')}</span>
            <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
              {lang === 'es' ? 'Busco roles senior de backend, arquitectura de software y consultoria tecnica.' : 'Targeting senior backend, software architecture, and technical consulting work.'}
            </p>
          </motion.article>
        </div>

        <motion.article variants={item} className="card fancy" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <FiCode style={{ fontSize: '2rem', color: 'var(--primary)' }} />
            <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{lang === 'es' ? 'Principios de trabajo' : 'Working principles'}</h3>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            {principles.map((principle) => (
              <span key={principle} className="badge" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                {principle}
              </span>
            ))}
          </div>
          <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {highlights.map((highlight) => (
              <article key={highlight.title} style={{ padding: '1.25rem', borderRadius: '16px', border: '1px solid color-mix(in oklab, var(--text) 8%, transparent)', background: 'color-mix(in oklab, var(--panel) 70%, transparent)' }}>
                <strong style={{ display: 'block', marginBottom: '0.75rem' }}>{highlight.title}</strong>
                <p style={{ margin: 0, color: 'var(--muted)', lineHeight: '1.6' }}>{highlight.body}</p>
              </article>
            ))}
          </div>
        </motion.article>
      </motion.div>
    </Section>
  )
}
