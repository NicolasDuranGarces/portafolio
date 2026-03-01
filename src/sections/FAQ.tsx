import { motion } from 'framer-motion'
import { Section } from '../components/Section'
import { useLanguage } from '../components/LanguageProvider'
import { getFaqEntries } from '../content/faq'

const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

export function FAQ() {
  const { t, lang } = useLanguage()
  const entries = getFaqEntries(lang)

  return (
    <Section id="faq" title={t('faq.title')} lead={t('faq.lead')}>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {entries.map((entry) => (
          <motion.details
            key={entry.question}
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="card fancy"
            style={{ padding: '1.5rem 1.75rem' }}
          >
            <summary style={{ cursor: 'pointer', fontWeight: 700 }}>{entry.question}</summary>
            <p style={{ margin: '1rem 0 0', color: 'var(--muted)', lineHeight: 1.7 }}>{entry.answer}</p>
          </motion.details>
        ))}
      </div>
    </Section>
  )
}
