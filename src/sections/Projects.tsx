import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Section } from '../components/Section'
import { ProjectModal } from '../components/ProjectModal'
import { getProjects, type ProjectCategory, type ResolvedProject } from '../data/projects'
import { useLanguage } from '../components/LanguageProvider'
import { FiExternalLink, FiGithub, FiX } from 'react-icons/fi'

export function Projects() {
  const { t, lang } = useLanguage()
  const data = useMemo(() => getProjects(lang), [lang])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ProjectCategory | 'all'>('all')
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null)
  const [modalProject, setModalProject] = useState<ResolvedProject | null>(null)

  const categories = useMemo(() => ['all', ...Array.from(new Set(data.map(d => d.category)))] as const, [data])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return data.filter(p => {
      const byQuery = q ? (p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) : true
      const byCat = category === 'all' ? true : p.category === category
      return byQuery && byCat
    })
  }, [query, category, data])

  const handleCardClick = (slug: string) => {
    setExpandedSlug(expandedSlug === slug ? null : slug)
  }

  return (
    <Section id="projects" title={t('projects.title')} lead={t('projects.lead')}>
      {/* Toolbar */}
      <div className="card fancy" style={{ padding: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <label style={{ flex: '1 1 280px' }}>
            <input
              placeholder={t('projects.searchPlaceholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label={t('projects.searchAria')}
              style={{ width: '100%' }}
            />
          </label>
          <select
            aria-label={t('projects.filterAria')}
            value={category}
            onChange={(e) => setCategory(e.target.value as ProjectCategory | 'all')}
            className="badge"
            style={{ padding: '.7rem 1rem', background: 'transparent', cursor: 'pointer', fontSize: '0.9rem' }}
          >
            {categories.map(c => (
              <option key={c} value={c}>{t(`projects.categories.${c}`)}</option>
            ))}
          </select>
          <span className="badge" aria-live="polite" style={{ padding: '0.7rem 1rem' }}>
            {filtered.length} {filtered.length === 1 ? 'proyecto' : 'proyectos'}
          </span>
        </div>
      </div>

      {/* Horizontal Timeline */}
      {filtered.length > 0 ? (
        <div className="projects-timeline-container">
          <div className="projects-timeline-scroll">
            {filtered.map((project, idx) => {
              const isExpanded = expandedSlug === project.slug
              
              return (
                <motion.div
                  key={project.slug}
                  className={`project-timeline-card ${isExpanded ? 'expanded' : ''}`}
                  onClick={() => handleCardClick(project.slug)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  layout
                >
                  {/* Compact View */}
                  <div className="project-timeline-compact">
                    <div className="project-timeline-number">{String(idx + 1).padStart(2, '0')}</div>
                    <div className="project-timeline-header">
                      <h4 className="project-timeline-title">{project.title}</h4>
                      <span className="badge" style={{ fontSize: '0.75rem' }}>
                        {t(`projects.categories.${project.category}`)}
                      </span>
                    </div>
                    <p className="project-timeline-description">{project.description}</p>
                    <div className="project-timeline-tags">
                      {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="badge" style={{ fontSize: '0.7rem', padding: '0.25rem 0.6rem' }}>
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="badge" style={{ opacity: 0.6, fontSize: '0.7rem' }}>
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Expanded View */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        className="project-timeline-expanded"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className="project-timeline-close"
                          onClick={() => setExpandedSlug(null)}
                          aria-label="Cerrar"
                        >
                          <FiX />
                        </button>

                        {/* Highlights */}
                        {project.highlights && project.highlights.length > 0 && (
                          <div style={{ marginBottom: '1.5rem' }}>
                            <strong style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.85rem', color: 'var(--primary)' }}>
                              🎯 Aspectos Destacados
                            </strong>
                            <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.9rem', lineHeight: '1.7' }}>
                              {project.highlights.map((h, i) => (
                                <li key={i}>{h}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* All Tags */}
                        <div style={{ marginBottom: '1.5rem' }}>
                          <strong style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.85rem' }}>
                            Stack Completo
                          </strong>
                          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                            {project.tags.map(tag => (
                              <span key={tag} className="badge" style={{ fontSize: '0.75rem' }}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                          {project.links?.map((link, idx) => (
                            <a
                              key={idx}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn"
                              style={{ fontSize: '0.85rem', padding: '0.5rem 1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                            >
                              {link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live') ? (
                                <FiExternalLink />
                              ) : (
                                <FiGithub />
                              )}
                              {link.label}
                            </a>
                          ))}
                          <button
                            className="btn ghost"
                            style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
                            onClick={() => setModalProject(project)}
                          >
                            Ver Modal Completo
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="card fancy" style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--muted)' }}>
          <p style={{ fontSize: '1.1rem', margin: 0 }}>
            No se encontraron proyectos que coincidan con tu búsqueda.
          </p>
        </div>
      )}

      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
    </Section>
  )
}
