import { Row, Section } from '../components/Section'
import { openProjects } from '../content/projects'
import { ui } from '../content/ui'
import type { Lang } from '../lib/lang'

export function OpenProjects({ lang }: { lang: Lang }) {
  const copy = ui[lang]

  return (
    <Section id="projects" title={copy.sections.projects.title} lead={copy.sections.projects.lead}>
      {openProjects.map((project) => {
        const text = project.copy[lang]
        return (
          <Row key={project.id} label={<h3 className="font-bold">{text.name}</h3>}>
            <p className="max-w-prose">{text.description}</p>
            <p className="text-sm text-ink-muted">{project.tags.join(', ')}</p>
            <p className="flex flex-wrap gap-x-6 gap-y-1">
              {project.links.map((link) => {
                const label = link.label?.[lang] ?? copy.projects.viewOnGithub
                return (
                  <a
                    key={link.href}
                    className="prose-link"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label}: ${text.name}`}
                  >
                    {label} <span aria-hidden="true">↗</span>
                  </a>
                )
              })}
            </p>
          </Row>
        )
      })}
    </Section>
  )
}
