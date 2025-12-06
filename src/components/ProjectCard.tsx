

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useCallback, useRef } from 'react'
import type { ResolvedProject } from '../data/projects'
import { useLanguage } from './LanguageProvider'
import { FiExternalLink } from 'react-icons/fi'

type Props = {
  project: ResolvedProject
  onOpen: (p: ResolvedProject) => void
}

export function ProjectCard({ project, onOpen }: Props) {
  const { t } = useLanguage()
  const { title, description, tags } = project
  const handleOpen = useCallback(() => onOpen(project), [onOpen, project])
  
  // 3D Tilt Logic
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className="project-card-3d-container"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.article 
        className="project-card-3d"
        style={{ rotateX, rotateY }}
        onClick={handleOpen}
      >
        <div className="project-image-wrapper">
          {/* Use a colored gradient placeholder if no image, or the actual thumb */}
          <div className="project-thumb project-image" style={{ background: `linear-gradient(135deg, ${colors(title)[0]}, ${colors(title)[1]})` }} />
        </div>
        
        <div className="project-content-3d">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <h3 className="text-gradient-primary" style={{ margin: 0, fontSize: '1.25rem' }}>{title}</h3>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <FiExternalLink style={{ fontSize: '1.2rem', color: 'var(--muted)' }} />
            </motion.div>
          </div>
          
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1rem' }}>
            {description}
          </p>

          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {tags.slice(0, 3).map(t => (
              <span key={t} className="badge" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>{t}</span>
            ))}
            {tags.length > 3 && (
              <span className="badge" style={{ opacity: 0.6, fontSize: '0.75rem' }}>+{tags.length - 3}</span>
            )}
          </div>
        </div>
      </motion.article>
    </motion.div>
  )
}

// Helper to generate consistent cool gradients based on title string
function colors(str: string) {
  const hash = str.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0)
  const c1 = `hsl(${hash % 360}, 70%, 60%)`
  const c2 = `hsl(${(hash + 40) % 360}, 70%, 50%)`
  return [c1, c2]
}
