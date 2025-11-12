import { useMemo, useState } from 'react'
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

  return (
    <Section id="projects" title={t('projects.title')} lead={t('projects.lead')}>
      <div className="projects-toolbar card" style={{ display: 'grid', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <label style={{ flex: '1 1 260px' }}>
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
            style={{ padding: '.65rem .8rem', background: 'transparent', cursor: 'pointer' }}
          >
            {categories.map(c => (
              <option key={c} value={c}>{t(`projects.categories.${c}`)}</option>
            ))}
          </select>
          <span className="badge" aria-live="polite">{filtered.length}</span>
        </div>
      </div>

      <div className="projects-grid">
        {filtered.map((p) => (
          <ProjectCard key={p.slug} project={p} onOpen={setOpen} />
        ))}
      </div>

      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </Section>
  )
}
