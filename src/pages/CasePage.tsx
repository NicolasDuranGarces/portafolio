import type { ReactNode } from 'react'
import { ArrowLeftIcon, ArrowUpRightIcon } from '../components/icons'
import { getCase, type CaseSlug } from '../content/cases'
import { ui } from '../content/ui'
import type { Lang } from '../lib/lang'
import { homePath } from '../lib/routes'
import { site } from '../lib/site'

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section data-reveal className="mt-12">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4 space-y-4 text-lg">{children}</div>
    </section>
  )
}

export function CasePage({ lang, slug }: { lang: Lang; slug: CaseSlug }) {
  const entry = getCase(slug)
  const text = entry.copy[lang]
  const copy = ui[lang].cases
  const back = homePath(lang, 'cases')

  const facts = [
    { label: copy.labels.role, value: text.role },
    { label: copy.labels.period, value: text.period },
    { label: copy.labels.organization, value: text.organization },
  ]

  return (
    <article className="pt-24 pb-20 md:pb-24">
      <div className="wrap mt-8">
        <div className="max-w-[680px]">
          <a href={back} className="control control-ghost -ml-3">
            <ArrowLeftIcon size={20} aria-hidden="true" />
            {copy.back}
          </a>

          <header className="mt-8">
            <h1 className="hero-rise text-4xl font-semibold tracking-tight md:text-5xl">{text.title}</h1>
            <dl className="hero-rise mt-8 grid gap-4 sm:grid-cols-3" data-delay="1">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-sm text-ink-muted">{fact.label}</dt>
                  <dd className="text-base font-medium">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </header>

          <Block title={copy.sections.context}>
            {text.context.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Block>

          <Block title={copy.sections.problem}>
            {text.problem.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Block>

          <Block title={copy.sections.role}>
            {text.myRole.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Block>

          <Block title={copy.sections.decisions}>
            <ol role="list" className="space-y-8">
              {text.decisions.map((decision) => (
                <li key={decision.title}>
                  <h3 className="text-xl font-semibold">{decision.title}</h3>
                  <p className="mt-2 text-ink-muted">{decision.why}</p>
                </li>
              ))}
            </ol>
          </Block>

          <Block title={copy.sections.difficulty}>
            {text.difficulty.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Block>

          <Block title={copy.sections.result}>
            {text.result.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Block>

          <Block title={copy.sections.stack}>
            <ul role="list" className="flex flex-wrap gap-2">
              {entry.stack.map((tag) => (
                <li key={tag} className="chip">
                  {tag}
                </li>
              ))}
            </ul>
            {entry.link ? (
              <p>
                <a href={entry.link.href} target="_blank" rel="noopener noreferrer" className="control control-secondary">
                  {entry.link.label[lang]}
                  <ArrowUpRightIcon size={20} aria-hidden="true" />
                </a>
              </p>
            ) : null}
          </Block>

          {text.confidentiality ? (
            <p data-reveal className="mt-12 rounded-2xl border border-line bg-surface p-6 text-sm text-ink-muted">
              {text.confidentiality}
            </p>
          ) : null}

          <section data-reveal className="card mt-12 p-8">
            <h2 className="text-2xl font-semibold tracking-tight">{copy.ctaTitle}</h2>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a className="control control-lg control-primary" href={`mailto:${site.email}`}>
                {copy.ctaAction}
              </a>
              <a className="control control-lg control-secondary" href={back}>
                <ArrowLeftIcon size={20} aria-hidden="true" />
                {copy.back}
              </a>
            </div>
          </section>
        </div>
      </div>
    </article>
  )
}
