import { useEffect, useRef, useState } from 'react'
import { homeSections } from '../content/sections'
import { ui } from '../content/ui'
import { useActiveSection } from '../hooks/useActiveSection'
import { homePath, type PageRoute } from '../lib/routes'
import { LanguageSwitch, ThemeToggle } from './Controls'

const navKeys = ['about', 'cases', 'experience', 'projects', 'contact'] as const
type NavKey = (typeof navKeys)[number]

const noSections: readonly string[] = []
/** The top nav is shorter than the section list: education and the stack belong to a neighbour. */
const navKeyOfSection: Record<string, NavKey | undefined> = {
  about: 'about',
  education: 'about',
  featured: 'cases',
  cases: 'cases',
  experience: 'experience',
  stack: 'experience',
  projects: 'projects',
  contact: 'contact',
}

const DESKTOP_QUERY = '(min-width: 48rem)'

type Props = { route: PageRoute }

export function Nav({ route }: Props) {
  const { lang } = route
  const copy = ui[lang]
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
    // On wide screens the home page carries its own side column with navigation, language and theme.
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-line bg-canvas ${route.page === 'home' ? 'lg:hidden' : ''}`}
    >
      <nav aria-label={copy.nav.label} className="wrap relative z-50 flex items-center gap-2 py-2">
        <button
          ref={menuButton}
          type="button"
          className="control control-ghost -ml-3 md:hidden"
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

        <ul role="list" className="hidden items-center gap-1 md:-ml-3 md:flex">
          {links.map((link) => (
            <li key={link.key}>
              <a href={link.href} className="nav-link control control-ghost" aria-current={link.ariaCurrent}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2">
          <LanguageSwitch route={route} />
          <ThemeToggle lang={lang} />
        </div>
      </nav>

      <nav
        ref={menu}
        id="menu"
        aria-label={copy.nav.menu}
        className="menu-overlay md:hidden"
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
