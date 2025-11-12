import { motion } from 'framer-motion'
import { useCallback } from 'react'
import type { ResolvedProject } from '../data/projects'
import { useLanguage } from './LanguageProvider'

type Props = {
  project: ResolvedProject
  onOpen: (p: ResolvedProject) => void
}

export function ProjectCard({ project, onOpen }: Props) {
  const { t } = useLanguage()
  const { title, description, tags } = project
  const handleOpen = useCallback(() => onOpen(project), [onOpen, project])
  return (
    <motion.article
      className="project-card card fancy interactive"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -3, scale: 1.01 }}
    >
      <div className="project-media" aria-hidden>
        <div className="project-thumb" />
      </div>
      <div className="project-body">
        <h3 style={{ marginTop: 0, marginBottom: '.25rem' }}>{title}</h3>
        <p style={{ color: 'var(--muted)', marginTop: 0 }}>{description}</p>
        <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginTop: '.75rem' }}>
          {tags.map(t => (
            <span key={t} className="badge">{t}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '.5rem', marginTop: '1rem' }}>
          <button className="btn" type="button" onClick={handleOpen}>{t('projects.details')}</button>
          {project.links?.map(l => (
            <a key={l.href} className="btn ghost" href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
          ))}
        </div>
      </div>
    </motion.article>
  )
}
