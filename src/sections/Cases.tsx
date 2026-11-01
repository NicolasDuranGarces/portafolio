import { Section } from '../components/Section'
import { cases } from '../content/cases'
import { featuredSlug } from '../content/sections'
import { ui } from '../content/ui'
import type { Lang } from '../lib/lang'
import { pathOf } from '../lib/routes'
import { firstSentence } from '../lib/text'

/** The cases that are not featured, as compact rows. The whole row is one link to the case page. */
export function Cases({ lang }: { lang: Lang }) {
  const copy = ui[lang]
  const others = cases.filter((entry) => entry.slug !== featuredSlug)

  return (
    <Section id="cases" title={copy.sections.cases.title}>
      <ol role="list">
        {others.map((entry, index) => {
          const text = entry.copy[lang]
          return (
            <li
              key={entry.slug}
              className="row-link grid grid-cols-[2.5rem_minmax(0,1fr)] border-t border-line py-6 last:border-b"
            >
              <p className="pt-0.5 text-sm text-ink-muted tabular-nums" aria-hidden="true">{String(index + 1).padStart(2, '0')}</p>
              <div className="space-y-2">
                <h3 className="text-xl font-bold tracking-tight">
                  <a href={pathOf({ page: 'case', lang, slug: entry.slug })}>{text.title}</a>
                </h3>
                <p className="text-sm text-ink-muted">
                  {text.role}, {text.period}
                </p>
                <p className="max-w-prose">{text.summary}</p>
                <p className="max-w-prose">
                  <span className="font-bold">{copy.cases.sections.result}.</span> {firstSentence(text.result[0])}
                </p>
                <p className="row-more font-bold" aria-hidden="true">
                  {copy.cases.viewCase} →
                </p>
              </div>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
