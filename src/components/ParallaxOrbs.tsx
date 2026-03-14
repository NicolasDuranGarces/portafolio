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
  const t1 = useTransform([sMx, sMy], ([x, y]: number[]) => `translate3d(${x * 36}px, ${y * 24}px, 0)`)
  const t2 = useTransform([sMx, sMy], ([x, y]: number[]) => `translate3d(${x * -44}px, ${y * -34}px, 0)`)
  const t3 = useTransform([sMx, sMy], ([x, y]: number[]) => `translate3d(${x * 18}px, ${y * -20}px, 0)`)
  const t4 = useTransform([sMx, sMy], ([x, y]: number[]) => `translate3d(${x * -22}px, ${y * 28}px, 0)`)

  return (
    <div className="orbs" aria-hidden>
      <motion.div className="orb orb-a" style={{ transform: t1 }} />
      <motion.div className="orb orb-b" style={{ transform: t2 }} />
      <motion.div className="orb orb-c" style={{ transform: t3 }} />
      <motion.div className="orb orb-d" style={{ transform: t4 }} />
    </div>
  )
}
