import { TechIcon } from './TechIcon'
import { FiDownload } from 'react-icons/fi'
import foto from '../foto.jpeg'

type Stat = { value: string; label: string }
type TechItem = { name: string; icon: string }

type CurrentJob = {
  company: string
  role: string
  period: string
  stack: string[]
}

type Props = {
  overline: string
  headline: string
  title: string
  description: string
  chips: string[]
  greeting: string
  role: string
  avatarAlt: string
  profileLabel: string
  availabilityLabel: string
  availabilityValue: string
  locationValue: string
  currentJob: CurrentJob
  githubUrl: string
  githubLabel: string
  stats: Stat[]
  backendItems: TechItem[]
  frontendItems: TechItem[]
  aiItems: TechItem[]
  labelBackend: string
  labelFrontend: string
  labelAI: string
  labelCurrentJob: string
  ctaGithub: string
  ctaLinkedIn: string
  ctaCV: string
  downloadCV: string
  ctaAriaLabel: string
}

const heroImagePriority = { fetchpriority: 'high' } as Record<string, string>

export function HeroBentoScene({
  overline,
  headline,
  title,
  description,
  chips,
  greeting,
  role,
  avatarAlt,
  profileLabel,
  availabilityLabel,
  availabilityValue,
  locationValue,
  currentJob,
  githubUrl,
  githubLabel,
  stats,
  backendItems,
  frontendItems,
  aiItems,
  labelBackend,
  labelFrontend,
  labelAI,
  labelCurrentJob,
  ctaGithub,
  ctaLinkedIn,
  ctaCV,
  downloadCV,
  ctaAriaLabel,
}: Props) {
  const statA = stats[0]
  const statB = stats[1]

  return (
    <section id="top" className="hero-bento" aria-labelledby="hero-title">
      <div className="hero-bento__grid">

        {/* ── INTRO: izquierda tall (rows 1+2) ── */}
        <article className="hero-bento__panel hero-bento__panel--intro">
          <div className="hero-bento__intro-main">
            <p className="hero-bento__eyebrow">{overline}</p>
            <div className="hero-bento__copy">
              <h1 id="hero-title">{headline}</h1>
              <p className="hero-bento__title">{title}</p>
              <p className="hero-bento__description">{description}</p>
            </div>
          </div>
          <div className="hero-bento__intro-footer">
            <div className="hero-bento__chips" aria-hidden="true">
              {chips.map((c) => (
                <span className="hero-bento__chip" key={c}>{c}</span>
              ))}
            </div>
          </div>
        </article>

        {/* ── TOP-C: trabajo actual (row 1, corto) ── */}
        <article className="hero-bento__panel hero-bento__panel--top-c">
          <div className="hero-bento__panel-head">
            <p className="hero-bento__tech-label">{labelCurrentJob}</p>
            <span className="hero-bento__panel-count">{currentJob.stack.length}</span>
          </div>
          <div className="hero-bento__job-header">
            <p className="hero-bento__job-company">{currentJob.company}</p>
            <p className="hero-bento__job-role">{currentJob.role}</p>
            <p className="hero-bento__job-period">{currentJob.period}</p>
          </div>
          <div className="hero-bento__job-stack">
            {currentJob.stack.map((s) => (
              <span className="hero-bento__chip hero-bento__chip--sm" key={s}>{s}</span>
            ))}
          </div>
        </article>

        {/* ── PROFILE: centro (row 2, tall) — foto + nombre + rol ── */}
        <article className="hero-bento__panel hero-bento__panel--profile" aria-label={profileLabel}>
          <div className="hero-bento__profile-top">
            <p className="hero-bento__niduga">NIDUGA</p>
            <p className="hero-bento__name">{greeting}</p>
          </div>
          <div className="hero-bento__avatar-wrap">
            <div className="hero-bento__avatar-ring">
              <div className="hero-bento__avatar">
                <img
                  {...heroImagePriority}
                  src={foto}
                  alt={avatarAlt}
                  loading="eager"
                  width="320"
                  height="320"
                />
              </div>
            </div>
          </div>
          <div className="hero-bento__profile-bottom">
            <p className="hero-bento__role">{role}</p>
            <span className="hero-bento__status" title={availabilityValue}>
              {availabilityLabel}
            </span>
            <p className="hero-bento__location">{locationValue}</p>
          </div>
        </article>

        {/* ── TECH-B: arriba derecha (row 1) — Backend ── */}
        <article className="hero-bento__panel hero-bento__panel--tech-b">
          <div className="hero-bento__panel-head">
            <p className="hero-bento__tech-label">{labelBackend}</p>
            <span className="hero-bento__panel-count">{backendItems.length}</span>
          </div>
          <div className="hero-bento__tech-grid">
            {backendItems.map((item) => (
              <div className="hero-bento__tech-item" key={item.icon}>
                <div className="hero-bento__tech-icon">
                  <TechIcon name={item.icon} size={18} />
                </div>
                <span className="hero-bento__tech-name">{item.name}</span>
              </div>
            ))}
          </div>
        </article>

        {/* ── TECH-R: derecha tall (rows 2+3) — Frontend + IA ── */}
        <article className="hero-bento__panel hero-bento__panel--tech-r">
          <div className="hero-bento__tech-group">
            <div className="hero-bento__group-head">
              <p className="hero-bento__tech-label">{labelFrontend}</p>
              <span className="hero-bento__panel-count">{frontendItems.length}</span>
            </div>
            <div className="hero-bento__line-list">
              {frontendItems.map((item) => (
                <div className="hero-bento__line-item" key={`${item.icon}-${item.name}`}>
                  <div className="hero-bento__tech-icon">
                    <TechIcon name={item.icon} size={18} />
                  </div>
                  <span className="hero-bento__line-name">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-bento__tech-divider" aria-hidden="true" />
          <div className="hero-bento__tech-group">
            <div className="hero-bento__group-head">
              <p className="hero-bento__tech-label">{labelAI}</p>
              <span className="hero-bento__panel-count">{aiItems.length}</span>
            </div>
            <div className="hero-bento__line-list">
              {aiItems.map((item) => (
                <div className="hero-bento__line-item" key={`${item.icon}-${item.name}`}>
                  <div className="hero-bento__tech-icon">
                    <TechIcon name={item.icon} size={18} />
                  </div>
                  <span className="hero-bento__line-name">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* ── CTA: abajo izquierda (row 3) ── */}
        <article className="hero-bento__panel hero-bento__panel--cta">
          <div className="hero-bento__cta" aria-label={ctaAriaLabel}>
            <a
              className="btn hero-bento__action-link"
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={githubLabel}
            >
              <TechIcon name="github" size={18} />
              <span>{ctaGithub}</span>
            </a>
            <a
              className="btn ghost hero-bento__action-link"
              href="https://www.linkedin.com/in/garcesnicolas/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Nicolas Duran Garces"
            >
              <TechIcon name="linkedin" size={18} />
              <span>{ctaLinkedIn}</span>
            </a>
            <a
              className="btn ghost hero-bento__action-link"
              href="/CV_NICOLAS_DURAN.pdf"
              download
              aria-label={downloadCV}
            >
              <FiDownload size={18} />
              <span>{ctaCV}</span>
            </a>
          </div>
        </article>

        {/* ── STAT-A: abajo pequeño (row 3) ── */}
        <article className="hero-bento__panel hero-bento__panel--stat-a">
          <strong className="hero-bento__big-stat">{statA?.value}</strong>
          <span className="hero-bento__stat-label">{statA?.label}</span>
        </article>

        {/* ── STAT-B: abajo pequeño (row 3) ── */}
        <article className="hero-bento__panel hero-bento__panel--stat-b">
          <strong className="hero-bento__big-stat">{statB?.value}</strong>
          <span className="hero-bento__stat-label">{statB?.label}</span>
        </article>

      </div>
    </section>
  )
}
