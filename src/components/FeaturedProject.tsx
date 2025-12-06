import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import type { ResolvedProject } from '../data/projects'

type Props = {
  project: ResolvedProject
  onOpen: (p: ResolvedProject) => void
}

export function FeaturedProject({ project, onOpen }: Props) {
  const { title, description, tags, links, highlights } = project
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="card fancy"
      style={{ padding: '2.5rem', cursor: 'pointer' }}
      onClick={() => onOpen(project)}
    >
      <div style={{ display: 'grid', gap: '2rem' }}>
        {/* Header */}
        <div>
          <div style={{ display: 'inline-block', marginBottom: '1rem' }}>
            <span style={{ 
              background: 'color-mix(in oklab, var(--primary) 15%, transparent)',
              color: 'var(--primary)',
              padding: '0.5rem 1rem',
              borderRadius: '999px',
              fontSize: '0.85rem',
              fontWeight: 600,
              border: '1px solid color-mix(in oklab, var(--primary) 25%, transparent)'
            }}>
              ⭐ Proyecto Destacado
            </span>
          </div>
          <h3 style={{ 
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            fontWeight: 700,
            margin: '0 0 1rem',
            lineHeight: 1.2,
            background: 'linear-gradient(135deg, var(--text) 0%, color-mix(in oklab, var(--text) 60%, transparent) 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}>
            {title}
          </h3>
          <p style={{ 
            fontSize: '1.1rem',
            color: 'var(--muted)',
            lineHeight: '1.7',
            margin: 0 
          }}>
            {description}
          </p>
        </div>

        {/* Highlights */}
        {highlights && highlights.length > 0 && (
          <div style={{ 
            padding: '1.5rem',
            background: 'color-mix(in oklab, var(--primary) 5%, transparent)',
            borderRadius: '16px',
            border: '1px solid color-mix(in oklab, var(--primary) 15%, transparent)'
          }}>
            <strong style={{ display: 'block', marginBottom: '1rem', fontSize: '0.95rem', color: 'var(--primary)' }}>
              🎯 Aspectos Destacados
            </strong>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--muted)', lineHeight: '1.8' }}>
              {highlights.map((h, i) => (
                <li key={i} style={{ fontSize: '0.95rem' }}>{h}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Bottom section: Tech + Links */}
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {/* Tech Stack */}
          <div>
            <strong style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', fontWeight: 600 }}>
              Stack Tecnológico
            </strong>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {tags.map(tag => (
                <span key={tag} className="badge" style={{ fontSize: '0.85rem', padding: '0.5rem 0.9rem' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {links && links.length > 0 && (
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {links.map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  {link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live') ? (
                    <FiExternalLink />
                  ) : (
                    <FiGithub />
                  )}
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                className="btn ghost"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation()
                  onOpen(project)
                }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                Ver Detalles Completos
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  )
}
