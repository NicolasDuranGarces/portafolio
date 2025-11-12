import { TechIcon } from './TechIcon'
import { useLanguage } from './LanguageProvider'

type Props = { items: string[] }

export function SkillsMarquee({ items }: Props) {
  const { t } = useLanguage()
  const list = [...items, ...items]
  return (
    <div className="skills-marquee" aria-label={t('skills.marqueeAria')}>
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
