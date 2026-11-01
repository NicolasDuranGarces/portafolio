/* eslint-disable react-refresh/only-export-components -- entry file: components and mount() live together */
import './swiss-poster.css'
import { useLayoutEffect, useRef, type ReactNode } from 'react'
import avatar from '../src/assets/avatar.webp'
import { cases } from '../src/content/cases'
import { experience } from '../src/content/experience'
import { homeCopy } from '../src/content/home'
import { openProjects } from '../src/content/projects'
import { stackGroups } from '../src/content/stack'
import { ui } from '../src/content/ui'
import { useReveal } from '../src/hooks/useReveal'
import { pathOf } from '../src/lib/routes'
import { site } from '../src/lib/site'
import { mount } from './shared/mount'

const copy = homeCopy.es
const text = ui.es

const navItems = [
  { href: '#trayectoria', label: 'Trayectoria' },
  { href: '#casos', label: text.nav.cases },
  { href: '#stack', label: 'Stack' },
  { href: '#proyectos', label: text.nav.projects },
  { href: '#sobre-mi', label: text.nav.about },
  { href: '#contacto', label: text.nav.contact },
]

function Header() {
  return (
    <header className="sp-bar sp-band">
      <div className="sp-grid sp-bar-in">
        <a className="sp-brand" href="#top">
          {copy.hero.name}
        </a>
        <nav className="sp-nav" aria-label={text.nav.label}>
          <ul className="sp-nav-list" role="list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a className="sp-nav-link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

/** Poster hero: flat yellow field, the name set as large as the grid allows, small text in columns below. */
function Hero() {
  return (
    <section className="sp-hero sp-band" aria-labelledby="sp-hero-title">
      <div className="sp-grid sp-hero-in">
        <h1 id="sp-hero-title" className="sp-name">
          {copy.hero.name.split(' ').map((word) => (
            <span key={word} className="sp-name-line">
              {word}{' '}
            </span>
          ))}
        </h1>
        <div className="sp-hero-side">
          <div className="sp-hero-pitch">
            <p className="sp-hero-role">{copy.hero.role}</p>
            <p className="sp-hero-statement">{copy.hero.statement}</p>
          </div>
          <div className="sp-hero-more">
            <p className="sp-small-ink">{copy.hero.sub}</p>
            <div className="sp-actions">
              <a className="sp-btn" href={site.cv.es} download>
                {copy.hero.downloadCv}
              </a>
              <a className="sp-btn sp-btn-ghost" href={`mailto:${site.email}`}>
                {copy.hero.emailMe}
              </a>
            </div>
          </div>
          <p className="sp-hero-meta">{copy.hero.proof}</p>
        </div>
      </div>
    </section>
  )
}

type SectionProps = { id: string; num: string; title: string; lead?: string; band?: boolean; children: ReactNode }

/** Section head: heavy rule, big number in columns 1 to 4, title and lead in columns 5 to 12. */
function Section({ id, num, title, lead, band, children }: SectionProps) {
  return (
    <section id={id} className={band ? 'sp-sec sp-band' : 'sp-sec'} aria-labelledby={`${id}-title`}>
      <div className="sp-grid sp-sec-head">
        <hr className="sp-rule" />
        <p className="sp-num" aria-hidden="true">
          <span className="sp-num-in">{num}</span>
        </p>
        <div className="sp-sec-title" data-reveal>
          <h2 id={`${id}-title`} className="sp-h2">
            {title}
          </h2>
          {lead ? <p className="sp-lead">{lead}</p> : null}
        </div>
      </div>
      {children}
    </section>
  )
}

type Experience = (typeof experience)[number]

/** Consecutive roles that start in the same year share one big year. */
const yearGroups = experience.reduce<{ year: string; entries: Experience[] }[]>((groups, entry) => {
  const period = entry.copy.es.period
  const year = /\d{4}/.exec(period)?.[0] ?? period
  const last = groups[groups.length - 1]
  if (last?.year === year) last.entries.push(entry)
  else groups.push({ year, entries: [entry] })
  return groups
}, [])

/**
 * Desktop with scroll timelines: the pin is sticky and the track slides sideways while the page scrolls.
 * Everywhere else the same markup is a plain vertical list (see the media query in the CSS).
 * The only JS is writing the panel count so the CSS can size the scroll distance.
 */
function Trajectory() {
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    ref.current?.style.setProperty('--sp-panels', String(experience.length))
  }, [])

  return (
    <div className="sp-traj" ref={ref}>
      <div className="sp-pin">
        <div className="sp-track">
          <ol className="sp-groups" role="list">
            {yearGroups.map((group) => (
              <li key={group.entries[0].id} className="sp-group" data-reveal>
                <p className="sp-year">{group.year}</p>
                <ol className="sp-roles" role="list">
                  {group.entries.map((entry) => {
                    const c = entry.copy.es
                    return (
                      <li key={entry.id} className="sp-role" data-current={entry.current ? '' : undefined}>
                        <span className="sp-tick" aria-hidden="true" />
                        <div className="sp-role-in">
                          <p className="sp-period">{c.period}</p>
                          <h3 className="sp-h3">{c.role}</h3>
                          <p className="sp-org">
                            {c.organization} · {c.location}
                          </p>
                          <ul className="sp-bullets" role="list">
                            {c.bullets.map((bullet) => (
                              <li key={bullet}>{bullet}</li>
                            ))}
                          </ul>
                          {entry.caseSlug ? (
                            <a className="sp-link" href={pathOf({ page: 'case', lang: 'es', slug: entry.caseSlug })}>
                              {text.cases.viewCase} <span aria-hidden="true">→</span>
                            </a>
                          ) : null}
                        </div>
                      </li>
                    )
                  })}
                </ol>
              </li>
            ))}
          </ol>
        </div>
        <div className="sp-progress" aria-hidden="true">
          <span className="sp-progress-fill" />
        </div>
      </div>
    </div>
  )
}

