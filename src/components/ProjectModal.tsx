import { motion, AnimatePresence } from 'framer-motion'
import type { ResolvedProject } from '../data/projects'
import { useLanguage } from './LanguageProvider'

type Props = { project: ResolvedProject | null; onClose: () => void }

export function ProjectModal({ project, onClose }: Props) {
  const { t } = useLanguage()
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          aria-modal="true"
          role="dialog"
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal card"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
          >
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>{project.title}</h3>
              <button className="btn ghost" onClick={onClose} aria-label={t('projects.modal.closeAria')} title={t('projects.modal.closeAria')}>
                {t('projects.modal.close')}
              </button>
            </header>
            <p style={{ color: 'var(--muted)' }}>{project.description}</p>
            {project.highlights && project.highlights.length > 0 && (
              <ul style={{ marginTop: '.5rem' }}>
                {project.highlights.map(h => (
                  <li key={h} style={{ color: 'var(--muted)' }}>{h}</li>
                ))}
              </ul>
            )}
            <div style={{ display: 'flex', gap: '.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              {project.tags.map(t => (
                <span key={t} className="badge">{t}</span>
              ))}
            </div>
            {project.links && project.links.length > 0 && (
              <div style={{ display: 'flex', gap: '.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                {project.links.map(l => (
                  <a key={l.href} className="btn" href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
