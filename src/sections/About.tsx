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
            <ul role="list" className="mt-4 space-y-2 text-base">
              {copy.certifications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-base">
              <span className="font-medium">{copy.platziLabel}: </span>
              <span className="text-ink-muted">{copy.platzi.join(', ')}</span>
            </p>
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
