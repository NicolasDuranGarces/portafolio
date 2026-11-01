import { Section } from '../components/Section'
import { ui } from '../content/ui'
import type { Lang } from '../lib/lang'
import { pathOf } from '../lib/routes'
import { startYear, yearGroups } from '../lib/trajectory'

/** Roles grouped by start year along a rail that fills with the scroll. `currentId` marks the role being read. */
export function Experience({ lang, currentId }: { lang: Lang; currentId: string }) {
  const copy = ui[lang]

  return (
    <Section id="experience" title={copy.sections.experience.title} lead={copy.sections.experience.lead}>
      <div className="track" data-track>
        <div className="track-line" aria-hidden="true">
          <span className="track-fill" />
        </div>
        <ol role="list">
          {yearGroups(lang).map((group) => (
            <li key={group.entries[0].id} className="track-group">
              <p className="track-year">{group.year}</p>
              <ol role="list">
                {group.entries.map((entry) => {
                  const text = entry.copy[lang]
                  return (
                    <li
                      key={entry.id}
                      className="track-entry"
                      data-entry={entry.id}
                      data-year={startYear(entry, lang)}
                      data-org={text.organization}
                      data-period={text.period}
                      data-active={currentId === entry.id ? '' : undefined}
                    >
                      <span className="track-mark" aria-hidden="true" />
                      <div data-reveal className="space-y-1">
                        <p className="text-sm text-ink-muted tabular-nums">{text.period}</p>
                        <h3 className="font-bold">{text.role}</h3>
                        <p className="text-ink-muted">
                          {text.organization}, {text.location}
                        </p>
                        <ul role="list" className="space-y-2 pt-2">
                          {text.bullets.map((bullet) => (
                            <li key={bullet} className="relative max-w-prose pl-4 before:absolute before:top-3 before:left-0 before:h-px before:w-2 before:bg-ink-muted">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                        {entry.caseSlug ? (
                          <p className="pt-2">
                            <a className="prose-link" href={pathOf({ page: 'case', lang, slug: entry.caseSlug })}>
                              {copy.cases.viewCase} <span aria-hidden="true">→</span>
                            </a>
                          </p>
                        ) : null}
                      </div>
                    </li>
                  )
                })}
              </ol>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
