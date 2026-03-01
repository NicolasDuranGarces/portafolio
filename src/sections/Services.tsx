import { motion } from 'framer-motion'
import { Section } from '../components/Section'
import { useLanguage } from '../components/LanguageProvider'
import { getServiceCards } from '../content/services'

const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

export function Services() {
  const { t, lang } = useLanguage()
  const cards = getServiceCards(lang)

  return (
    <Section id="services" title={t('services.title')} lead={t('services.lead')}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
        {cards.map((card) => (
          <motion.article
            key={card.title}
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="card fancy"
            style={{ padding: '2rem' }}
          >
            <h3 style={{ marginTop: 0 }}>{card.title}</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>{card.description}</p>
            <ul style={{ paddingLeft: '1.1rem', margin: '1rem 0 0', color: 'var(--muted)', lineHeight: 1.8 }}>
              {card.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