function Cases() {
  return (
    <ol className="sp-grid sp-mods" role="list">
      {cases.map((c, i) => {
        const k = c.copy.es
        return (
          <li key={c.slug} className="sp-mod sp-mod-6" data-reveal>
            <p className="sp-index" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </p>
            <p className="sp-small">
              {k.role} · {k.period}
            </p>
            <h3 className="sp-h3 sp-h3-lg">
              <a className="sp-cover" href={pathOf({ page: 'case', lang: 'es', slug: c.slug })}>
                {k.title}
              </a>
            </h3>
            <p className="sp-text">{k.summary}</p>
            <p className="sp-small">{c.stack.join(', ')}</p>
            <p className="sp-more" aria-hidden="true">
              {text.cases.viewCase} <span aria-hidden="true">→</span>
            </p>
          </li>
        )
      })}
    </ol>
  )
}

function Stack() {
  return (
    <ul className="sp-grid sp-mods" role="list">
      {stackGroups.map((g) => (
        <li key={g.id} className="sp-mod sp-mod-4" data-reveal>
          <h3 className="sp-h3">{g.title.es}</h3>
          <ul className="sp-plain" role="list">
            {g.items.map((item) => (
              <li key={item.name.es}>
                <span className="sp-strong">{item.name.es}</span>
                {item.detail ? <span className="sp-small">{item.detail.es}</span> : null}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

function Projects() {
  return (
    <ul className="sp-grid sp-mods" role="list">
      {openProjects.map((p) => (
        <li key={p.id} className="sp-mod sp-mod-6" data-reveal>
          <h3 className="sp-h3 sp-h3-lg">{p.copy.es.name}</h3>
          <p className="sp-text">{p.copy.es.description}</p>
          <p className="sp-small">{p.tags.join(', ')}</p>
          <p className="sp-links">
            {p.links.map((link) => (
              <a
                key={link.href}
                className="sp-link"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.label?.es ?? text.projects.viewOnGithub}: ${p.copy.es.name}`}
              >
                {link.label?.es ?? text.projects.viewOnGithub} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </p>
        </li>
      ))}
    </ul>
  )
}

function About() {
  const a = copy.about
  return (
    <div className="sp-grid sp-mods">
      <div className="sp-about-lede" data-reveal>
        {a.paragraphs.map((paragraph) => (
          <p key={paragraph} className="sp-lede">
            {paragraph}
          </p>
        ))}
      </div>
      <img className="sp-photo" src={avatar} width={576} height={720} alt={copy.hero.photoAlt} loading="lazy" />
      <section className="sp-mod sp-mod-4" aria-labelledby="sp-edu" data-reveal>
        <h3 id="sp-edu" className="sp-h3">
          {a.educationTitle}
        </h3>
        <ul className="sp-plain" role="list">
          {a.education.map((e) => (
            <li key={e.name}>
              <span className="sp-strong">{e.name}</span>
              <span className="sp-small">
                {e.place}, {e.period}
              </span>
            </li>
          ))}
        </ul>
      </section>
      <section className="sp-mod sp-mod-4" aria-labelledby="sp-cert" data-reveal>
        <h3 id="sp-cert" className="sp-h3">
          {a.certificationsTitle}
        </h3>
        <ul className="sp-plain" role="list">
          {a.certifications.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="sp-mod sp-mod-4" aria-labelledby="sp-lang" data-reveal>
        <h3 id="sp-lang" className="sp-h3">
          {a.languagesTitle}
        </h3>
        <ul className="sp-plain" role="list">
          {a.languages.map((l) => (
            <li key={l.name}>
              <span className="sp-strong">{l.name}</span>
              <span className="sp-small">{l.level}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="sp-mod sp-mod-12" aria-labelledby="sp-platzi" data-reveal>
        <h3 id="sp-platzi" className="sp-h3">
          {a.platziLabel}
        </h3>
        <p className="sp-text">{a.platzi.join(', ')}</p>
      </section>
    </div>
  )
}

function Contact() {
  return (
    <div className="sp-grid sp-contact">
      <p className="sp-contact-text" data-reveal>
        {copy.contact.text}
      </p>
      <p className="sp-contact-mail">
        <a className="sp-mail" href={`mailto:${site.email}`}>
          {site.email}
        </a>
      </p>
      <p className="sp-links">
        <a className="sp-link" href={site.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn <span aria-hidden="true">↗</span>
        </a>
        <a className="sp-link" href={site.github} target="_blank" rel="noopener noreferrer">
          GitHub <span aria-hidden="true">↗</span>
        </a>
        <a className="sp-link" href={site.cv.es} download>
          {copy.hero.downloadCv} <span aria-hidden="true">↓</span>
        </a>
      </p>
    </div>
  )
}

function Footer() {
  return (
    <footer className="sp-foot sp-band">
      <div className="sp-grid">
        <p className="sp-small-ink">
          {site.name}. {text.footer.rights}
        </p>
      </div>
    </footer>
  )
}

function Page() {
  useReveal()
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Section id="trayectoria" num="01" title="Trayectoria" lead={text.sections.experience.lead}>
          <Trajectory />
        </Section>
        <Section id="casos" num="02" title={text.sections.cases.title} lead={text.sections.cases.lead}>
          <Cases />
        </Section>
        <Section id="stack" num="03" title="Stack" lead={text.sections.stack.lead}>
          <Stack />
        </Section>
        <Section id="proyectos" num="04" title={text.sections.projects.title} lead={text.sections.projects.lead}>
          <Projects />
        </Section>
        <Section id="sobre-mi" num="05" title={text.sections.about.title}>
          <About />
        </Section>
        <Section id="contacto" num="06" title={text.sections.contact.title} band>
          <Contact />
        </Section>
      </main>
      <Footer />
    </>
  )
}

mount(<Page />)
