import { Row, Section } from '../components/Section'
import { homeCopy } from '../content/home'
import { ui } from '../content/ui'
import type { Lang } from '../lib/lang'

function Title({ children }: { children: string }) {
  return <h3 className="font-bold">{children}</h3>
}

/** One entry: bold name over a muted detail line. */
function Entry({ name, detail }: { name: string; detail?: string }) {
  return (
    <li>
      <span className="font-bold">{name}</span>
      {detail ? <span className="block text-sm text-ink-muted">{detail}</span> : null}
    </li>
  )
}

export function Education({ lang }: { lang: Lang }) {
  const copy = homeCopy[lang].about

  return (
    <Section id="education" title={ui[lang].sections.education.title}>
      <Row label={<Title>{copy.educationTitle}</Title>}>
        <ul role="list" className="space-y-2">
          {copy.education.map((item) => (
            <Entry key={item.name} name={item.name} detail={`${item.place}, ${item.period}`} />
          ))}
        </ul>
      </Row>
      <Row label={<Title>{copy.certificationsTitle}</Title>}>
        <ul role="list" className="space-y-2">
          {copy.certifications.map((item) => (
            <Entry key={item.name} name={item.name} detail={item.detail} />
          ))}
        </ul>
      </Row>
      <Row label={<Title>{copy.platziLabel}</Title>}>
        <div className="space-y-6">
          {copy.platzi.map((group) => (
            <div key={group.topic}>
              <h4 className="mb-2 text-sm font-bold text-ink-muted">{group.topic}</h4>
              <ul role="list" className="space-y-2">
                {group.courses.map((course) => (
                  <Entry key={course.name} name={course.name} detail={course.date} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Row>
      <Row label={<Title>{copy.languagesTitle}</Title>}>
        <ul role="list" className="space-y-2">
          {copy.languages.map((item) => (
            <Entry key={item.name} name={item.name} detail={item.level} />
          ))}
        </ul>
      </Row>
    </Section>
  )
}
