import { LanguageSwitch, ThemeToggle } from '../components/Controls'
import { TechIcon } from '../components/TechIcon'
import { homeSections } from '../content/sections'
import { homeCopy } from '../content/home'
import { coreTech } from '../content/stack'
import { ui } from '../content/ui'
import type { Lang } from '../lib/lang'
import { site } from '../lib/site'
import { companies, type Role } from '../lib/trajectory'

type Props = {
  lang: Lang
  /** Section being read, for the nav. */
  active: string
  /** Role being read and whether the trajectory is on screen. */
  current: Role
  live: boolean
}

/**
 * Identity and navigation. It never scrolls inside. On `tall` windows (see global.css) it is pinned as a column
 * as tall as the viewport; on shorter ones it is a normal block that the page scroll carries, so nothing is clipped
 * or out of reach. Only the decorative year in view is dropped when it is not pinned. Below `lg` it is a plain
 * header block and the top nav takes over.
 */
export function Side({ lang, active, current, live }: Props) {
  const copy = homeCopy[lang]
  const text = ui[lang]

  return (
    <header id="top" className="pt-24 pb-2 lg:col-span-4 lg:pt-8 lg:pb-4 lg:tall:sticky lg:tall:top-0 lg:tall:h-dvh">
      <div className="lg:flex lg:items-start lg:justify-between lg:gap-4">
        <h1 className="text-4xl leading-none font-bold tracking-tighter">{copy.hero.name}</h1>
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <LanguageSwitch route={{ page: 'home', lang }} />
          <ThemeToggle lang={lang} />
        </div>
      </div>
      <p className="mt-3 text-xl leading-tight font-bold">{copy.hero.role}</p>
      <p className="mt-1 max-w-xs">{copy.hero.statement}</p>

      <dl className="mt-4 space-y-2">
        <div>
          <dt className="text-sm text-ink-muted">{text.side.workedWith}</dt>
          <dd className="max-w-sm text-sm">{companies(lang).join(', ')}</dd>
        </div>
        <div>
          <dt className="text-sm text-ink-muted">{text.side.coreTech}</dt>
          <dd>
            <ul role="list" className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {coreTech.map((tech) => (
                <li key={tech.name.es} className="inline-flex items-center gap-2">
                  {tech.icon ? <TechIcon path={tech.icon} className="size-4 shrink-0" /> : null}
                  <span>{tech.name[lang]}</span>
                </li>
              ))}
            </ul>
            <div className="mt-1">
              <a className="prose-link text-sm" href="#stack">
                {text.side.allStack} <span aria-hidden="true">↓</span>
              </a>
            </div>
          </dd>
        </div>
      </dl>

      <p className="mt-2 text-sm text-ink-muted">{copy.hero.proof}</p>

      <ul role="list" className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm">
        <li>
          <a className="prose-link" href={site.cv[lang]} download>
            {copy.hero.downloadCv} <span aria-hidden="true">↓</span>
          </a>
        </li>
        <li>
          <a className="prose-link" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </li>
        <li>
          <a className="prose-link" href={site.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </li>
        <li>
          <a className="prose-link" href={site.github} target="_blank" rel="noopener noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </li>
      </ul>

      <div className="mt-4 hidden gap-6 lg:flex">
        <nav aria-label={text.nav.label} className="shrink-0">
          <ul role="list">
            {homeSections.map((id) => (
              <li key={id}>
                <a className="side-link" href={`#${id}`} aria-current={active === id ? 'location' : undefined}>
                  {text.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="now hidden min-w-0 flex-1 lg:tall:block" aria-hidden="true" data-live={live ? '' : undefined}>
          <p className="text-sm text-ink-muted">{text.sections.experience.title}</p>
          <div key={current.id} className="now-swap">
            <p className="text-6xl leading-none font-bold tracking-tighter text-accent tabular-nums">{current.year}</p>
            <p className="mt-2 text-lg leading-tight font-bold">{current.org}</p>
            <p className="text-sm text-ink-muted">{current.period}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
