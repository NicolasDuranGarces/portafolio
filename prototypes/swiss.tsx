/* eslint-disable react-refresh/only-export-components -- entry file: components and mount() live together */
import './swiss.css'
import type { ReactNode } from 'react'
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
    <header className="sw-bar">
      <div className="sw-grid sw-bar-in">
        <a className="sw-brand" href="#top">
          {copy.hero.name}
        </a>
        <nav className="sw-nav" aria-label={text.nav.label}>
          <ul className="sw-nav-list" role="list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a className="sw-nav-link" href={item.href}>
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

function Hero() {
  return (
    <section className="sw-hero sw-grid" aria-labelledby="sw-hero-title">
      <p className="sw-hero-meta">{copy.hero.proof}</p>
      <h1 id="sw-hero-title" className="sw-hero-title">
        {copy.hero.role}
      </h1>
      <p className="sw-hero-statement">{copy.hero.statement}</p>
      <p className="sw-hero-sub">{copy.hero.sub}</p>
      <div className="sw-hero-actions">
        <a className="sw-btn" href={site.cv.es} download>
          {copy.hero.downloadCv}
        </a>
        <a className="sw-btn sw-btn-ghost" href={`mailto:${site.email}`}>
          {copy.hero.emailMe}
        </a>
      </div>
      <img className="sw-hero-photo" src={avatar} width={576} height={720} alt={copy.hero.photoAlt} />
    </section>
  )
}

type SectionProps = { id: string; num: string; title: string; lead?: string; children: ReactNode }

function Section({ id, num, title, lead, children }: SectionProps) {
  return (
    <section id={id} className="sw-sec sw-grid" aria-labelledby={`${id}-title`}>
      <hr className="sw-rule" />
      <p className="sw-num">{num}</p>
      <div className="sw-sec-head">
        <h2 id={`${id}-title`} className="sw-h2">
          {title}
        </h2>
        {lead ? <p className="sw-lead">{lead}</p> : null}
      </div>
      {children}
    </section>
  )
}

