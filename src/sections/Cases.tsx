import { ArrowUpRightIcon } from '../components/icons'
import { Section } from '../components/Section'
import { cases } from '../content/cases'
import { ui } from '../content/ui'
import type { Lang } from '../lib/lang'
import { pathOf } from '../lib/routes'

const TAGS_ON_CARD = 4

export function Cases({ lang }: { lang: Lang }) {
  const copy = ui[lang].sections.cases

  return (
    <Section id="cases" title={copy.title} lead={copy.lead}>
      <ul role="list" className="grid gap-6 md:grid-cols-2">
        {cases.map((entry) => {
          const text = entry.copy[lang]
          return (
            <li key={entry.slug} data-reveal>
              <article className="card card-link flex h-full flex-col gap-4 p-8">
                <p className="pr-8 text-sm text-ink-muted">
                  {text.period} · {text.role}
                </p>
                <h3 className="text-2xl font-semibold">
                  <a href={pathOf({ page: 'case', lang, slug: entry.slug })}>{text.title}</a>
                </h3>
                <p className="text-base text-ink-muted">{text.summary}</p>
                <ul role="list" className="mt-auto flex flex-wrap gap-2 pt-4">
                  {entry.stack.slice(0, TAGS_ON_CARD).map((tag) => (
                    <li key={tag} className="chip">
                      {tag}
                    </li>
                  ))}
                </ul>
                <ArrowUpRightIcon size={24} aria-hidden="true" className="absolute top-8 right-8 text-ink-muted" />
              </article>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
