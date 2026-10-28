import { ArrowRightIcon } from '../components/icons'
import { Section } from '../components/Section'
import { experience } from '../content/experience'
import { ui } from '../content/ui'
import type { Lang } from '../lib/lang'
import { pathOf } from '../lib/routes'

export function Experience({ lang }: { lang: Lang }) {
  const copy = ui[lang]

  return (
    <Section id="experience" title={copy.sections.experience.title} lead={copy.sections.experience.lead}>
      <ol role="list" className="timeline">
        {experience.map((entry) => {
          const text = entry.copy[lang]
          return (
            <li key={entry.id} className="timeline-item" data-current={entry.current ? '' : undefined}>
              <div data-reveal className="grid gap-x-8 gap-y-2 md:grid-cols-[12rem_1fr]">
                <div>
                  <p className="text-sm font-medium tabular-nums">{text.period}</p>
                  <p className="text-sm text-ink-muted">{text.location}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{text.role}</h3>
                  <p className="text-base text-ink-muted">{text.organization}</p>
                  <ul className="mt-4 list-disc space-y-2 pl-6 text-base marker:text-ink-muted">
                    {text.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  {entry.caseSlug ? (
                    <a
                      href={pathOf({ page: 'case', lang, slug: entry.caseSlug })}
                      className="control control-ghost mt-4 -ml-3"
                    >
                      {copy.cases.viewCase}
                      <ArrowRightIcon size={20} aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
