import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TechIcon } from './TechIcon'
import { FiDownload } from 'react-icons/fi'

type Stat = { value: string; label: string }

type TechCategoryItem = { name: string; icon: string }
type TechCategory = { label: string; items: TechCategoryItem[] }

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
  profileLabel: string
  availabilityLabel: string
  availabilityValue: string
  locationValue: string
  currentJob: CurrentJob
  githubUrl: string
  githubLabel: string
  stats: Stat[]
  techCategories: TechCategory[]
  labelCurrentJob: string
  ctaGithub: string
  ctaLinkedIn: string
  ctaCV: string
  downloadCV: string
  ctaAriaLabel: string
}

// ── Shared styles ──────────────────────────────────────────────

const EYEBROW: React.CSSProperties = {
  margin: 0,
  fontSize: '0.65rem',
  textTransform: 'uppercase',
  letterSpacing: '0.18em',
  color: 'var(--muted)',
  fontWeight: 500,
}

const PANEL_DIVIDER: React.CSSProperties = {
  borderTop: '1px solid color-mix(in oklab, var(--text) 7%, transparent)',
  paddingTop: '0.85rem',
  marginTop: '0.85rem',
}

// ── Widgets ────────────────────────────────────────────────────

function NameWidget({ greeting }: { greeting: string }) {
  const [showAlias, setShowAlias] = useState(true)

  useEffect(() => {
    const id = setInterval(() => setShowAlias((p) => !p), 3200)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ flex: '1 1 0', minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 0.5rem' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={showAlias ? 'alias' : 'name'}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontFamily: 'ui-serif, Georgia, "Times New Roman", serif',
            fontWeight: 700,
            fontSize: 'clamp(2.6rem, 4.5vw, 4rem)',
            color: 'var(--text)',
            textAlign: 'center',
            letterSpacing: showAlias ? '0.12em' : '-0.01em',
            lineHeight: 1.1,
            display: 'block',
          }}
        >
          {showAlias ? 'NIDUGA' : greeting}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

const CAT_COLORS = [
  'var(--primary)',
  'var(--accent)',
  'var(--success)',
  'color-mix(in oklab, var(--primary) 55%, var(--accent))',
]

function SegmentedTechWidget({ categories }: { categories: TechCategory[] }) {
  const count = categories.length
  // 5 cats → row1: 3 cols, row2: 2 cols (last spans to fill)
  const gridCols = count <= 4 ? '1fr 1fr' : 'repeat(3, 1fr)'

  return (
    <div style={{
      flex: '1 1 0',
      minHeight: 0,
      display: 'grid',
      gridTemplateColumns: gridCols,
      gap: '0.5rem',
      overflow: 'hidden',
      alignContent: 'start',
    }}>
      {categories.map((cat, ci) => {
        const total = categories.length
        const cols = total <= 4 ? 2 : 3
        const remainder = total % cols
        const isLast = ci === total - 1
        const spanFull = isLast && remainder !== 0
        return (
        <div
          key={cat.label}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.28rem',
            minHeight: 0,
            overflow: 'hidden',
            padding: '0.5rem 0.5rem',
            borderRadius: '10px',
            background: 'color-mix(in oklab, var(--text) 3%, transparent)',
            border: '1px solid color-mix(in oklab, var(--text) 6%, transparent)',
            gridColumn: spanFull ? `span ${cols - remainder + 1}` : undefined,
          }}
        >
          <p style={{
            margin: '0 0 0.18rem',
            fontSize: '0.57rem',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: CAT_COLORS[ci],
            fontWeight: 700,
            flexShrink: 0,
          }}>
            {cat.label}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.18rem', overflow: 'hidden' }}>
            {cat.items.map((item) => (
              <div
                key={item.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.15rem 0.3rem',
                  borderRadius: '5px',
                  background: 'color-mix(in oklab, var(--text) 4%, transparent)',
                  border: '1px solid color-mix(in oklab, var(--text) 6%, transparent)',
                  flexShrink: 0,
                }}
              >
                <TechIcon name={item.icon} size={14} />
                <span style={{
                  fontSize: '0.63rem',
                  color: 'var(--muted)',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  lineHeight: 1.2,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        )
      })}
    </div>
  )
}

// ── Main ───────────────────────────────────────────────────────

export function HeroBentoScene({
  overline,
  headline,
  title,
  description,
  chips,
  greeting,
  role,
  profileLabel,
  availabilityLabel,
  availabilityValue,
  locationValue,
  currentJob,
  githubUrl,
  githubLabel,
  stats,
  techCategories,
  labelCurrentJob,
  ctaGithub,
  ctaLinkedIn,
  ctaCV,
  downloadCV,
  ctaAriaLabel,
}: Props) {
  const statA = stats[0]
  const statB = stats[1]

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] as number[] },
  })

  return (
    <section id="top" className="hero-bento" aria-labelledby="hero-title">
      <div
        className="bento-grid-responsive"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
          gridTemplateRows: 'repeat(3, 1fr)',
          gap: 'clamp(0.5rem, 0.8vw, 0.85rem)',
          flex: 1,
          minHeight: 0,
          maxWidth: '1400px',
          width: '100%',
          margin: '0 auto',
        }}
      >

        {/* ── IDENTITY (col 1-2, row 1-2) ── */}
        <motion.article
          {...fadeUp(0)}
          className="hero-bento__panel"
          style={{ gridColumn: '1 / 3', gridRow: '1 / 3', display: 'flex', flexDirection: 'column' }}
          aria-label={profileLabel}
        >
          <p style={EYEBROW}>Alias</p>
          <NameWidget greeting={greeting} />
          <div style={PANEL_DIVIDER}>
            <p style={{ margin: 0, fontFamily: 'ui-serif, Georgia, serif', fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)', fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>
              {role}
            </p>
            <p style={{ margin: '0.4rem 0 0', fontSize: '0.76rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="hero-bento__status" title={availabilityValue}>{availabilityLabel}</span>
              <span aria-hidden style={{ opacity: 0.4 }}>·</span>
              <span>{locationValue}</span>
            </p>
          </div>
        </motion.article>

        {/* ── CURRENT JOB (col 3-4, row 1) ── */}
        <motion.article
          {...fadeUp(0.08)}
          className="hero-bento__panel"
          style={{ gridColumn: '3 / 5', gridRow: '1 / 2', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)', flexShrink: 0, boxShadow: '0 0 10px color-mix(in oklab, var(--success) 50%, transparent)' }} />
            <p style={EYEBROW}>{labelCurrentJob}</p>
          </div>
          <div>
            <p style={{ margin: 0, fontFamily: 'ui-serif, Georgia, serif', fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}>
              {currentJob.company}
            </p>
            <p style={{ margin: '0.3rem 0 0', fontSize: '0.78rem', color: 'var(--muted)' }}>
              {currentJob.role}
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
            {currentJob.stack.map((s) => (
              <span
                key={s}
                style={{
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.67rem',
                  fontWeight: 500,
                  background: 'color-mix(in oklab, var(--text) 5%, transparent)',
                  color: 'var(--muted)',
                  border: '1px solid color-mix(in oklab, var(--text) 8%, transparent)',
                  letterSpacing: '0.02em',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </motion.article>

        {/* ── TECH STACK (col 5-6, row 1-2) ── */}
        <motion.article
          {...fadeUp(0.16)}
          className="hero-bento__panel"
          style={{ gridColumn: '5 / 7', gridRow: '1 / 3', display: 'flex', flexDirection: 'column' }}
        >
          <p style={EYEBROW}>Stack</p>
          <SegmentedTechWidget categories={techCategories} />
        </motion.article>

        {/* ── STATS (col 3-4, row 2) ── */}
        <motion.article
          {...fadeUp(0.22)}
          className="hero-bento__panel"
          style={{ gridColumn: '3 / 5', gridRow: '2 / 3', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <p style={EYEBROW}>Experiencia</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', flex: 1, alignItems: 'center' }}>
            {[statA, statB].filter(Boolean).map((stat, i) => (
              <motion.div
                key={stat!.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                style={{ textAlign: 'center', padding: '0.5rem' }}
              >
                <p style={{ margin: 0, fontFamily: 'ui-serif, Georgia, serif', fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)', fontWeight: 700, color: 'var(--text)', lineHeight: 1 }}>
                  {stat!.value}
                </p>
                <p style={{ margin: '0.35rem 0 0', fontSize: '0.68rem', color: 'var(--muted)', lineHeight: 1.3 }}>{stat!.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.article>

        {/* ── INTRO / VALUE PROP (col 1-3, row 3) ── */}
        <motion.article
          {...fadeUp(0.3)}
          className="hero-bento__panel"
          style={{ gridColumn: '1 / 4', gridRow: '3 / 4', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <p style={EYEBROW}>{overline}</p>
            <h1
              id="hero-title"
              style={{
                margin: '0.5rem 0 0',
                fontFamily: 'ui-serif, Georgia, serif',
                fontWeight: 700,
                lineHeight: 1.2,
                color: 'var(--text)',
                fontSize: 'clamp(1.05rem, 1.8vw, 1.4rem)',
              }}
            >
              {headline}
            </h1>
            <p style={{ margin: '0.5rem 0 0', fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.55, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {description}
            </p>
          </div>
          <div className="hero-bento__chips" aria-hidden="true">
            {chips.map((c) => (
              <span className="hero-bento__chip hero-bento__chip--sm" key={c}>{c}</span>
            ))}
          </div>
        </motion.article>

        {/* ── CTA (col 4-6, row 3) ── */}
        <motion.article
          {...fadeUp(0.38)}
          className="hero-bento__panel"
          style={{ gridColumn: '4 / 7', gridRow: '3 / 4', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <p style={EYEBROW}>Contacto</p>
            <p style={{ margin: '0.5rem 0 0', fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.55 }}>{title}</p>
          </div>
          <div className="hero-bento__cta" aria-label={ctaAriaLabel}>
            <a
              className="btn hero-bento__action-link"
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={githubLabel}
            >
              <TechIcon name="github" size={15} />
              <span>{ctaGithub}</span>
            </a>
            <a
              className="btn ghost hero-bento__action-link"
              href="https://www.linkedin.com/in/garcesnicolas/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Nicolas Duran Garces"
            >
              <TechIcon name="linkedin" size={15} />
              <span>{ctaLinkedIn}</span>
            </a>
            <a
              className="btn ghost hero-bento__action-link"
              href="/CV_NICOLAS_DURAN.pdf"
              download
              aria-label={downloadCV}
            >
              <FiDownload size={15} />
              <span>{ctaCV}</span>
            </a>
          </div>
        </motion.article>

      </div>
    </section>
  )
}
