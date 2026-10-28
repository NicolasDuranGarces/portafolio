import { Section } from '../components/Section'
import { stackGroups } from '../content/stack'
import { ui } from '../content/ui'
import type { Lang } from '../lib/lang'

export function Stack({ lang }: { lang: Lang }) {
  const copy = ui[lang].sections.stack

  return (
    <Section id="stack" title={copy.title} lead={copy.lead}>
      <ul role="list" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stackGroups.map((group) => (
          <li key={group.id} data-reveal>
            <div className="card h-full rounded-2xl p-6">
              <h3 className="text-lg font-semibold">{group.title[lang]}</h3>
              <ul role="list" className="mt-4 space-y-2 text-base">
                {group.items.map((item) => (
                  <li key={item.name[lang]}>
                    {item.name[lang]}
                    {item.detail ? <span className="text-ink-muted"> ({item.detail[lang]})</span> : null}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
