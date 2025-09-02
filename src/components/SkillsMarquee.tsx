import { TechIcon } from './TechIcon'

type Props = { items: string[] }

export function SkillsMarquee({ items }: Props) {
  const list = [...items, ...items]
  return (
    <div className="skills-marquee" aria-label="Skills marquee">
      <div className="skills-track">
        {list.map((it, i) => (
          <span key={`${it}-${i}`} className="tech-item">
            <TechIcon name={it} />
            <span>{it}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
