import { motion } from 'framer-motion'

type Stat = {
  value: string
  label: string
}

type Props = {
  overline: string
  kicker: string
  headline: string
  title: string
  description: string
  greeting: string
  role: string
  avatarAlt: string
  specialtiesAria: string
  signalLabel: string
  signalValue: string
  signalBody: string
  profileLabel: string
  availabilityLabel: string
  availabilityValue: string
  spotlightTitle: string
  spotlightBody: string
  metricsLabel: string
  terminalLines: [string, string, string, string]
  specialties: string[]
  stats: Stat[]
  tagline: string
  ctaProjects: string
  ctaContact: string
  ctaCV: string
  downloadCV: string
  ctaAriaLabel: string
  scrollLabel: string
  scrollAriaLabel: string
}

const revealUp = {
  hidden: { opacity: 0, y: 30 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

const heroImagePriority = { fetchpriority: 'high' } as Record<string, string>

export function HeroBentoScene({
  overline,
  kicker,
  headline,
  title,
  description,
  greeting,
  role,
  avatarAlt,
  specialtiesAria,
  signalLabel,
  signalValue,
  signalBody,
  profileLabel,
  availabilityLabel,
  availabilityValue,
  spotlightTitle,
  spotlightBody,
  metricsLabel,
  terminalLines,
  specialties,
  stats,
  tagline,
  ctaProjects,
  ctaContact,
  ctaCV,
  downloadCV,
  ctaAriaLabel,
  scrollLabel,
  scrollAriaLabel,
}: Props) {
  const primaryStats = stats.slice(0, 3)
  const extraStat = stats[3]

  return (
    <section id="top" className="container hero-bento" aria-labelledby="hero-title">
      <div className="hero-bento__backdrop" aria-hidden="true" />

      <div className="hero-bento__grid">
        <motion.article
          className="hero-bento__panel hero-bento__panel--intro"
          initial="hidden"
          animate="show"
          custom={0}
          variants={revealUp}
        >
          <p className="hero-bento__eyebrow">{overline}</p>
          <p className="hero-bento__kicker">{kicker}</p>
          <div className="hero-bento__copy">
            <h1 id="hero-title">{headline}</h1>
            <p className="hero-bento__title">{title}</p>
            <p className="hero-bento__description">{description}</p>
          </div>

          <div className="hero-bento__stack" aria-label={specialtiesAria}>
            {specialties.map((item) => (
              <span className="hero-bento__chip" key={item}>
                {item}
              </span>
            ))}
          </div>
        </motion.article>

        <motion.article
          className="hero-bento__panel hero-bento__panel--signal"
          initial="hidden"
          animate="show"
          custom={0.08}
          variants={revealUp}
        >
          <span className="hero-bento__label">{signalLabel}</span>
          <strong className="hero-bento__signal">{signalValue}</strong>
          <p>{signalBody}</p>
        </motion.article>

        <motion.article
          className="hero-bento__panel hero-bento__panel--profile"
          initial="hidden"
          animate="show"
          custom={0.12}
          variants={revealUp}
          aria-label={profileLabel}
        >
          <div className="hero-bento__profile-meta">
            <span className="hero-bento__label">{profileLabel}</span>
            <span className="hero-bento__status" title={availabilityValue}>
              {availabilityLabel}
            </span>
          </div>

          <div className="hero-bento__avatar-ring">
            <div className="hero-bento__avatar">
              <img
                {...heroImagePriority}
                src="/assets/avatar.jpg"
                alt={avatarAlt}
                loading="eager"
                width="320"
                height="320"
              />
            </div>
          </div>

          <div className="hero-bento__profile-copy">
            <p className="hero-bento__name">{greeting}</p>
            <p className="hero-bento__role">{role}</p>
            <p className="hero-bento__tagline">{tagline}</p>
          </div>

          <div className="hero-bento__cta" aria-label={ctaAriaLabel}>
            <a className="btn" href="#projects">
              {ctaProjects}
            </a>
            <a className="btn ghost" href="#contact">
              {ctaContact}
            </a>
            <a className="btn ghost" href="/CV_NICOLAS_DURAN.pdf" download aria-label={downloadCV}>
              {ctaCV}
            </a>
          </div>

          <a className="hero-bento__scroll" href="#experience" aria-label={scrollAriaLabel}>
            {scrollLabel}
          </a>
        </motion.article>

        <motion.article
          className="hero-bento__panel hero-bento__panel--spotlight"
          initial="hidden"
          animate="show"
          custom={0.16}
          variants={revealUp}
        >
          <span className="hero-bento__label">{spotlightTitle}</span>
          <p>{spotlightBody}</p>
          {extraStat ? (
            <div className="hero-bento__mini-stat">
              <span>{extraStat.value}</span>
              <small>{extraStat.label}</small>
            </div>
          ) : null}
        </motion.article>

        <motion.article
          className="hero-bento__panel hero-bento__panel--metrics"
          initial="hidden"
          animate="show"
          custom={0.2}
          variants={revealUp}
          aria-label={metricsLabel}
        >
          <div className="hero-bento__metrics-head">
            <span className="hero-bento__label">{metricsLabel}</span>
            <span className="hero-bento__metrics-line" aria-hidden="true" />
          </div>

          <div className="hero-bento__stats">
            {primaryStats.map((stat) => (
              <div className="hero-bento__stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.article>

        <motion.article
          className="hero-bento__panel hero-bento__panel--terminal"
          initial="hidden"
          animate="show"
          custom={0.24}
          variants={revealUp}
        >
          <div className="hero-bento__terminal-top" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="hero-bento__terminal-copy">
            <p>{terminalLines[0]}</p>
            <strong>{terminalLines[1]}</strong>
            <p>{terminalLines[2]}</p>
            <strong>{terminalLines[3]}</strong>
          </div>
        </motion.article>
      </div>
    </section>
  )
}
