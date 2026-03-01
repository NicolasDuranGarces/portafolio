import { motion } from 'framer-motion'
import { Section } from '../components/Section'
import { useLanguage } from '../components/LanguageProvider'
import { FiCpu, FiCode, FiCloud, FiShield, FiZap, FiDatabase, FiTerminal } from 'react-icons/fi'

const container = { show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

export function Skills() {
  const { t, lang } = useLanguage()

  const categories = [
    {
      icon: FiCpu,
      title: lang === 'es' ? 'Backend y desarrollo de APIs' : 'Backend and API engineering',
      skills: ['Python', 'FastAPI', 'Django', 'Node.js', 'TypeScript', 'Java', 'Spring Boot', 'REST APIs', 'GraphQL'],
      color: 'var(--primary)',
      description: lang === 'es'
        ? 'Construccion de servicios backend, contratos API y capas de dominio para producto y plataformas internas.'
        : 'Production backend services, API contracts, and domain layers for product and internal platforms.',
    },
    {
      icon: FiDatabase,
      title: lang === 'es' ? 'Datos y persistencia' : 'Data and persistence',
      skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'DynamoDB', 'Redis', 'Query optimization', 'Data modeling'],
      color: 'var(--accent)',
      description: lang === 'es'
        ? 'Modelado de datos, consultas criticas y decisiones de almacenamiento para sistemas que crecen.'
        : 'Data modeling, critical queries, and storage decisions for systems that need to scale cleanly.',
    },
    {
      icon: FiCloud,
      title: lang === 'es' ? 'AWS y plataforma cloud' : 'AWS and cloud platform work',
      skills: ['AWS Lambda', 'EC2', 'ECR', 'SQS', 'SNS', 'API Gateway', 'CloudWatch', 'Route 53'],
      color: '#FF9900',
      description: lang === 'es'
        ? 'Infraestructura y servicios cloud para despliegues backend, procesos asincronos y observabilidad.'
        : 'Cloud infrastructure for backend delivery, asynchronous workflows, and observable systems.',
    },
    {
      icon: FiTerminal,
      title: lang === 'es' ? 'DevOps e infraestructura' : 'DevOps and infrastructure',
      skills: ['Docker', 'Nginx', 'GitHub Actions', 'GitLab CI', 'Terraform', 'Linux', 'Containers', 'CI/CD'],
      color: 'var(--primary)',
      description: lang === 'es'
        ? 'Automatizacion de builds, despliegues y operacion para que los cambios lleguen con control.'
        : 'Build, deployment, and operations automation so changes reach production with control.',
    },
    {
      icon: FiZap,
      title: lang === 'es' ? 'IA aplicada y automatizacion' : 'Applied AI and automation',
      skills: ['AI agents', 'MCP', 'RAG', 'OCR', 'LLM integrations', 'Prompt engineering'],
      color: 'var(--success)',
      description: lang === 'es'
        ? 'Integracion de LLMs y automatizaciones utiles cuando el problema realmente lo necesita.'
        : 'LLM integration and practical automation when it genuinely improves the product.',
    },
    {
      icon: FiCode,
      title: lang === 'es' ? 'Frontend pragmatico' : 'Pragmatic frontend',
      skills: ['React', 'Vite', 'TypeScript', 'CSS', 'Accessibility', 'UI states'],
      color: 'var(--accent)',
      description: lang === 'es'
        ? 'Front-end suficiente para cerrar features end-to-end sin perder foco en el backend.'
        : 'Enough front-end depth to ship end-to-end features without losing the backend focus.',
    },
    {
      icon: FiShield,
      title: lang === 'es' ? 'Calidad, seguridad y arquitectura' : 'Quality, security, and architecture',
      skills: ['Clean Architecture', 'DDD', 'Testing', 'Observability', 'Code review', 'Technical mentoring'],
      color: '#dc2626',
      description: lang === 'es'
        ? 'Practicas para mantener software mantenible, medible y confiable en produccion.'
        : 'Practices that keep software maintainable, measurable, and reliable in production.',
    },
  ]

  return (
    <Section id="skills" title={t('skills.title')} lead={t('skills.lead')}>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-50px' }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}
      >
        {categories.map((category) => (
          <motion.article key={category.title} variants={item} className="card fancy" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: `color-mix(in oklab, ${category.color} 10%, transparent)`,
                border: `1px solid color-mix(in oklab, ${category.color} 20%, transparent)`,
                display: 'grid',
                placeItems: 'center',
                color: category.color,
                fontSize: '1.5rem',
                flexShrink: 0
              }}>
                <category.icon />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.15rem', lineHeight: '1.3' }}>{category.title}</h3>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: '1.4' }}>
                  {category.description}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.25rem' }}>
              {category.skills.map(skill => (
                <span key={skill} className="badge" style={{ fontSize: '0.85rem', padding: '0.4rem 0.75rem' }}>
                  {skill}
                </span>
              ))}
            </div>
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid color-mix(in oklab, var(--text) 8%, transparent)', fontSize: '0.85rem', color: 'var(--muted)' }}>
              {category.skills.length} {lang === 'es' ? 'capacidades clave' : 'core capabilities'}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  )
}
