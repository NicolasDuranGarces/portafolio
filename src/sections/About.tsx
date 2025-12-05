import { motion } from 'framer-motion'
import { FiMapPin, FiClock, FiZap, FiCoffee, FiCode, FiCpu } from 'react-icons/fi'
import { useLanguage } from '../components/LanguageProvider'

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }
const stagger = { show: { transition: { staggerChildren: 0.08 } } }

// Estrellas flotantes
const Star = ({ delay, duration, top, left }: { delay: number; duration: number; top: string; left: string }) => (
  <motion.div
    className="about-star"
    style={{ top, left }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0.8, 1, 0],
      scale: [0, 1, 0.9, 1, 0],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      repeatDelay: 1,
    }}
  >
    ⭐
  </motion.div>
)

export function About() {
  const { t } = useLanguage()
  const story = t('about.story').split('|').map((item) => item.trim()).filter(Boolean)
  const principles = t('about.principles').split('|').map((item) => item.trim()).filter(Boolean)
  const meta = [
    { icon: FiMapPin, label: t('about.meta.location'), value: t('about.meta.locationValue') },
    { icon: FiClock, label: t('about.meta.experience'), value: t('about.meta.experienceValue') },
    { icon: FiZap, label: t('about.meta.availability'), value: t('about.meta.availabilityValue') },
  ]

  return (
    <section id="about" className="section container about-full">
      {/* Estrellas flotantes decorativas */}
      <div className="about-stars-container">
        <Star delay={0} duration={3} top="10%" left="15%" />
        <Star delay={0.5} duration={3.5} top="20%" left="85%" />
        <Star delay={1} duration={2.8} top="70%" left="10%" />
        <Star delay={1.5} duration={3.2} top="80%" left="90%" />
        <Star delay={0.8} duration={3} top="40%" left="5%" />
        <Star delay={1.2} duration={3.3} top="60%" left="95%" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        variants={stagger}
        className="about-wide-layout"
      >
        {/* Header */}
        <motion.div variants={fade} className="about-wide-header">
          <h2 className="about-wide-title">{t('about.title')}</h2>
          <p className="about-wide-subtitle">{t('about.lead')}</p>
        </motion.div>

        {/* Grid layout: 2 columnas en desktop */}
        <div className="about-wide-grid">
          {/* Columna izquierda: Personal */}
          <motion.div variants={fade} className="about-wide-column">
            <article className="card about-card-main">
              <div className="about-card-icon">
                <FiCoffee />
              </div>
              <h3>{t('about.tagline')}</h3>
              <div className="about-story-text">
                {story.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* Personal facts */}
              <div className="about-personal-facts">
                <div className="about-fact">
                  <FiCoffee className="about-fact-icon" />
                  <div>
                    <strong>Amante del café</strong>
                    <p>El mejor código se escribe con una taza de café al lado ☕</p>
                  </div>
                </div>
                <div className="about-fact">
                  <FiCpu className="about-fact-icon" />
                  <div>
                    <strong>Entusiasta de IA</strong>
                    <p>Explorando LLMs, RAG, y el futuro de la automatización inteligente 🤖</p>
                  </div>
                </div>
              </div>
            </article>
          </motion.div>

          {/* Columna derecha: Meta info */}
          <motion.div variants={fade} className="about-wide-column">
            <article className="card about-card-meta">
              <div className="about-card-icon">
                <FiCode />
              </div>
              <h3>Información Profesional</h3>

              <div className="about-meta-grid">
                {meta.map((item) => (
                  <div key={item.label} className="about-meta-card">
                    <item.icon />
                    <div>
                      <span className="about-meta-label">{item.label}</span>
                      <p className="about-meta-value">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="about-divider" />

              <div className="about-principles-section">
                <p className="about-principles-title">Principios de trabajo</p>
                <div className="about-principles-grid">
                  {principles.map((principle) => (
                    <span key={principle} className="about-principle-tag">
                      {principle}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </motion.div>
        </div>

        {/* Sección técnica full width */}
        <motion.div variants={fade} className="about-tech-section">
          <article className="card about-card-tech">
            <div className="about-tech-header">
              <div className="about-card-icon">
                <FiCpu />
              </div>
              <div>
                <h3>Stack Técnico & Especialización</h3>
                <p className="about-tech-lead">
                  Backend Python (FastAPI, Django), APIs escalables, arquitectura limpia,
                  y experiencia con IA/ML para automatización y optimización de sistemas.
                </p>
              </div>
            </div>

            <div className="about-tech-grid">
              <div className="about-tech-category">
                <h4>🐍 Backend & APIs</h4>
                <div className="about-tech-tags">
                  <span>Python</span>
                  <span>FastAPI</span>
                  <span>Django</span>
                  <span>Node.js</span>
                  <span>Express</span>
                  <span>REST</span>
                  <span>GraphQL</span>
                </div>
              </div>

              <div className="about-tech-category">
                <h4>🤖 IA & Automatización</h4>
                <div className="about-tech-tags">
                  <span>LLMs</span>
                  <span>RAG</span>
                  <span>OpenAI API</span>
                  <span>Langchain</span>
                  <span>Prompt Engineering</span>
                </div>
              </div>

              <div className="about-tech-category">
                <h4>☁️ Cloud & DevOps</h4>
                <div className="about-tech-tags">
                  <span>AWS Lambda</span>
                  <span>Docker</span>
                  <span>GitHub Actions</span>
                  <span>Serverless</span>
                  <span>Nginx</span>
                </div>
              </div>

              <div className="about-tech-category">
                <h4>💾 Bases de Datos</h4>
                <div className="about-tech-tags">
                  <span>PostgreSQL</span>
                  <span>MySQL</span>
                  <span>MongoDB</span>
                  <span>Redis</span>
                  <span>DynamoDB</span>
                </div>
              </div>
            </div>
          </article>
        </motion.div>
      </motion.div>
    </section>
  )
}
