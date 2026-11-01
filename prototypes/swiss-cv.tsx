/* eslint-disable react-refresh/only-export-components -- entry file: components and mount() live together */
import './swiss-cv.css'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import avatar from '../src/assets/avatar.webp'
import { cases } from '../src/content/cases'
import { experience } from '../src/content/experience'
import { homeCopy } from '../src/content/home'
import { openProjects } from '../src/content/projects'
import { coreTech, techGroups, TechIcon } from './tech'
import { ui } from '../src/content/ui'
import { useReveal } from '../src/hooks/useReveal'
import { pathOf } from '../src/lib/routes'
import { site } from '../src/lib/site'
import { mount } from './shared/mount'

const copy = homeCopy.es
const text = ui.es

const navItems = [
  { id: 'sobre-mi', label: text.nav.about },
  { id: 'formacion', label: 'Formación' },
  { id: 'destacado', label: 'Destacado' },
  { id: 'casos', label: text.nav.cases },
  { id: 'trayectoria', label: 'Trayectoria' },
  { id: 'stack', label: 'Stack' },
  { id: 'proyectos', label: text.nav.projects },
  { id: 'contacto', label: text.nav.contact },
]

const featuredSlug = 'bheex'

/** First sentence of a paragraph, so each fact fits on a line or two. */
const firstSentence = (paragraph: string) => {
  const end = paragraph.indexOf('. ')
  return end < 0 ? paragraph : paragraph.slice(0, end + 1)
}

/** Unique organizations in order; notes in parentheses dropped, anonymous ones skipped. */
const companies = [
  ...new Set(
    experience
      .map((entry) => entry.copy.es.organization.replace(/\s*\(.*\)/, '').trim())
      .filter((name) => name !== 'Independiente' && !name.includes('Empresa de software')),
  ),
]

type Experience = (typeof experience)[number]

const startYear = (entry: Experience) => /\d{4}/.exec(entry.copy.es.period)?.[0] ?? entry.copy.es.period

/** Consecutive roles that start in the same year share one year label. */
const yearGroups = experience.reduce<{ year: string; entries: Experience[] }[]>((groups, entry) => {
  const year = startYear(entry)
  const last = groups[groups.length - 1]
  if (last?.year === year) last.entries.push(entry)
  else groups.push({ year, entries: [entry] })
  return groups
}, [])

/**
 * Observes every element matching `selector` through a thin horizontal band of the viewport and reports
 * enter and leave. IntersectionObserver only: no scroll listener.
 */
function useSpy(selector: string, rootMargin: string, onChange: (el: HTMLElement, hit: boolean) => void) {
  const latest = useRef(onChange)
  useEffect(() => {
    latest.current = onChange
  })
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (records) => {
        for (const record of records) latest.current(record.target as HTMLElement, record.isIntersecting)
      },
      { rootMargin },
    )
    document.querySelectorAll<HTMLElement>(selector).forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [selector, rootMargin])
}

type Current = { id: string; year: string; org: string; period: string }

const toCurrent = (entry: Experience): Current => ({
  id: entry.id,
  year: startYear(entry),
  org: entry.copy.es.organization,
  period: entry.copy.es.period,
})

const firstRole = toCurrent(experience[0])
const lastRole = toCurrent(experience[experience.length - 1])

const BAND = '-40% 0px -55% 0px'

/** Which role sits under the reading band, and whether the band is inside the trajectory at all. */
function useCurrentRole() {
  const [current, setCurrent] = useState<Current>(firstRole)
  const [live, setLive] = useState(false)
  useSpy('[data-sc-entry]', BAND, (el, hit) => {
    if (!hit) return
    const { scEntry, scYear, scOrg, scPeriod } = el.dataset
    if (scEntry && scYear && scOrg && scPeriod) setCurrent({ id: scEntry, year: scYear, org: scOrg, period: scPeriod })
  })
  // After a jump (anchor, reload) no entry crossed the band: settle on the first or last role by position.
  useSpy('.sc-track', BAND, (el, hit) => {
    setLive(hit)
    if (!hit) setCurrent(el.getBoundingClientRect().top < 0 ? lastRole : firstRole)
  })
  return { current, live }
}

