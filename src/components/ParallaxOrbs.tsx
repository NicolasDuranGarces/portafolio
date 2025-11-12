import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'

export function ParallaxOrbs() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])
  const sMx = useSpring(mx, { stiffness: 40, damping: 12 })
  const sMy = useSpring(my, { stiffness: 40, damping: 12 })
  const t1 = useTransform([sMx, sMy], ([x, y]: number[]) => `translate3d(${x * 30}px, ${y * 20}px, 0)`) // small parallax
  const t2 = useTransform([sMx, sMy], ([x, y]: number[]) => `translate3d(${x * -40}px, ${y * -30}px, 0)`)

  return (
    <div className="orbs" aria-hidden>
      <motion.div className="orb orb-a" style={{ transform: t1 }} />
      <motion.div className="orb orb-b" style={{ transform: t2 }} />
    </div>
  )
}
