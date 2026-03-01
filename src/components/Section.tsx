import { motion, type Variants } from 'framer-motion'

const variants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

type Props = {
  id: string
  title: string
  lead?: string
  children: React.ReactNode
}

export function Section({ id, title, lead, children }: Props) {
  const headingId = `${id}-title`

  return (
    <section id={id} className="section container" aria-labelledby={headingId}>
      <motion.header initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={variants}>
        <h2 id={headingId}>{title}</h2>
        {lead && <p className="lead">{lead}</p>}
      </motion.header>
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={variants}>
        {children}
      </motion.div>
    </section>
  )
}