/** The one layout primitive: hairline, label zone (columns 1 to 4), content zone (columns 5 to 12). */
function Row({ label, children }: { label?: ReactNode; children: ReactNode }) {
  return (
    <div className="sw-row">
      <div className="sw-row-label">{label}</div>
      <div className="sw-row-body">{children}</div>
    </div>
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

function Trajectory() {
  return (
    <div className="sw-track">
      <div className="sw-rail" aria-hidden="true">
        <span className="sw-rail-fill" />
      </div>
      <ol className="sw-list" role="list">
        {yearGroups.map((group) => (
          <li key={group.entries[0].id} className="sw-group" data-reveal>
            <p className="sw-year">
              <span className="sw-year-num">{group.year}</span>
            </p>
            <ol className="sw-roles" role="list">
              {group.entries.map((entry) => {
                const c = entry.copy.es
                return (
                  <li key={entry.id} className="sw-item" data-reveal data-current={entry.current ? '' : undefined}>
                    <span className="sw-dot" aria-hidden="true" />
                    <div className="sw-body">
                      <p className="sw-period">{c.period}</p>
                      <h3 className="sw-h3">{c.role}</h3>
                      <p className="sw-org">
                        {c.organization} · {c.location}
                      </p>
                      <ul className="sw-bullets" role="list">
                        {c.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                      {entry.caseSlug ? (
                        <a className="sw-link" href={pathOf({ page: 'case', lang: 'es', slug: entry.caseSlug })}>
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
  )
}

function Cases() {
  return (
    <div className="sw-rows">
      {cases.map((c, i) => {
        const k = c.copy.es
        return (
          <Row
            key={c.slug}
            label={
              <>
                <p className="sw-index">{String(i + 1).padStart(2, '0')}</p>
                <p className="sw-small">{k.role}</p>
                <p className="sw-small">{k.period}</p>
              </>
            }
          >
            <h3 className="sw-h3 sw-h3-lg">
              <a className="sw-cover" href={pathOf({ page: 'case', lang: 'es', slug: c.slug })}>
                {k.title}
              </a>
            </h3>
            <p className="sw-text">{k.summary}</p>
            <p className="sw-small">{c.stack.join(', ')}</p>
            <p className="sw-more" aria-hidden="true">
              {text.cases.viewCase} <span aria-hidden="true">→</span>
            </p>
          </Row>
        )
      })}
    </div>
  )
}

function Stack() {
  return (
    <div className="sw-rows">
      {stackGroups.map((g) => (
        <Row key={g.id} label={<h3 className="sw-h3">{g.title.es}</h3>}>
          <ul className="sw-stack" role="list">
            {g.items.map((item) => (
              <li key={item.name.es}>
                <span className="sw-strong">{item.name.es}</span>
                {item.detail ? <span className="sw-small">{item.detail.es}</span> : null}
              </li>
            ))}
          </ul>
        </Row>
      ))}
    </div>
  )
}

function Projects() {
  return (
    <div className="sw-rows">
      {openProjects.map((p) => (
        <Row key={p.id} label={<h3 className="sw-h3">{p.copy.es.name}</h3>}>
          <p className="sw-text">{p.copy.es.description}</p>
          <p className="sw-small">{p.tags.join(', ')}</p>
          <p className="sw-links">
            {p.links.map((link) => (
              <a
                key={link.href}
                className="sw-link"
                href={link.href}
                rel="noopener noreferrer"
                aria-label={`${link.label?.es ?? text.projects.viewOnGithub}: ${p.copy.es.name}`}
              >
                {link.label?.es ?? text.projects.viewOnGithub} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </p>
        </Row>
      ))}
    </div>
  )
}

function About() {
  const a = copy.about
  return (
    <div className="sw-rows">
      <Row>
        {a.paragraphs.map((paragraph) => (
          <p key={paragraph} className="sw-text sw-text-lg">
            {paragraph}
          </p>
        ))}
      </Row>
      <Row label={<h3 className="sw-h3">{a.educationTitle}</h3>}>
        <ul className="sw-plain" role="list">
          {a.education.map((e) => (
            <li key={e.name}>
              <span className="sw-strong">{e.name}</span>
              <span className="sw-small">
                {e.place}, {e.period}
              </span>
            </li>
          ))}
        </ul>
      </Row>
      <Row label={<h3 className="sw-h3">{a.certificationsTitle}</h3>}>
        <ul className="sw-plain" role="list">
          {a.certifications.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Row>
      <Row label={<h3 className="sw-h3">{a.platziLabel}</h3>}>
        <p className="sw-text">{a.platzi.join(', ')}</p>
      </Row>
      <Row label={<h3 className="sw-h3">{a.languagesTitle}</h3>}>
        <ul className="sw-plain" role="list">
          {a.languages.map((l) => (
            <li key={l.name}>
              <span className="sw-strong">{l.name}</span>
              <span className="sw-small">{l.level}</span>
            </li>
          ))}
        </ul>
      </Row>
    </div>
  )
}

function Contact() {
  return (
    <div className="sw-rows">
      <Row>
        <p className="sw-contact-text">{copy.contact.text}</p>
        <p className="sw-contact-mail">
          <a className="sw-link" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </p>
        <p className="sw-links">
          <a className="sw-link" href={site.linkedin} rel="noopener noreferrer">
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
          <a className="sw-link" href={site.github} rel="noopener noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <a className="sw-link" href={site.cv.es} download>
            {copy.hero.downloadCv} <span aria-hidden="true">↓</span>
          </a>
        </p>
      </Row>
    </div>
  )
}

function Footer() {
  return (
    <footer className="sw-foot sw-grid">
      <hr className="sw-rule sw-rule-thin" />
      <p className="sw-small">
        {site.name}. {text.footer.rights}
      </p>
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
        <Section id="contacto" num="06" title={text.sections.contact.title}>
          <Contact />
        </Section>
      </main>
      <Footer />
    </>
  )
}

mount(<Page />)
