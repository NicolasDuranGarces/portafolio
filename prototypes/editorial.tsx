/* eslint-disable react-refresh/only-export-components -- entry file: components and mount() live together */
import './editorial.css'
import { Fragment } from 'react'
import { mount } from './shared/mount'
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

const lang = 'es'
const home = homeCopy[lang]
const t = ui[lang]

const navItems = [
  { href: '#trayectoria', label: 'Trayectoria' },
  { href: '#casos', label: t.nav.cases },
  { href: '#stack', label: 'Stack' },
  { href: '#proyectos', label: t.nav.projects },
  { href: '#sobre-mi', label: t.nav.about },
  { href: '#contacto', label: t.nav.contact },
]

/** Each word sits in a mask so the headline can rise into view line by line. */
function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(' ').map((word, index) => (
        <Fragment key={index}>
          {index > 0 ? ' ' : null}
          <span className="ed-word">
            <span className="ed-word-in">{word}</span>
          </span>
        </Fragment>
      ))}
    </>
  )
}

function Masthead() {
  return (
    <header className="ed-mast">
      <div className="ed-wrap ed-mast-row">
        <a className="ed-mast-name" href="#top">
          {site.name}
        </a>
        <nav aria-label={t.nav.label}>
          <ul className="ed-nav" role="list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  const { hero } = home
  return (
    <section className="ed-hero" aria-labelledby="ed-title">
      <div className="ed-wrap">
        <h1 className="ed-headline" id="ed-title">
          <Words text={hero.role} />
        </h1>
        <div className="ed-hero-grid">
          <div className="ed-hero-text">
            <p className="ed-deck">{hero.statement}</p>
            <p className="ed-lead">{hero.sub}</p>
            <p className="ed-actions">
              <a className="ed-btn" href={site.cv.es} download>
                {hero.downloadCv}
              </a>
              <a className="ed-link" href={`mailto:${site.email}`}>
                {hero.emailMe} <span aria-hidden="true">→</span>
              </a>
            </p>
          </div>
          <figure className="ed-figure">
            <img src={avatar} alt={hero.photoAlt} width={576} height={720} />
            <figcaption>{hero.proof}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

/** Consecutive roles that start in the same year share one big year in the margin. */
function groupByYear() {
  const groups: { year: string; entries: (typeof experience)[number][] }[] = []
  for (const entry of experience) {
    const period = entry.copy[lang].period
    const year = /\d{4}/.exec(period)?.[0] ?? period
    const last = groups[groups.length - 1]
    if (last && last.year === year) last.entries.push(entry)
    else groups.push({ year, entries: [entry] })
  }
  return groups
}

function Trajectory() {
  return (
    <section className="ed-section" id="trayectoria" aria-labelledby="ed-trayectoria">
      <div className="ed-wrap">
        <div className="ed-row ed-head">
          <p className="ed-mark" aria-hidden="true">
            § 1
          </p>
          <div>
            <h2 className="ed-h2" id="ed-trayectoria">
              Trayectoria
            </h2>
            <p className="ed-deck ed-head-deck">{t.sections.experience.lead}</p>
          </div>
        </div>
        <aside className="ed-pull">
          <p className="ed-pull-label">{home.tagline.label}</p>
          <p className="ed-pull-text">{home.tagline.text}</p>
        </aside>
        <ol className="ed-chapters" role="list">
          {groupByYear().map((group) => (
            <li className="ed-row ed-chapter" key={group.entries[0].id}>
              <div className="ed-margin">
                <span className="ed-year" aria-hidden="true" data-reveal>
                  {group.year}
                </span>
              </div>
              <div className="ed-group">
                {group.entries.map((entry) => {
                  const copy = entry.copy[lang]
                  return (
                    <article className="ed-article ed-role-block" key={entry.id} data-reveal>
                      <p className={entry.current ? 'ed-period ed-period-now' : 'ed-period'}>{copy.period}</p>
                      <h3 className="ed-h3">{copy.role}</h3>
                      <p className="ed-org">
                        {copy.organization} · {copy.location}
                      </p>
                      <ul className="ed-paras" role="list">
                        {copy.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                      {entry.caseSlug ? (
                        <p className="ed-more">
                          <a className="ed-link" href={pathOf({ page: 'case', lang, slug: entry.caseSlug })}>
                            {t.cases.viewCase} <span aria-hidden="true">→</span>
                          </a>
                        </p>
                      ) : null}
                    </article>
                  )
                })}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Cases() {
  return (
    <section className="ed-section" id="casos" aria-labelledby="ed-casos">
      <div className="ed-wrap">
        <div className="ed-row ed-head">
          <p className="ed-mark" aria-hidden="true">
            § 2
          </p>
          <div>
            <h2 className="ed-h2" id="ed-casos">
              {t.sections.cases.title}
            </h2>
            <p className="ed-deck ed-head-deck">{t.sections.cases.lead}</p>
          </div>
        </div>
        <ul className="ed-list" role="list">
          {cases.map((c) => {
            const copy = c.copy[lang]
            return (
              <li className="ed-row ed-item" key={c.slug} data-reveal>
                <div className="ed-margin ed-meta">
                  <p>{copy.period}</p>
                  <p>{copy.role}</p>
                </div>
                <article className="ed-article">
                  <h3 className="ed-h3 ed-h3-big">
                    <a className="ed-title-link" href={pathOf({ page: 'case', lang, slug: c.slug })}>
                      {copy.title} <span aria-hidden="true">→</span>
                    </a>
                  </h3>
                  <p>{copy.summary}</p>
                  <ul className="ed-tags" aria-label={t.cases.sections.stack} role="list">
                    {c.stack.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

function Stack() {
  return (
    <section className="ed-section" id="stack" aria-labelledby="ed-stack">
      <div className="ed-wrap">
        <div className="ed-row ed-head">
          <p className="ed-mark" aria-hidden="true">
            § 3
          </p>
          <div>
            <h2 className="ed-h2" id="ed-stack">
              {t.sections.stack.title}
            </h2>
            <p className="ed-deck ed-head-deck">{t.sections.stack.lead}</p>
          </div>
        </div>
        <div className="ed-list">
          {stackGroups.map((group) => (
            <div className="ed-row ed-item ed-item-tight" key={group.id} data-reveal>
              <h3 className="ed-h3 ed-margin">{group.title[lang]}</h3>
              <ul className="ed-index" role="list">
                {group.items.map((item) => (
                  <li key={item.name[lang]}>
                    <span className="ed-name">{item.name[lang]}</span>
                    {item.detail ? <span className="ed-detail">{item.detail[lang]}</span> : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section className="ed-section" id="proyectos" aria-labelledby="ed-proyectos">
      <div className="ed-wrap">
        <div className="ed-row ed-head">
          <p className="ed-mark" aria-hidden="true">
            § 4
          </p>
          <div>
            <h2 className="ed-h2" id="ed-proyectos">
              {t.sections.projects.title}
            </h2>
            <p className="ed-deck ed-head-deck">{t.sections.projects.lead}</p>
          </div>
        </div>
        <ul className="ed-list" role="list">
          {openProjects.map((project) => {
            const copy = project.copy[lang]
            return (
              <li className="ed-row ed-item ed-item-tight" key={project.id} data-reveal>
                <h3 className="ed-h3 ed-margin">{copy.name}</h3>
                <div className="ed-article ed-compact">
                  <p>{copy.description}</p>
                  <ul className="ed-tags" aria-label={t.cases.sections.stack} role="list">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <p className="ed-more">
                    {project.links.map((link) => (
                      <a className="ed-link" key={link.href} href={link.href}>
                        {link.label ? link.label[lang] : t.projects.viewOnGithub} <span aria-hidden="true">→</span>
                      </a>
                    ))}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

function About() {
  const { about } = home
  return (
    <section className="ed-section" id="sobre-mi" aria-labelledby="ed-sobre-mi">
      <div className="ed-wrap">
        <div className="ed-row ed-head">
          <p className="ed-mark" aria-hidden="true">
            § 5
          </p>
          <div>
            <h2 className="ed-h2" id="ed-sobre-mi">
              {t.sections.about.title}
            </h2>
          </div>
        </div>
        <div className="ed-row ed-item">
          <div className="ed-margin" />
          <div className="ed-article ed-prose" data-reveal>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="ed-row ed-item ed-item-tight">
          <h3 className="ed-h3 ed-margin">{about.educationTitle}</h3>
          <ul className="ed-index" role="list">
            {about.education.map((item) => (
              <li key={item.name}>
                <span className="ed-name">{item.name}</span>
                <span className="ed-detail">
                  {item.place} · {item.period}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="ed-row ed-item ed-item-tight">
          <h3 className="ed-h3 ed-margin">{about.certificationsTitle}</h3>
          <div>
            <ul className="ed-index" role="list">
              {about.certifications.map((item) => (
                <li key={item}>
                  <span className="ed-name">{item}</span>
                </li>
              ))}
            </ul>
            <p className="ed-detail ed-courses">
              {about.platziLabel}: {about.platzi.join(', ')}.
            </p>
          </div>
        </div>
        <div className="ed-row ed-item ed-item-tight">
          <h3 className="ed-h3 ed-margin">{about.languagesTitle}</h3>
          <ul className="ed-index" role="list">
            {about.languages.map((item) => (
              <li key={item.name}>
                <span className="ed-name">{item.name}</span>
                <span className="ed-detail">{item.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <footer className="ed-contact" id="contacto" aria-labelledby="ed-contacto">
      <div className="ed-wrap">
        <div className="ed-row ed-head">
          <p className="ed-mark" aria-hidden="true">
            § 6
          </p>
          <div>
            <h2 className="ed-h2" id="ed-contacto">
              {t.sections.contact.title}
            </h2>
            <p className="ed-deck ed-head-deck">{home.contact.text}</p>
          </div>
        </div>
        <p className="ed-mail">
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
        <ul className="ed-links" role="list">
          <li>
            <a className="ed-link" href={site.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a className="ed-link" href={site.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a className="ed-link" href={site.cv.es} download>
              {home.hero.downloadCv}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

function Page() {
  useReveal()
  return (
    <>
      <div className="ed-progress" aria-hidden="true" />
      <div id="top" />
      <Masthead />
      <main>
        <Hero />
        <Trajectory />
        <Cases />
        <Stack />
        <Projects />
        <About />
      </main>
      <Contact />
    </>
  )
}

mount(<Page />)
