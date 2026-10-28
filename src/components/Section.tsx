import type { ReactNode } from 'react'

type Props = {
  id: string
  title: string
  lead?: string
  children: ReactNode
}

/** Home page section: anchor target, labelled heading and a reveal wrapper around the intro. */
export function Section({ id, title, lead, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-20 md:py-24">
      <div className="wrap">
        <header data-reveal className="max-w-[680px]">
          <h2 id={`${id}-title`} className="text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>
          {lead ? <p className="mt-4 text-lg text-ink-muted">{lead}</p> : null}
        </header>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  )
}
