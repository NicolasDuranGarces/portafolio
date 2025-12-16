import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Section } from '../components/Section'
import { ProjectModal } from '../components/ProjectModal'
import { getProjects, type ProjectCategory, type ResolvedProject } from '../data/projects'
import { useLanguage } from '../components/LanguageProvider'
import { FiExternalLink, FiGithub, FiSearch } from 'react-icons/fi'

export function Projects() {
  const { t, lang } = useLanguage()
  const data = useMemo(() => getProjects(lang), [lang])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ProjectCategory | 'all'>('all')
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

  // First project is featured
  const featuredProject = filtered[0]
  const otherProjects = filtered.slice(1)

  return (
    <Section id="projects" title={t('projects.title')} lead={t('projects.lead')}>
      {/* Toolbar */}
      <div className="projects-toolbar-bento">
        <div className="projects-search-wrapper">
          <FiSearch className="projects-search-icon" />
          <input
            placeholder={t('projects.searchPlaceholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={t('projects.searchAria')}
            className="projects-search-input"
          />
        </div>
        <div className="projects-filters">
          {categories.map(c => (
            <button
              key={c}
              className={`projects-filter-btn ${category === c ? 'active' : ''}`}
              onClick={() => setCategory(c)}
            >
              {t(`projects.categories.${c}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Bento Grid */}
      {filtered.length > 0 ? (
        <div className="projects-bento-grid">
          {/* Featured Project - First and largest */}
          {featuredProject && (
            <motion.article
              className="project-bento-card featured"
              onClick={() => setModalProject(featuredProject)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
            >
              <div className="project-bento-glow" />
              <div className="project-bento-header">
                <span className="project-bento-featured-badge">⭐ {lang === 'es' ? 'Proyecto Destacado' : 'Featured Project'}</span>
                <span className="project-bento-category">{t(`projects.categories.${featuredProject.category}`)}</span>
              </div>
              <h3 className="project-bento-title">{featuredProject.title}</h3>
              <p className="project-bento-description">{featuredProject.description}</p>
              
              {/* Highlights for featured */}
              {featuredProject.highlights && featuredProject.highlights.length > 0 && (
                <ul className="project-bento-highlights">
                  {featuredProject.highlights.slice(0, 3).map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              )}
              
              <div className="project-bento-tags">
                {featuredProject.tags.slice(0, 5).map(tag => (
                  <span key={tag} className="project-bento-tag">{tag}</span>
                ))}
                {featuredProject.tags.length > 5 && (
                  <span className="project-bento-tag-more">+{featuredProject.tags.length - 5}</span>
                )}
              </div>
              
              <div className="project-bento-links">
                {featuredProject.links?.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-bento-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live') ? (
                      <FiExternalLink />
                    ) : (
                      <FiGithub />
                    )}
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.article>
          )}

          {/* Other Projects */}
          {otherProjects.map((project, idx) => (
            <motion.article
              key={project.slug}
              className="project-bento-card"
              onClick={() => setModalProject(project)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <div className="project-bento-glow" />
              <div className="project-bento-header">
                <span className="project-bento-number">{String(idx + 2).padStart(2, '0')}</span>
                <span className="project-bento-category">{t(`projects.categories.${project.category}`)}</span>
              </div>
              <h3 className="project-bento-title">{project.title}</h3>
              <p className="project-bento-description">{project.description}</p>
              <div className="project-bento-tags">
                {project.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="project-bento-tag">{tag}</span>
                ))}
                {project.tags.length > 3 && (
                  <span className="project-bento-tag-more">+{project.tags.length - 3}</span>
                )}
              </div>
              
              {/* Quick links on hover */}
              <div className="project-bento-quick-links">
                {project.links?.slice(0, 2).map((link, linkIdx) => (
                  <a
                    key={linkIdx}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={link.label}
                  >
                    {link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live') ? (
                      <FiExternalLink />
                    ) : (
                      <FiGithub />
                    )}
                  </a>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      ) : (
        <div className="card fancy" style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--muted)' }}>
          <p style={{ fontSize: '1.1rem', margin: 0 }}>
            {lang === 'es' 
              ? 'No se encontraron proyectos que coincidan con tu búsqueda.' 
              : 'No projects found matching your search.'}
          </p>
        </div>
      )}

      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
    </Section>
  )
}
