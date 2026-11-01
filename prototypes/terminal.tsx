/* eslint-disable react-refresh/only-export-components -- entry file: components and mount() live together */
import type { ReactNode } from 'react'
import './terminal.css'
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
const labels = ui.es
const host = new URL(site.url).host

/** Deterministic 7 char hex id (FNV-1a) so every entry looks like a short commit hash. */
function shortHash(id: string): string {
  let h = 0x811c9dc5
  for (let i = 0; i < id.length; i += 1) {
    h ^= id.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7)
}

const navItems = [
  { id: 'experiencia', label: labels.nav.experience },
  { id: 'casos', label: labels.nav.cases },
  { id: 'stack', label: 'Stack' },
  { id: 'proyectos', label: labels.nav.projects },
  { id: 'sobre-mi', label: labels.nav.about },
  { id: 'contacto', label: labels.nav.contact },
]

function Prompt({ command }: { command: string }) {
  return (
    <p className="tm-prompt" aria-hidden="true">
      <span className="tm-prompt__who">nicolas@{host}</span>
      <span>:~</span>$ {command}
    </p>
  )
}

function SiteNav() {
  return (
    <header className="tm-top">
      <div className="tm-wrap">
        <nav className="tm-nav" aria-label={labels.nav.label}>
          <span className="tm-nav__ps1" aria-hidden="true">
            nicolas@{host}:~$ ls
          </span>
          <ul className="tm-nav__list" role="list">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  const hero = copy.hero
  return (
    <section className="tm-hero tm-wrap" aria-labelledby="tm-name">
      <Prompt command="whoami" />
      <img className="tm-hero__photo" src={avatar} alt={hero.photoAlt} width={160} height={160} />
      <h1 id="tm-name" className="tm-hero__name">
        {hero.name}
      </h1>
      <p className="tm-hero__role">{hero.role}</p>
      <p className="tm-hero__statement">{hero.statement}</p>
      <p>{hero.sub}</p>
      <p className="tm-dim">{hero.proof}</p>
      <p className="tm-hero__actions">
        <a className="tm-btn tm-btn--primary" href={site.cv.es} download>
          {hero.downloadCv}
        </a>
        <a className="tm-btn" href={`mailto:${site.email}`}>
          {hero.emailMe}
        </a>
      </p>
    </section>
  )
}

function Section({
  id,
  command,
  title,
  lead,
  children,
}: {
  id: string
  command: string
  title: string
  lead?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="tm-section tm-wrap" aria-labelledby={`${id}-title`}>
      <Prompt command={command} />
      <h2 id={`${id}-title`} className="tm-section__title">
        {title}
      </h2>
      {lead ? <p className="tm-dim tm-section__lead">{lead}</p> : null}
      {children}
    </section>
  )
}

function Log() {
  return (
    <ol className="tm-log" role="list">
      {experience.map((entry) => {
        const e = entry.copy.es
        return (
          <li key={entry.id} className="tm-commit" data-reveal>
            <span className="tm-commit__node" aria-hidden="true">
              *
            </span>
            <div>
              <div className="tm-commit__head">
                <p className="tm-commit__meta">
                  <span className="tm-commit__hash" aria-hidden="true">
                    {shortHash(entry.id)}
                  </span>
                  {entry.current ? <span className="tm-commit__ref">(en curso)</span> : null}
                  <span className="tm-dim">{e.period}</span>
                </p>
                <h3 className="tm-commit__title">
                  {e.role} <span className="tm-dim">@</span> {e.organization}
                </h3>
                <p className="tm-dim">{e.location}</p>
              </div>
              <ul className="tm-commit__bullets" role="list">
                {e.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              {entry.caseSlug ? (
                <p className="tm-commit__more">
                  <a href={pathOf({ page: 'case', lang: 'es', slug: entry.caseSlug })}>
                    {labels.cases.viewCase}
                  </a>
                </p>
              ) : null}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

function Cases() {
  return (
    <ul className="tm-list" role="list">
      {cases.map((c) => {
        const k = c.copy.es
        return (
          <li key={c.slug} className="tm-item" data-reveal>
            <h3 className="tm-item__title">
              <a href={pathOf({ page: 'case', lang: 'es', slug: c.slug })}>{k.title}</a>
            </h3>
            <p className="tm-dim">
              {k.role} · {k.period}
            </p>
            <p>{k.summary}</p>
            <p className="tm-tags tm-dim">
              {c.stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </p>
          </li>
        )
      })}
    </ul>
  )
}

function Stack() {
  return (
    <dl className="tm-stack">
      {stackGroups.map((group) => (
        <div key={group.id} className="tm-stack__row" data-reveal>
          <dt>{group.title.es}</dt>
          <dd>
            <ul role="list">
              {group.items.map((item) => (
                <li key={item.name.es}>
                  {item.name.es}
                  {item.detail ? <span className="tm-dim"> {item.detail.es}</span> : null}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  )
}

function Projects() {
  return (
    <ul className="tm-list tm-list--compact" role="list">
      {openProjects.map((project) => {
        const p = project.copy.es
        return (
          <li key={project.id} className="tm-item" data-reveal>
            <h3 className="tm-item__title">{p.name}</h3>
            <p>{p.description}</p>
            <p className="tm-tags tm-dim">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </p>
            <p className="tm-item__links">
              {project.links.map((link) => (
                <a key={link.href} href={link.href} rel="noreferrer">
                  {link.label?.es ?? labels.projects.viewOnGithub}
                </a>
              ))}
            </p>
          </li>
        )
      })}
    </ul>
  )
}

function About() {
  const about = copy.about
  return (
    <div className="tm-about">
      {about.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="tm-about__grid" data-reveal>
        <h3>{about.educationTitle}</h3>
        <ul role="list">
          {about.education.map((item) => (
            <li key={item.name}>
              <span className="tm-dim">{item.period}</span> {item.name}
              <span className="tm-dim"> {item.place}</span>
            </li>
          ))}
        </ul>
        <h3>{about.certificationsTitle}</h3>
        <ul role="list">
          {about.certifications.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h3>{about.platziLabel}</h3>
        <p className="tm-tags tm-dim">
          {about.platzi.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </p>
        <h3>{about.languagesTitle}</h3>
        <ul role="list">
          {about.languages.map((item) => (
            <li key={item.name}>
              {item.name} <span className="tm-dim">{item.level}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Contact() {
  return (
    <>
      <p>{copy.contact.text}</p>
      <ul className="tm-contact__links" role="list">
        <li>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </li>
        <li>
          <a href={site.linkedin} rel="noreferrer">
            LinkedIn
          </a>
        </li>
        <li>
          <a href={site.github} rel="noreferrer">
            GitHub
          </a>
        </li>
        <li>
          <a href={site.cv.es} download>
            {copy.hero.downloadCv}
          </a>
        </li>
      </ul>
    </>
  )
}

function Page() {
  useReveal()
  return (
    <>
      <a className="tm-skip" href="#main">
        {labels.skipToContent}
      </a>
      <div className="tm-progress" aria-hidden="true" />
      <SiteNav />
      <main id="main">
        <Hero />
        <Section
          id="experiencia"
          command="git log --graph"
          title={labels.sections.experience.title}
          lead={labels.sections.experience.lead}
        >
          <Log />
        </Section>
        <Section
          id="casos"
          command="ls casos/"
          title={labels.sections.cases.title}
          lead={labels.sections.cases.lead}
        >
          <Cases />
        </Section>
        <Section
          id="stack"
          command="cat stack.txt"
          title={labels.sections.stack.title}
          lead={labels.sections.stack.lead}
        >
          <Stack />
        </Section>
        <Section
          id="proyectos"
          command="gh repo list"
          title={labels.sections.projects.title}
          lead={labels.sections.projects.lead}
        >
          <Projects />
        </Section>
        <Section id="sobre-mi" command="cat sobre-mi.md" title={labels.sections.about.title}>
          <About />
        </Section>
        <Section id="contacto" command="cat contacto.txt" title={labels.sections.contact.title}>
          <Contact />
        </Section>
      </main>
      <footer className="tm-footer">
        <div className="tm-wrap">
          <p className="tm-footer__prompt" aria-hidden="true">
            $ <span className="tm-cursor" />
          </p>
        </div>
        <div className="tm-status">
          <div className="tm-wrap tm-status__row">
            <span>{site.name}</span>
            <span>
              {site.location.city}, {site.location.country}
            </span>
          </div>
        </div>
      </footer>
    </>
  )
}

mount(<Page />)
