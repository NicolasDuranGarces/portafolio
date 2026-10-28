import { ArrowUpRightIcon, GithubLogoIcon } from '../components/icons'
import { Section } from '../components/Section'
import { openProjects } from '../content/projects'
import { ui } from '../content/ui'
import type { Lang } from '../lib/lang'

export function OpenProjects({ lang }: { lang: Lang }) {
  const copy = ui[lang]

  return (
    <Section id="projects" title={copy.sections.projects.title} lead={copy.sections.projects.lead}>
      <ul role="list" className="grid gap-6 md:grid-cols-2">
        {openProjects.map((project) => {
          const text = project.copy[lang]
          return (
            <li key={project.id} data-reveal>
              <article className="card flex h-full flex-col gap-4 p-8">
                <h3 className="text-xl font-semibold">{text.name}</h3>
                <p className="text-base text-ink-muted">{text.description}</p>
                <ul role="list" className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li key={tag} className="chip">
                      {tag}
                    </li>
                  ))}
                </ul>
                <ul role="list" className="mt-auto flex flex-wrap gap-2 pt-4">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="control control-secondary"
                      >
                        <GithubLogoIcon size={20} aria-hidden="true" />
                        {link.label ? link.label[lang] : copy.projects.viewOnGithub}
                        <ArrowUpRightIcon size={20} aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
