import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Section } from '../components/Section'
import { ProjectCard } from '../components/ProjectCard'
import { ProjectModal } from '../components/ProjectModal'
import { getProjects, type ProjectCategory, type ResolvedProject } from '../data/projects'
import { useLanguage } from '../components/LanguageProvider'

export function Projects() {
  const { t, lang } = useLanguage()
  const data = useMemo(() => getProjects(lang), [lang])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ProjectCategory | 'all'>('all')
  const [open, setOpen] = useState<ResolvedProject | null>(null)

  const categories = useMemo(() => ['all', ...Array.from(new Set(data.map(d => d.category)))] as const, [data])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return data.filter(p => {
      const byQuery = q ? (p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) : true
      const byCat = category === 'all' ? true : p.category === category
      return byQuery && byCat
    })
  }, [query, category, data])

  const container = { show: { transition: { staggerChildren: 0.08 } } }
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

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

      {/* Projects Grid - Professional Masonry */}
      {filtered.length > 0 ? (
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="projects-grid-professional"
        >
          {filtered.map((p) => (
            <motion.div key={p.slug} variants={item}>
              <ProjectCard project={p} onOpen={setOpen} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="card fancy" style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--muted)' }}>
          <p style={{ fontSize: '1.1rem', margin: 0 }}>
            No se encontraron proyectos que coincidan con tu búsqueda.
          </p>
        </div>
      )}

      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </Section>
  )
}
