import { Section } from '../components/Section'
import { homeCopy } from '../content/home'
import { ui } from '../content/ui'
import type { Lang } from '../lib/lang'
import { site } from '../lib/site'

export function Contact({ lang }: { lang: Lang }) {
  const copy = homeCopy[lang]

  return (
    <Section id="contact" title={ui[lang].sections.contact.title}>
      <div data-reveal>
        <p className="max-w-xl text-2xl font-bold tracking-tight md:text-3xl">{copy.contact.text}</p>
        <p className="mt-6 text-lg">
          <a className="prose-link" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </p>
        <p className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
          <a className="prose-link" href={site.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
          <a className="prose-link" href={site.github} target="_blank" rel="noopener noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <a className="prose-link" href={site.cv[lang]} download>
            {copy.hero.downloadCv} <span aria-hidden="true">↓</span>
          </a>
        </p>
      </div>
    </Section>
  )
}
