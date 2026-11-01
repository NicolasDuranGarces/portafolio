import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  title: string
  lead?: string
  children: ReactNode
}

/** Home page section: anchor target and labelled heading under a full width rule. */
export function Section({ id, title, lead, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="group pt-20 first:pt-10 lg:first:pt-0 lg:last-of-type:min-h-[70vh]">
      <h2
        id={`${id}-title`}
        className="border-t border-ink pt-4 text-3xl font-bold tracking-tight lg:group-first:border-t-0 lg:group-first:pt-0"
      >
        {title}
      </h2>
      {lead ? <p className="mt-2 max-w-xl text-ink-muted">{lead}</p> : null}
      <div className="mt-8">{children}</div>
    </section>
  )
}

/** A label and its body on a hairline: the shared shape of about, education, stack and projects. */
export function Row({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <div className="grid gap-2 border-t border-line py-4 last:border-b sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-4 lg:gap-6">
      <div>{label}</div>
      <div className="space-y-2">{children}</div>
    </div>
  )
}
