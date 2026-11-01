import avatar from '../assets/avatar.webp'
import { Row, Section } from '../components/Section'
import { homeCopy } from '../content/home'
import { ui } from '../content/ui'
import type { Lang } from '../lib/lang'

export function About({ lang }: { lang: Lang }) {
  const copy = homeCopy[lang]

  return (
    <Section id="about" title={ui[lang].sections.about.title}>
      <Row
        label={
          <img
            src={avatar}
            width={576}
            height={720}
            alt={copy.hero.photoAlt}
            decoding="async"
            // React 18 only knows the lowercase attribute; this is the LCP candidate on wide screens, so never lazy.
            {...{ fetchpriority: 'high' }}
            className="h-auto w-32 object-cover"
          />
        }
      >
        <div className="max-w-prose space-y-3">
          {copy.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Row>
    </Section>
  )
}
