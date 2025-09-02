import { useMemo, useState } from 'react'
import { Section } from '../components/Section'
import { ProjectCard } from '../components/ProjectCard'
import { ProjectModal } from '../components/ProjectModal'
import { TagFilter } from '../components/TagFilter'
import { projects as data, allTags, type Project } from '../data/projects'
import { useLanguage } from '../components/LanguageProvider'

export function Projects() {
  const { t } = useLanguage()
  const [query, setQuery] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [category, setCategory] = useState<string>('Todos')
  const [open, setOpen] = useState<Project | null>(null)

  const categories = useMemo(() => ['Todos', ...Array.from(new Set(data.map(d => d.category)))], [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return data.filter(p => {
      const byQuery = q ? (p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) : true
      const byTags = tags.length ? tags.every(t => p.tags.includes(t)) : true
      const byCat = category === 'Todos' ? true : p.category === category
      return byQuery && byTags && byCat
    })
  }, [query, tags, category])

  function toggleTag(t: string) {
    setTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
  }

  return (
    <Section id="projects" title={t('projects.title')} lead={t('projects.lead')}>
      <div className="projects-toolbar card" style={{ display: 'grid', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <label style={{ flex: '1 1 260px' }}>
            <input
              placeholder="Buscar proyectos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Buscar proyectos"
              style={{ width: '100%' }}
            />
          </label>
          <select
            aria-label="Filtrar por categoría"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="badge"
            style={{ padding: '.65rem .8rem', background: 'transparent', cursor: 'pointer' }}
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <span className="badge" aria-live="polite">{filtered.length}</span>
      </div>
      <TagFilter tags={allTags as unknown as string[]} active={tags} onToggle={toggleTag} />
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
