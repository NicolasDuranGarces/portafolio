import { Section } from '../components/Section'
import { SkillPill } from '../components/SkillPill'
import { useLanguage } from '../components/LanguageProvider'
import { SkillsMarquee } from '../components/SkillsMarquee'

const backend = ['Python', 'FastAPI', 'Django', 'SQLModel', 'PostgreSQL', 'Redis', 'Celery']
const frontend = ['React', 'TypeScript', 'Vite', 'CSS Modules']
const devops = ['Docker', 'Docker Compose', 'Nginx', 'GitHub Actions']
const others = ['Clean Architecture', 'TDD', 'REST', 'OpenAPI', 'CI/CD']

export function Skills() {
  const { t } = useLanguage()
  return (
    <Section id="skills" title={t('skills.title')} lead={t('skills.lead')}>
      <SkillsMarquee items={[...backend, ...frontend, ...devops, ...others]} />
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        <SkillGroup title={t('skills.backend')} items={backend} />
        <SkillGroup title={t('skills.frontend')} items={frontend} />
        <SkillGroup title={t('skills.devops')} items={devops} />
        <SkillGroup title={t('skills.others')} items={others} />
      </div>
    </Section>
  )
}

function SkillGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
        {items.map((s) => (
          <SkillPill key={s} name={s} />
        ))}
      </div>
    </div>
  )
}
