import { Section } from '../components/Section'
import { homeCopy } from '../content/home'
import { ui } from '../content/ui'
import type { Lang } from '../lib/lang'

export function About({ lang }: { lang: Lang }) {
  const copy = homeCopy[lang].about

  return (
    <Section id="about" title={ui[lang].sections.about.title}>
      <div className="grid gap-12 md:grid-cols-2">
        <div data-reveal className="space-y-6 text-lg">
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div data-reveal data-delay="1" className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold">{copy.educationTitle}</h3>
            <ul role="list" className="mt-4 space-y-4">
              {copy.education.map((item) => (
                <li key={item.name}>
                  <p className="text-base font-medium">{item.name}</p>
                  <p className="text-sm text-ink-muted">
                    {item.place} · {item.period}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">{copy.certificationsTitle}</h3>
            <ul role="list" className="mt-4 space-y-4">
              {copy.certifications.map((item) => (
                <li key={item.name}>
                  <p className="text-base font-medium">{item.name}</p>
                  <p className="text-sm text-ink-muted">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">{copy.platziLabel}</h3>
            <div className="mt-4 space-y-6">
              {copy.platzi.map((group) => (
                <div key={group.topic}>
                  <h4 className="text-sm text-ink-muted">{group.topic}</h4>
                  <ul role="list" className="mt-2 space-y-2 text-base">
                    {group.courses.map((course) => (
                      <li key={course.name}>
                        {course.name}
                        {course.date ? <span className="text-ink-muted"> · {course.date}</span> : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">{copy.languagesTitle}</h3>
            <ul role="list" className="mt-4 space-y-2 text-base">
              {copy.languages.map((item) => (
                <li key={item.name}>
                  <span className="font-medium">{item.name}</span>
                  <span className="text-ink-muted"> ({item.level})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}