function useActiveSection() {
  const [active, setActive] = useState(navItems[0].id)
  useSpy('[data-sc-section]', '-15% 0px -75% 0px', (el, hit) => {
    if (hit) setActive(el.id)
  })
  return active
}

type SideProps = { current: Current; live: boolean; active: string }

function Side({ current, live, active }: SideProps) {
  return (
    <header className="sc-side" id="top">
      <div className="sc-side-in">
        <div className="sc-id">
          <h1 className="sc-name">{copy.hero.name}</h1>
          <p className="sc-role">{copy.hero.role}</p>
          <p className="sc-statement">{copy.hero.statement}</p>
          <dl className="sc-facts-side">
            <div>
              <dt>Ha trabajado con</dt>
              <dd>{companies.join(', ')}</dd>
            </div>
            <div>
              <dt>Tecnologías principales</dt>
              <dd>
                <ul className="sc-core" role="list">
                  {coreTech.map((t) => (
                    <li key={t.name} title={t.name}>
                      {t.icon ? <TechIcon icon={t.icon} className="sc-core-icon" /> : null}
                      <span>{t.name}</span>
                    </li>
                  ))}
                </ul>
                <a className="sc-link sc-core-more" href="#stack">
                  Ver todo el stack <span aria-hidden="true">↓</span>
                </a>
              </dd>
            </div>
          </dl>
          <p className="sc-small">{copy.hero.proof}</p>
        </div>
        <ul className="sc-contact" role="list">
          <li>
            <a className="sc-link" href={site.cv.es} download>
              {copy.hero.downloadCv} <span aria-hidden="true">↓</span>
            </a>
          </li>
          <li>
            <a className="sc-link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </li>
          <li>
            <a className="sc-link" href={site.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </li>
          <li>
            <a className="sc-link" href={site.github} target="_blank" rel="noopener noreferrer">
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
        <nav className="sc-nav" aria-label={text.nav.label}>
          <ul className="sc-nav-list" role="list">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  className="sc-nav-link"
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'true' : undefined}
                >
                  <span className="sc-nav-mark" aria-hidden="true" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="sc-now" aria-hidden="true" data-live={live ? '' : undefined}>
          <p className="sc-now-label">Trayectoria</p>
          <div className="sc-now-swap" key={current.id}>
            <p className="sc-now-year">{current.year}</p>
            <p className="sc-now-org">{current.org}</p>
            <p className="sc-small">{current.period}</p>
          </div>
        </div>
      </div>
    </header>
  )
}

type SectionProps = { id: string; title: string; lead?: string; children: ReactNode }

function Section({ id, title, lead, children }: SectionProps) {
  return (
    <section id={id} className="sc-sec" data-sc-section aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="sc-h2">
        {title}
      </h2>
      {lead ? <p className="sc-lead">{lead}</p> : null}
      {children}
    </section>
  )
}

/** Label and body row, shared by stack, projects and about. */
function Row({ label, children }: { label?: ReactNode; children: ReactNode }) {
  return (
    <div className="sc-row">
      <div className="sc-row-label">{label}</div>
      <div className="sc-row-body">{children}</div>
    </div>
  )
}

