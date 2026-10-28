import { ArrowRightIcon, DownloadSimpleIcon, EnvelopeSimpleIcon, GithubLogoIcon, LinkedinLogoIcon } from '../components/icons'
import { Section } from '../components/Section'
import { homeCopy } from '../content/home'
import { ui } from '../content/ui'
import type { Lang } from '../lib/lang'
import { site } from '../lib/site'

export function Contact({ lang }: { lang: Lang }) {
  const copy = homeCopy[lang]

  return (
    <Section id="contact" title={ui[lang].sections.contact.title}>
      <div data-reveal className="card p-8 md:p-12">
        <p className="max-w-[680px] text-2xl font-semibold md:text-3xl">{copy.contact.text}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a className="control control-lg control-primary" href={site.cv[lang]} download>
            <DownloadSimpleIcon size={20} aria-hidden="true" />
            {copy.hero.downloadCv}
          </a>
          <a className="control control-lg control-text" href={`mailto:${site.email}`}>
            {copy.hero.emailMe}
            <ArrowRightIcon size={20} aria-hidden="true" />
          </a>
        </div>
        <ul role="list" className="mt-12 flex flex-wrap gap-4">
          <li>
            <a className="control control-secondary" href={`mailto:${site.email}`}>
              <EnvelopeSimpleIcon size={20} aria-hidden="true" />
              {site.email}
            </a>
          </li>
          <li>
            <a className="control control-secondary" href={site.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedinLogoIcon size={20} aria-hidden="true" />
              LinkedIn
            </a>
          </li>
          <li>
            <a className="control control-secondary" href={site.github} target="_blank" rel="noopener noreferrer">
              <GithubLogoIcon size={20} aria-hidden="true" />
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </Section>
  )
}
