/* eslint-disable react-refresh/only-export-components -- entry file: components and mount() live together */
import './brutal.css'
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

const lang = 'es'
const home = homeCopy[lang]
const t = ui[lang]

type Entry = (typeof experience)[number]
type YearGroup = { year: string; entries: Entry[] }

/** Consecutive roles that start in the same year share one giant year. */
function groupByStartYear(): YearGroup[] {
  const groups: YearGroup[] = []
  for (const entry of experience) {
    const year = /\d{4}/.exec(entry.copy[lang].period)?.[0] ?? entry.copy[lang].period
    const last = groups[groups.length - 1]
    if (last && last.year === year) last.entries.push(entry)
    else groups.push({ year, entries: [entry] })
  }
  return groups
}

const yearGroups = groupByStartYear()

const navItems = [
  { href: '#trayectoria', label: 'Trayectoria' },
  { href: '#casos', label: t.nav.cases },
  { href: '#stack', label: 'Stack' },
  { href: '#proyectos', label: t.nav.projects },
  { href: '#sobre-mi', label: t.nav.about },
  { href: '#contacto', label: t.nav.contact },
]

function Header() {
  return (
    <header className="br-header">
      <nav aria-label={t.nav.label}>
        <ul className="br-nav" role="list">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

function Hero() {
  const { hero } = home
  return (
    <section className="br-hero" aria-labelledby="br-name">
      <div>
        <h1 id="br-name" className="br-name">
          {hero.name}
        </h1>
        <p className="br-role">
          {hero.role} {hero.statement}
        </p>
        <p className="br-lead">{hero.sub}</p>
        <p className="br-actions">
          <a className="br-btn" href={site.cv[lang]} download>
            {hero.downloadCv}
          </a>
          <a className="br-btn" href={`mailto:${site.email}`}>
            {hero.emailMe}
          </a>
        </p>
        <p className="br-mono">{hero.proof}</p>
      </div>
      <img className="br-photo" src={avatar} alt={hero.photoAlt} width="480" height="480" />
    </section>
  )
}

function Trajectory() {
  return (
    <section id="trayectoria" className="br-section" aria-labelledby="br-h-trayectoria">
      <h2 id="br-h-trayectoria" className="br-h2">
        Trayectoria
      </h2>
      <p className="br-lead">{t.sections.experience.lead}</p>
      <ol className="br-groups" role="list">
        {yearGroups.map((group) => (
          <li key={group.entries[0].id} className="br-group" data-reveal>
            <div className="br-year-cell">
              <span className="br-year" aria-hidden="true">
                {group.year}
              </span>
            </div>
            <ol className="br-entries" role="list">
              {group.entries.map((entry) => {
                const c = entry.copy[lang]
                return (
                  <li key={entry.id} className="br-entry">
                    <h3 className="br-h3">{c.role}</h3>
                    <p className="br-mono">
                      {c.organization} / {c.location} / {c.period}
                    </p>
                    <ul className="br-bullets" role="list">
                      {c.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                    {entry.caseSlug && (
                      <p>
                        <a href={pathOf({ page: 'case', lang, slug: entry.caseSlug })}>
                          {t.cases.viewCase} <span aria-hidden="true">-&gt;</span>
                        </a>
                      </p>
                    )}
                  </li>
                )
              })}
            </ol>
          </li>
        ))}
      </ol>
    </section>
  )
}

function Cases() {
  return (
    <section id="casos" className="br-section" aria-labelledby="br-h-casos">
      <h2 id="br-h-casos" className="br-h2">
        {t.sections.cases.title}
      </h2>
      <p className="br-lead">{t.sections.cases.lead}</p>
      <ul className="br-rows" role="list">
        {cases.map((c) => {
          const copy = c.copy[lang]
          return (
            <li key={c.slug} className="br-row">
              <div className="br-row-label">
                <p className="br-mono">{copy.period}</p>
                <p className="br-mono">{copy.role}</p>
              </div>
              <div className="br-row-body">
                <h3 className="br-h3">
                  <a href={pathOf({ page: 'case', lang, slug: c.slug })}>{copy.title}</a>
                </h3>
                <p>{copy.summary}</p>
                <ul className="br-tags" role="list">
                  {c.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function Stack() {
  return (
    <section id="stack" className="br-section" aria-labelledby="br-h-stack">
      <h2 id="br-h-stack" className="br-h2">
        {t.sections.stack.title}
      </h2>
      <p className="br-lead">{t.sections.stack.lead}</p>
      <ul className="br-rows" role="list">
        {stackGroups.map((group) => (
          <li key={group.id} className="br-row">
            <h3 className="br-row-label br-h3">{group.title[lang]}</h3>
            <ul className="br-row-body br-plain br-flow" role="list">
              {group.items.map((item) => (
                <li key={item.name[lang]}>
                  <strong>{item.name[lang]}</strong>
                  {item.detail && <span className="br-mono"> {item.detail[lang]}</span>}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Projects() {
  return (
    <section id="proyectos" className="br-section" aria-labelledby="br-h-proyectos">
      <h2 id="br-h-proyectos" className="br-h2">
        {t.sections.projects.title}
      </h2>
      <p className="br-lead">{t.sections.projects.lead}</p>
      <ul className="br-rows" role="list">
        {openProjects.map((project) => {
          const copy = project.copy[lang]
          return (
            <li key={project.id} className="br-row">
              <h3 className="br-row-label br-h3">{copy.name}</h3>
              <div className="br-row-body">
                <p>{copy.description}</p>
                <ul className="br-tags" role="list">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <p className="br-links">
                  {project.links.map((link) => (
                    <a key={link.href} href={link.href} rel="noopener">
                      {link.label ? link.label[lang] : t.projects.viewOnGithub}
                    </a>
                  ))}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function About() {
  const { about } = home
  return (
    <section id="sobre-mi" className="br-section" aria-labelledby="br-h-sobre-mi">
      <h2 id="br-h-sobre-mi" className="br-h2">
        {t.sections.about.title}
      </h2>
      {about.paragraphs.map((paragraph) => (
        <p key={paragraph} className="br-prose">
          {paragraph}
        </p>
      ))}
      <ul className="br-rows" role="list">
        <li className="br-row">
          <h3 className="br-row-label br-h3">{about.educationTitle}</h3>
          <ul className="br-row-body br-plain" role="list">
            {about.education.map((item) => (
              <li key={item.name}>
                <strong>{item.name}</strong>
                <span className="br-mono">
                  {' '}
                  {item.place} / {item.period}
                </span>
              </li>
            ))}
          </ul>
        </li>
        <li className="br-row">
          <h3 className="br-row-label br-h3">{about.certificationsTitle}</h3>
          <ul className="br-row-body br-plain" role="list">
            {about.certifications.map((item) => (
              <li key={item}>{item}</li>
            ))}
            <li>
              <strong>{about.platziLabel}</strong>
              <span className="br-mono"> {about.platzi.join(', ')}</span>
            </li>
          </ul>
        </li>
        <li className="br-row">
          <h3 className="br-row-label br-h3">{about.languagesTitle}</h3>
          <ul className="br-row-body br-plain" role="list">
            {about.languages.map((item) => (
              <li key={item.name}>
                <strong>{item.name}</strong>
                <span className="br-mono"> {item.level}</span>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </section>
  )
}

function Contact() {
  return (
    <section id="contacto" className="br-section" aria-labelledby="br-h-contacto">
      <h2 id="br-h-contacto" className="br-h2">
        {t.sections.contact.title}
      </h2>
      <p className="br-prose">{home.contact.text}</p>
      <ul className="br-contact" role="list">
        <li>
          <a className="br-btn" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </li>
        <li>
          <a className="br-btn" href={site.linkedin} rel="noopener">
            LinkedIn
          </a>
        </li>
        <li>
          <a className="br-btn" href={site.github} rel="noopener">
            GitHub
          </a>
        </li>
        <li>
          <a className="br-btn" href={site.cv[lang]} download>
            {home.hero.downloadCv}
          </a>
        </li>
      </ul>
    </section>
  )
}

function Page() {
  useReveal()
  return (
    <div className="br-page">
      <Header />
      <main>
        <Hero />
        <Trajectory />
        <Cases />
        <Stack />
        <Projects />
        <About />
        <Contact />
      </main>
      <footer className="br-footer">
        <hr />
        <p className="br-mono">
          {site.name}. {t.footer.rights}
        </p>
      </footer>
    </div>
  )
}

mount(<Page />)
