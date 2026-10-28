import avatar from '../assets/avatar.webp'
import { ArrowRightIcon, DownloadSimpleIcon } from '../components/icons'
import { homeCopy } from '../content/home'
import type { Lang } from '../lib/lang'
import { site } from '../lib/site'

export function Hero({ lang }: { lang: Lang }) {
  const copy = homeCopy[lang].hero

  return (
    <section id="hero" aria-labelledby="hero-title" className="pt-24 pb-20 md:pb-24">
      <div className="wrap mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,680px)_1fr] lg:gap-12">
        <div className="order-2 lg:order-1">
          <h1
            id="hero-title"
            className="hero-rise max-w-[680px] bg-linear-to-r from-hero-from to-hero-to bg-clip-text text-transparent"
          >
            <span className="block text-5xl font-semibold tracking-tight md:text-6xl">{copy.name}</span>{' '}
            <span className="mt-4 block text-2xl font-medium md:text-3xl">
              {copy.role}
              <br />
              {copy.statement}
            </span>
          </h1>
          <p className="hero-rise mt-6 max-w-[680px] text-lg text-ink-muted" data-delay="1">
            {copy.sub}
          </p>
          <div className="hero-rise mt-8 flex flex-wrap items-center gap-4" data-delay="2">
            <a className="control control-lg control-primary" href={site.cv[lang]} download>
              <DownloadSimpleIcon size={20} aria-hidden="true" />
              {copy.downloadCv}
            </a>
            <a className="control control-lg control-text" href={`mailto:${site.email}`}>
              {copy.emailMe}
              <ArrowRightIcon size={20} aria-hidden="true" />
            </a>
          </div>
          <p className="hero-rise mt-6 text-sm text-ink-muted" data-delay="3">
            {copy.proof}
          </p>
        </div>

        <div className="order-1 lg:order-2 lg:justify-self-end">
          <img
            src={avatar}
            width={576}
            height={720}
            alt={copy.photoAlt}
            decoding="async"
            // React 18 only knows the lowercase attribute; this is the hero LCP candidate, so never lazy.
            {...{ fetchpriority: 'high' }}
            className="hero-rise size-24 rounded-full border border-line object-cover object-top lg:h-80 lg:w-64 lg:rounded-3xl"
          />
        </div>
      </div>
    </section>
  )
}
