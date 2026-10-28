import { ui } from '../content/ui'
import type { Lang } from '../lib/lang'
import { pathOf } from '../lib/routes'
import { site } from '../lib/site'

export function Footer({ lang }: { lang: Lang }) {
  const copy = ui[lang].footer
  // The static HTML carries the build year; a later year on the client must not raise a hydration error.
  const year = new Date().getFullYear()

  return (
    <footer className="py-12">
      <div className="wrap flex flex-wrap items-center justify-between gap-4 text-sm text-ink-muted">
        <p>
          © <span suppressHydrationWarning>{year}</span> {site.name}. {copy.rights}
        </p>
        <a href={pathOf({ page: 'privacy', lang })} className="prose-link">
          {copy.privacy}
        </a>
      </div>
    </footer>
  )
}
