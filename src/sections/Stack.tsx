import { Row, Section } from '../components/Section'
import { TechIcon } from '../components/TechIcon'
import { techGroups } from '../content/stack'
import { ui } from '../content/ui'
import type { Lang } from '../lib/lang'

export function Stack({ lang }: { lang: Lang }) {
  const copy = ui[lang].sections.stack

  return (
    <Section id="stack" title={copy.title} lead={copy.lead}>
      {techGroups.map((group) => (
        <Row key={group.id} label={<h3 className="font-bold">{group.title[lang]}</h3>}>
          <ul role="list" className="tech-grid">
            {group.items.map((tech) => (
              <li key={tech.name.es} className="tech-item">
                <span className="block size-6">
                  {tech.icon ? <TechIcon path={tech.icon} className="size-6" /> : null}
                </span>
                <span className="font-bold">{tech.name[lang]}</span>
                {tech.detail ? <span className="tech-detail text-sm text-ink-muted">{tech.detail[lang]}</span> : null}
              </li>
            ))}
          </ul>
          {group.practices ? <p className="pt-2 text-sm text-ink-muted">{group.practices[lang].join(' · ')}</p> : null}
        </Row>
      ))}
    </Section>
  )
}
