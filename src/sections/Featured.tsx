import { Section } from '../components/Section'
import { getCase } from '../content/cases'
import { featuredSlug } from '../content/sections'
import { ui } from '../content/ui'
import type { Lang } from '../lib/lang'
import { pathOf } from '../lib/routes'
import { firstSentence } from '../lib/text'

/** The featured case, built only from its entry in `cases`: one sentence per fact. */
export function Featured({ lang }: { lang: Lang }) {
  const entry = getCase(featuredSlug)
  const text = entry.copy[lang]
  const copy = ui[lang]
  const decision = text.decisions[0]
  const href = pathOf({ page: 'case', lang, slug: entry.slug })

  const facts = [
    { label: copy.cases.sections.problem, value: firstSentence(text.problem[0]) },
    { label: copy.cases.sections.role, value: `${text.role}, ${text.organization}` },
    {
      label: copy.featured.decision,
      value: (
        <>
          <span className="font-bold">{decision.title}.</span> {firstSentence(decision.why)}
        </>
      ),
    },
    { label: copy.cases.sections.result, value: firstSentence(text.result[0]) },
    { label: copy.cases.sections.stack, value: entry.stack.join(', ') },
  ]

  return (
    <Section id="featured" title={copy.sections.featured.title}>
      <article>
        <h3 className="max-w-2xl text-4xl font-bold tracking-tighter text-balance md:text-5xl">
          <a href={href} className="hover:underline hover:decoration-2 hover:underline-offset-8">
            {text.title}
          </a>
        </h3>
        <p className="mt-4 max-w-xl text-lg">{text.summary}</p>
        <dl className="mt-8">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="grid gap-1 border-t border-line py-3 last:border-b sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-4 lg:gap-6"
            >
              <dt className="text-sm text-ink-muted">{fact.label}</dt>
              <dd className="max-w-prose">{fact.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 flex flex-wrap gap-x-6 gap-y-1">
          <a className="prose-link" href={href}>
            {copy.cases.viewCase} <span aria-hidden="true">→</span>
          </a>
          {entry.link ? (
            <a className="prose-link" href={entry.link.href} target="_blank" rel="noopener noreferrer">
              {entry.link.label[lang]} <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </p>
      </article>
    </Section>
  )
}
