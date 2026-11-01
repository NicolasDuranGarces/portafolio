import { ui } from '../content/ui'
import { useTheme } from '../hooks/useTheme'
import { otherLang } from '../lib/lang'
import { pathOf, withLang, type PageRoute } from '../lib/routes'
import { MoonIcon, SunIcon } from './icons'

/** Link to the same page in the other language. */
export function LanguageSwitch({ route }: { route: PageRoute }) {
  const copy = ui[route.lang]
  const other = otherLang(route.lang)

  return (
    <a href={pathOf(withLang(route, other))} hrefLang={other} lang={other} className="control control-icon control-secondary">
      <span aria-hidden="true">{copy.languageSwitch.short}</span>
      <span className="sr-only">{copy.languageSwitch.name}</span>
    </a>
  )
}

export function ThemeToggle({ lang }: { lang: PageRoute['lang'] }) {
  const copy = ui[lang]
  const { theme, toggle } = useTheme()

  return (
    <button
      type="button"
      className="control control-icon control-secondary"
      aria-label={theme === 'dark' ? copy.theme.toLight : copy.theme.toDark}
      onClick={toggle}
    >
      {theme === 'dark' ? <SunIcon size={20} aria-hidden="true" /> : <MoonIcon size={20} aria-hidden="true" />}
    </button>
  )
}
