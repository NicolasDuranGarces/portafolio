import { useEffect, useRef, useState } from 'react'
import { ui } from '../content/ui'
import { useActiveSection } from '../hooks/useActiveSection'
import { useTheme } from '../hooks/useTheme'
import { otherLang } from '../lib/lang'
import { homePath, pathOf, withLang, type PageRoute } from '../lib/routes'
import { MoonIcon, SunIcon } from './icons'

const navKeys = ['cases', 'experience', 'projects', 'about', 'contact'] as const
type NavKey = (typeof navKeys)[number]

/** Home sections watched for the active item. The stack section belongs to "experience". */
const homeSections = ['hero', 'cases', 'experience', 'stack', 'projects', 'about', 'contact'] as const
const noSections: readonly string[] = []
const navKeyOfSection: Record<string, NavKey | undefined> = {
  cases: 'cases',
  experience: 'experience',
  stack: 'experience',
  projects: 'projects',
  about: 'about',
  contact: 'contact',
}

const DESKTOP_QUERY = '(min-width: 48rem)'

type Props = { route: PageRoute }

export function Nav({ route }: Props) {
  const { lang } = route
  const copy = ui[lang]
  const other = otherLang(lang)
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const menu = useRef<HTMLElement>(null)

  const sectionId = useActiveSection(route.page === 'home' ? homeSections : noSections)
  const current: NavKey | undefined =
    route.page === 'home' ? navKeyOfSection[sectionId ?? ''] : route.page === 'case' ? 'cases' : undefined

  // While the full screen menu is open: lock scroll, make the page inert, close on Escape or when the layout turns desktop.
  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const covered = document.querySelectorAll('main, footer')
    const desktop = window.matchMedia(DESKTOP_QUERY)
    const close = () => setOpen(false)
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      close()
      menuButton.current?.focus()
    }

    root.style.overflow = 'hidden'
    // The overlay turns visible in the same commit, so wait one frame before it can take focus.
    const focusFrame = requestAnimationFrame(() => menu.current?.querySelector('a')?.focus())
    covered.forEach((element) => element.setAttribute('inert', ''))
    document.addEventListener('keydown', onKey)
    desktop.addEventListener('change', close)
    return () => {
      cancelAnimationFrame(focusFrame)
      root.style.overflow = ''
      covered.forEach((element) => element.removeAttribute('inert'))
      document.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', close)
    }
  }, [open])

  const links = navKeys.map((key) => ({
    key,
    href: homePath(lang, key),
    label: copy.nav[key],
    ariaCurrent: current === key ? (route.page === 'home' ? ('location' as const) : true) : undefined,
  }))

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4">
      <nav
        aria-label={copy.nav.label}
        className="pointer-events-auto relative z-50 mx-auto mt-6 flex w-max max-w-full items-center gap-1 rounded-full border border-line bg-canvas/70 p-2 backdrop-blur-xl"
      >
        <button
          ref={menuButton}
          type="button"
          className="control control-ghost md:hidden"
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? copy.nav.closeMenu : copy.nav.openMenu}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="burger" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          {copy.nav.menu}
        </button>

        <ul role="list" className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.key}>
              <a href={link.href} className="nav-link control control-ghost" aria-current={link.ariaCurrent}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={pathOf(withLang(route, other))}
          hrefLang={other}
          lang={other}
          className="control control-secondary"
        >
          <span aria-hidden="true">{copy.languageSwitch.short}</span>
          <span className="sr-only">{copy.languageSwitch.name}</span>
        </a>

        <button
          type="button"
          className="control control-icon control-secondary"
          aria-label={theme === 'dark' ? copy.theme.toLight : copy.theme.toDark}
          onClick={toggle}
        >
          {theme === 'dark' ? <SunIcon size={20} aria-hidden="true" /> : <MoonIcon size={20} aria-hidden="true" />}
        </button>
      </nav>

      <nav
        ref={menu}
        id="menu"
        aria-label={copy.nav.menu}
        className="menu-overlay pointer-events-auto md:hidden"
        data-open={open ? '' : undefined}
      >
        {links.map((link) => (
          <a
            key={link.key}
            href={link.href}
            aria-current={link.ariaCurrent}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
