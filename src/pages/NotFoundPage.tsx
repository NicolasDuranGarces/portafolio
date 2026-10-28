import { notFoundCopy } from '../content/ui'
import { langs } from '../lib/lang'
import { homePath } from '../lib/routes'

/** One static 404 for both languages: nginx serves the same file for any missing URL. */
export function NotFoundPage() {
  return (
    <main id="main" tabIndex={-1} className="wrap flex min-h-svh flex-col justify-center py-24">
      <div className="max-w-[680px]">
        <h1 className="hero-rise text-4xl font-semibold tracking-tight md:text-5xl">
          <span className="block">{notFoundCopy.es.heading}</span>{' '}
          <span lang="en" className="block text-ink-muted">
            {notFoundCopy.en.heading}
          </span>
        </h1>
        <div className="hero-rise mt-12 grid gap-8 sm:grid-cols-2" data-delay="1">
          {langs.map((lang) => (
            <section key={lang} lang={lang}>
              <p className="text-lg text-ink-muted">{notFoundCopy[lang].body}</p>
              <a href={homePath(lang)} className="control control-lg control-secondary mt-6">
                {notFoundCopy[lang].action}
              </a>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
