import { ArrowLeftIcon } from '../components/icons'
import { ui } from '../content/ui'
import type { Lang } from '../lib/lang'
import { homePath } from '../lib/routes'
import { site } from '../lib/site'

export function PrivacyPage({ lang }: { lang: Lang }) {
  const copy = ui[lang].privacy

  return (
    <article className="pt-24 pb-20 md:pb-24">
      <div className="wrap mt-8">
        <div className="max-w-2xl">
          <h1 className="heading-rise text-4xl font-bold tracking-tighter md:text-5xl">{copy.title}</h1>
          <p className="heading-rise mt-6 text-lg text-ink-muted" data-delay="1">
            {copy.lead}
          </p>

          {copy.sections.map((section) => (
            <section key={section.title} data-reveal className="mt-12 border-t border-line pt-4">
              <h2 className="text-2xl font-bold tracking-tight">{section.title}</h2>
              <p className="mt-4 text-lg">{section.body}</p>
            </section>
          ))}

          <section data-reveal className="mt-12 border-t border-line pt-4">
            <h2 className="text-2xl font-bold tracking-tight">{copy.contact.title}</h2>
            <p className="mt-4 text-lg">
              {copy.contact.body}{' '}
              <a href={`mailto:${site.email}`} className="prose-link">
                {site.email}
              </a>
              .
            </p>
          </section>

          <a href={homePath(lang)} className="control control-secondary mt-12">
            <ArrowLeftIcon size={20} aria-hidden="true" />
            {copy.back}
          </a>
        </div>
      </div>
    </article>
  )
}