function Trajectory({ currentId }: { currentId: string }) {
  return (
    <div className="sc-track">
      <div className="sc-line" aria-hidden="true">
        <span className="sc-line-fill" />
      </div>
      <ol className="sc-groups" role="list">
        {yearGroups.map((group) => (
          <li key={group.entries[0].id} className="sc-group">
            <p className="sc-year">{group.year}</p>
            <ol className="sc-entries" role="list">
              {group.entries.map((entry) => {
                const c = entry.copy.es
                return (
                  <li
                    key={entry.id}
                    className="sc-entry"
                    data-reveal
                    data-sc-entry={entry.id}
                    data-sc-year={startYear(entry)}
                    data-sc-org={c.organization}
                    data-sc-period={c.period}
                    data-active={currentId === entry.id ? '' : undefined}
                  >
                    <span className="sc-mark" aria-hidden="true" />
                    <div className="sc-body">
                      <p className="sc-period">{c.period}</p>
                      <h3 className="sc-h3">{c.role}</h3>
                      <p className="sc-org">
                        {c.organization}, {c.location}
                      </p>
                      <ul className="sc-bullets" role="list">
                        {c.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                      {entry.caseSlug ? (
                        <a className="sc-link" href={pathOf({ page: 'case', lang: 'es', slug: entry.caseSlug })}>
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

/** The featured case, built only from the Bheex entry of `cases`. */
function Featured() {
  const c = cases.find((item) => item.slug === featuredSlug)
  if (!c) return null
  const k = c.copy.es
  const decision = k.decisions[0]
  return (
    <article className="sc-feat">
      <h3 className="sc-feat-title">
        <a className="sc-title-link" href={pathOf({ page: 'case', lang: 'es', slug: c.slug })}>
          {k.title}
        </a>
      </h3>
      <p className="sc-feat-summary">{k.summary}</p>
      <dl className="sc-facts">
        <div>
          <dt>Problema</dt>
          <dd>{firstSentence(k.problem[0])}</dd>
        </div>
        <div>
          <dt>Mi rol</dt>
          <dd>
            {k.role}, {k.organization}
          </dd>
        </div>
        <div>
          <dt>Decisión clave</dt>
          <dd>
            <span className="sc-strong">{decision.title}.</span> {firstSentence(decision.why)}
          </dd>
        </div>
        <div>
          <dt>Resultado</dt>
          <dd>{firstSentence(k.result[0])}</dd>
        </div>
        <div>
          <dt>Stack</dt>
          <dd>{c.stack.join(', ')}</dd>
        </div>
      </dl>
      <p className="sc-links sc-feat-links">
        <a className="sc-link" href={pathOf({ page: 'case', lang: 'es', slug: c.slug })}>
          {text.cases.viewCase} <span aria-hidden="true">→</span>
        </a>
        {c.link ? (
          <a className="sc-link" href={c.link.href} target="_blank" rel="noopener noreferrer">
            {c.link.label.es} <span aria-hidden="true">↗</span>
          </a>
        ) : null}
      </p>
    </article>
  )
}

/** The other cases as compact rows. */
function Cases() {
  const others = cases.filter((item) => item.slug !== featuredSlug)
  return (
    <ol className="sc-cases" role="list">
      {others.map((c, i) => {
        const k = c.copy.es
        return (
          <li key={c.slug} className="sc-case">
            <p className="sc-index">{String(i + 1).padStart(2, '0')}</p>
            <div className="sc-case-body">
              <h3 className="sc-h3 sc-h3-lg">
                <a className="sc-cover" href={pathOf({ page: 'case', lang: 'es', slug: c.slug })}>
                  {k.title}
                </a>
              </h3>
              <p className="sc-small">
                {k.role}, {k.period}
              </p>
              <p className="sc-text">{k.summary}</p>
              <p className="sc-text">
                <span className="sc-strong">Resultado.</span> {firstSentence(k.result[0])}
              </p>
              <p className="sc-more" aria-hidden="true">
                {text.cases.viewCase} <span aria-hidden="true">→</span>
              </p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

function Stack() {
  return (
    <div className="sc-rows">
      {techGroups.map((g) => (
        <Row key={g.id} label={<h3 className="sc-h3">{g.title}</h3>}>
          <ul className="sc-tech" role="list">
            {g.items.map((t) => (
              <li key={t.name} className="sc-tech-item">
                <span className="sc-tech-mark">{t.icon ? <TechIcon icon={t.icon} className="sc-tech-icon" /> : null}</span>
                <span className="sc-tech-name">{t.name}</span>
                {t.detail ? <span className="sc-small sc-tech-detail">{t.detail}</span> : null}
              </li>
            ))}
          </ul>
          {g.practices ? <p className="sc-small">{g.practices.join(' · ')}</p> : null}
        </Row>
      ))}
    </div>
  )
}

function Projects() {
  return (
    <div className="sc-rows">
      {openProjects.map((p) => (
        <Row key={p.id} label={<h3 className="sc-h3">{p.copy.es.name}</h3>}>
          <p className="sc-text">{p.copy.es.description}</p>
          <p className="sc-small">{p.tags.join(', ')}</p>
          <p className="sc-links">
            {p.links.map((link) => (
              <a
                key={link.href}
                className="sc-link"
                href={link.href}
                target="_blank"
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
    <div className="sc-rows">
      <Row label={<img className="sc-photo" src={avatar} width={576} height={720} alt={copy.hero.photoAlt} />}>
        {a.paragraphs.map((paragraph) => (
          <p key={paragraph} className="sc-text">
            {paragraph}
          </p>
        ))}
      </Row>
    </div>
  )
}

function Education() {
  const a = copy.about
  return (
    <div className="sc-rows">
      <Row label={<h3 className="sc-h3">{a.educationTitle}</h3>}>
        <ul className="sc-plain" role="list">
          {a.education.map((e) => (
            <li key={e.name}>
              <span className="sc-strong">{e.name}</span>
              <span className="sc-small">
                {e.place}, {e.period}
              </span>
            </li>
          ))}
        </ul>
      </Row>
      <Row label={<h3 className="sc-h3">{a.certificationsTitle}</h3>}>
        <ul className="sc-plain" role="list">
          {a.certifications.map((c) => (
            <li key={c.name}>
              <span className="sc-strong">{c.name}</span>
              <span className="sc-small">{c.detail}</span>
            </li>
          ))}
        </ul>
      </Row>
      <Row label={<h3 className="sc-h3">{a.platziLabel}</h3>}>
        <div className="sc-topics">
          {a.platzi.map((group) => (
            <div key={group.topic}>
              <h4 className="sc-group-title">{group.topic}</h4>
              <ul className="sc-plain" role="list">
                {group.courses.map((course) => (
                  <li key={course.name}>
                    <span className="sc-strong">{course.name}</span>
                    {course.date ? <span className="sc-small">{course.date}</span> : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Row>
      <Row label={<h3 className="sc-h3">{a.languagesTitle}</h3>}>
        <ul className="sc-plain" role="list">
          {a.languages.map((l) => (
            <li key={l.name}>
              <span className="sc-strong">{l.name}</span>
              <span className="sc-small">{l.level}</span>
            </li>
          ))}
        </ul>
      </Row>
    </div>
  )
}

function Contact() {
  return (
    <>
      <p className="sc-contact-text">{copy.contact.text}</p>
      <p className="sc-contact-mail">
        <a className="sc-link" href={`mailto:${site.email}`}>
          {site.email}
        </a>
      </p>
      <p className="sc-links">
        <a className="sc-link" href={site.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn <span aria-hidden="true">↗</span>
        </a>
        <a className="sc-link" href={site.github} target="_blank" rel="noopener noreferrer">
          GitHub <span aria-hidden="true">↗</span>
        </a>
        <a className="sc-link" href={site.cv.es} download>
          {copy.hero.downloadCv} <span aria-hidden="true">↓</span>
        </a>
      </p>
    </>
  )
}

function Page() {
  useReveal()
  const { current, live } = useCurrentRole()
  const active = useActiveSection()
  return (
    <div className="sc-page">
      <Side current={current} live={live} active={active} />
      <main className="sc-main">
        <Section id="sobre-mi" title={text.sections.about.title}>
          <About />
        </Section>
        <Section id="formacion" title="Formación">
          <Education />
        </Section>
        <Section id="destacado" title="Destacado">
          <Featured />
        </Section>
        <Section id="casos" title={text.sections.cases.title}>
          <Cases />
        </Section>
        <Section id="trayectoria" title="Trayectoria" lead={text.sections.experience.lead}>
          <Trajectory currentId={current.id} />
        </Section>
        <Section id="stack" title="Stack" lead={text.sections.stack.lead}>
          <Stack />
        </Section>
        <Section id="proyectos" title={text.sections.projects.title} lead={text.sections.projects.lead}>
          <Projects />
        </Section>
        <Section id="contacto" title={text.sections.contact.title}>
          <Contact />
        </Section>
        <footer className="sc-foot">
          <p className="sc-small">
            {site.name}. {text.footer.rights}
          </p>
        </footer>
      </main>
    </div>
  )
}

mount(<Page />)
