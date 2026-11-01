/* eslint-disable react-refresh/only-export-components -- entry file: components and mount() live together */
import './swiss-indice.css'
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
    <header className="si-bar">
      <div className="si-wrap si-grid si-bar-in">
        <a className="si-brand" href="#top">
          {copy.hero.name}
        </a>
        <nav className="si-nav" aria-label={text.nav.label}>
          <ul className="si-nav-list" role="list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a className="si-nav-link" href={item.href}>
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
    <section className="si-wrap si-grid si-hero" aria-labelledby="si-hero-title">
      <p className="si-hero-meta">{copy.hero.proof}</p>
      <h1 id="si-hero-title" className="si-hero-title">
        <span className="si-hero-name">{copy.hero.name}</span>
        <span className="si-hero-role">{copy.hero.role}</span>
      </h1>
      <p className="si-hero-statement">{copy.hero.statement}</p>
      <p className="si-hero-sub">{copy.hero.sub}</p>
      <div className="si-hero-actions">
        <a className="si-btn" href={site.cv.es} download>
          {copy.hero.downloadCv}
        </a>
        <a className="si-btn si-btn-ghost" href={`mailto:${site.email}`}>
          {copy.hero.emailMe}
        </a>
      </div>
      <img className="si-hero-photo" src={avatar} width={576} height={720} alt={copy.hero.photoAlt} />
    </section>
  )
}

type SectionProps = { id: string; num: string; title: string; lead?: string; children: ReactNode }

function Section({ id, num, title, lead, children }: SectionProps) {
  return (
    <section id={id} className="si-wrap si-sec" aria-labelledby={`${id}-title`}>
      <div className="si-grid si-sec-head">
        <p className="si-num">{num}</p>
        <h2 id={`${id}-title`} className="si-h2">
          {title}
        </h2>
        {lead ? <p className="si-lead">{lead}</p> : null}
      </div>
      {children}
    </section>
  )
}

/* The one primitive: an index table. Fixed columns, hairline ruled rows, optional detail block under the row. */

type Col = { label: string; at: string }

/** Visual column labels. Every cell also carries its own label, so assistive tech does not need this row. */
function Table({ cols, children }: { cols: Col[]; children: ReactNode }) {
  return (
    <div className="si-table">
      <div className="si-grid si-colhead" aria-hidden="true">
        {cols.map((col) => (
          <span key={col.at} className={`si-${col.at}`}>
            {col.label}
          </span>
        ))}
      </div>
      <ol className="si-rows" role="list">
        {children}
      </ol>
    </div>
  )
}

function Row({ children, detail }: { children: ReactNode; detail?: ReactNode }) {
  return (
    <li className="si-row" data-reveal>
      <div className="si-grid si-head">{children}</div>
      {detail ? <div className="si-grid si-detail">{detail}</div> : null}
    </li>
  )
}

/** One cell: a label (hidden on desktop, shown as label/value pair on mobile) and its value. */
function Cell({ at, label, children }: { at: string; label: string; children: ReactNode }) {
  return (
    <div className={`si-cell si-${at}`}>
      <span className="si-lab">{label}</span>
      <div className="si-val">{children}</div>
    </div>
  )
}

const num = (i: number) => String(i + 1).padStart(2, '0')

/**
 * The real year stays in the DOM for everyone. Where scroll timelines exist, CSS hides it visually
 * and shows a counter driven by --si-year; that duplicate is aria-hidden.
 */
function Year({ year }: { year: string }) {
  return (
    <span className="si-year">
      <span className="si-year-real">{year}</span>
      <span
        className="si-year-count"
        aria-hidden="true"
        ref={(el) => {
          el?.style.setProperty('--si-y', year)
        }}
      />
    </span>
  )
}

function Trajectory() {
  return (
    <Table
      cols={[
        { at: 'c1', label: 'Año' },
        { at: 'c2', label: 'Rol' },
        { at: 'c3', label: 'Organización' },
        { at: 'c4', label: 'Lugar' },
        { at: 'c5', label: 'Periodo' },
      ]}
    >
      {experience.map((entry) => {
        const c = entry.copy.es
        const year = /\d{4}/.exec(c.period)?.[0] ?? c.period
        return (
          <Row
            key={entry.id}
            detail={
              <div className="si-dm">
                <ul className="si-bullets" role="list">
                  {c.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                {entry.caseSlug ? (
                  <a className="si-link si-detail-link" href={pathOf({ page: 'case', lang: 'es', slug: entry.caseSlug })}>
                    {text.cases.viewCase} <span aria-hidden="true">→</span>
                  </a>
                ) : null}
              </div>
            }
          >
            <Cell at="c1" label="Año">
              <Year year={year} />
            </Cell>
            <Cell at="c2" label="Rol">
              <h3 className="si-h3">{c.role}</h3>
            </Cell>
            <Cell at="c3" label="Organización">
              {c.organization}
            </Cell>
            <Cell at="c4" label="Lugar">
              {c.location}
            </Cell>
            <Cell at="c5" label="Periodo">
              <span className="si-nums">{c.period}</span>
            </Cell>
          </Row>
        )
      })}
    </Table>
  )
}

function Cases() {
  return (
    <Table
      cols={[
        { at: 'c1', label: 'Nº' },
        { at: 'c2', label: 'Caso' },
        { at: 'c34', label: 'Rol' },
        { at: 'c5', label: 'Periodo' },
      ]}
    >
      {cases.map((c, i) => {
        const k = c.copy.es
        return (
          <Row
            key={c.slug}
            detail={
              <div className="si-dm">
                <p className="si-text">{k.summary}</p>
                <p className="si-small">{c.stack.join(', ')}</p>
                <p className="si-more" aria-hidden="true">
                  {text.cases.viewCase} <span aria-hidden="true">→</span>
                </p>
              </div>
            }
          >
            <Cell at="c1" label="Nº">
              <span className="si-nums">{num(i)}</span>
            </Cell>
            <Cell at="c2" label="Caso">
              <h3 className="si-h3 si-h3-lg">
                <a className="si-cover" href={pathOf({ page: 'case', lang: 'es', slug: c.slug })}>
                  {k.title}
                </a>
              </h3>
            </Cell>
            <Cell at="c34" label="Rol">
              {k.role}
            </Cell>
            <Cell at="c5" label="Periodo">
              <span className="si-nums">{k.period}</span>
            </Cell>
          </Row>
        )
      })}
    </Table>
  )
}

function Stack() {
  return (
    <Table
      cols={[
        { at: 'c1', label: 'Nº' },
        { at: 'c2', label: 'Grupo' },
        { at: 'c35', label: 'Herramientas' },
      ]}
    >
      {stackGroups.map((g, i) => (
        <Row key={g.id}>
          <Cell at="c1" label="Nº">
            <span className="si-nums">{num(i)}</span>
          </Cell>
          <Cell at="c2" label="Grupo">
            <h3 className="si-h3">{g.title.es}</h3>
          </Cell>
          <Cell at="c35" label="Herramientas">
            <ul className="si-items" role="list">
              {g.items.map((item) => (
                <li key={item.name.es}>
                  <span className="si-strong">{item.name.es}</span>
                  {item.detail ? <span className="si-small">{item.detail.es}</span> : null}
                </li>
              ))}
            </ul>
          </Cell>
        </Row>
      ))}
    </Table>
  )
}

function Projects() {
  return (
    <Table
      cols={[
        { at: 'c1', label: 'Nº' },
        { at: 'c2', label: 'Proyecto' },
        { at: 'c34', label: 'Etiquetas' },
        { at: 'c5', label: 'Enlaces' },
      ]}
    >
      {openProjects.map((p, i) => (
        <Row
          key={p.id}
          detail={
            <div className="si-dm">
              <p className="si-text">{p.copy.es.description}</p>
            </div>
          }
        >
          <Cell at="c1" label="Nº">
            <span className="si-nums">{num(i)}</span>
          </Cell>
          <Cell at="c2" label="Proyecto">
            <h3 className="si-h3">{p.copy.es.name}</h3>
          </Cell>
          <Cell at="c34" label="Etiquetas">
            {p.tags.join(', ')}
          </Cell>
          <Cell at="c5" label="Enlaces">
            <ul className="si-links" role="list">
              {p.links.map((link) => (
                <li key={link.href}>
                  <a
                    className="si-link"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${link.label?.es ?? text.projects.viewOnGithub}: ${p.copy.es.name}`}
                  >
                    {link.label?.es ?? text.projects.viewOnGithub} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </Cell>
        </Row>
      ))}
    </Table>
  )
}

function About() {
  const a = copy.about
  return (
    <Table
      cols={[
        { at: 'c1', label: 'Tema' },
        { at: 'c25', label: 'Detalle' },
      ]}
    >
      <Row>
        <Cell at="c1" label="Tema">
          <h3 className="si-h3">Perfil</h3>
        </Cell>
        <Cell at="c25" label="Detalle">
          {a.paragraphs.map((paragraph) => (
            <p key={paragraph} className="si-text si-text-lg">
              {paragraph}
            </p>
          ))}
        </Cell>
      </Row>
      <Row>
        <Cell at="c1" label="Tema">
          <h3 className="si-h3">{a.educationTitle}</h3>
        </Cell>
        <Cell at="c25" label="Detalle">
          <ul className="si-lines" role="list">
            {a.education.map((e) => (
              <li key={e.name}>
                <span className="si-strong si-l1">{e.name}</span>
                <span className="si-l23">{e.place}</span>
                <span className="si-nums si-l4">{e.period}</span>
              </li>
            ))}
          </ul>
        </Cell>
      </Row>
      <Row>
        <Cell at="c1" label="Tema">
          <h3 className="si-h3">{a.certificationsTitle}</h3>
        </Cell>
        <Cell at="c25" label="Detalle">
          <ul className="si-lines" role="list">
            {a.certifications.map((item) => (
              <li key={item}>
                <span className="si-l1234">{item}</span>
              </li>
            ))}
          </ul>
        </Cell>
      </Row>
      <Row>
        <Cell at="c1" label="Tema">
          <h3 className="si-h3">{a.platziLabel}</h3>
        </Cell>
        <Cell at="c25" label="Detalle">
          {a.platzi.join(', ')}
        </Cell>
      </Row>
      <Row>
        <Cell at="c1" label="Tema">
          <h3 className="si-h3">{a.languagesTitle}</h3>
        </Cell>
        <Cell at="c25" label="Detalle">
          <ul className="si-lines" role="list">
            {a.languages.map((l) => (
              <li key={l.name}>
                <span className="si-strong si-l1">{l.name}</span>
                <span className="si-l23">{l.level}</span>
              </li>
            ))}
          </ul>
        </Cell>
      </Row>
    </Table>
  )
}

function Contact() {
  return (
    <Table
      cols={[
        { at: 'c1', label: 'Canal' },
        { at: 'c25', label: 'Dato' },
      ]}
    >
      <Row>
        <Cell at="c1" label="Canal">
          <h3 className="si-h3">Correo</h3>
        </Cell>
        <Cell at="c25" label="Dato">
          <a className="si-link si-big" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </Cell>
      </Row>
      <Row>
        <Cell at="c1" label="Canal">
          <h3 className="si-h3">LinkedIn</h3>
        </Cell>
        <Cell at="c25" label="Dato">
          <a className="si-link" href={site.linkedin} target="_blank" rel="noopener noreferrer">
            {site.linkedin.replace(/^https?:\/\//, '')} <span aria-hidden="true">↗</span>
          </a>
        </Cell>
      </Row>
      <Row>
        <Cell at="c1" label="Canal">
          <h3 className="si-h3">GitHub</h3>
        </Cell>
        <Cell at="c25" label="Dato">
          <a className="si-link" href={site.github} target="_blank" rel="noopener noreferrer">
            {site.github.replace(/^https?:\/\//, '')} <span aria-hidden="true">↗</span>
          </a>
        </Cell>
      </Row>
      <Row>
        <Cell at="c1" label="Canal">
          <h3 className="si-h3">CV</h3>
        </Cell>
        <Cell at="c25" label="Dato">
          <a className="si-link" href={site.cv.es} download>
            {copy.hero.downloadCv} <span aria-hidden="true">↓</span>
          </a>
        </Cell>
      </Row>
    </Table>
  )
}

function Footer() {
  return (
    <footer className="si-wrap si-foot">
      <p className="si-small">
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
        <Section id="contacto" num="06" title={text.sections.contact.title} lead={copy.contact.text}>
          <Contact />
        </Section>
      </main>
      <Footer />
    </>
  )
}

mount(<Page />)
