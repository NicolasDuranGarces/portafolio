import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { MockIntersectionObserver } from '../test/intersection'
import type { PageRoute } from '../lib/routes'
import { Nav } from './Nav'

const home: PageRoute = { page: 'home', lang: 'es' }

function renderNav(route: PageRoute = home) {
  return render(
    <>
      <Nav route={route} />
      <main>
        <section id="cases" />
        <section id="experience" />
        <section id="stack" />
      </main>
    </>,
  )
}

function desktopLinks() {
  return within(screen.getByRole('navigation', { name: /navegaci|main nav/i })).getAllByRole('link')
}

describe('Nav language switch', () => {
  it.each<[PageRoute, string, string]>([
    [{ page: 'home', lang: 'es' }, 'English', '/en/'],
    [{ page: 'home', lang: 'en' }, 'Español', '/'],
    [{ page: 'case', lang: 'es', slug: 'bheex' }, 'English', '/en/cases/bheex/'],
    [{ page: 'case', lang: 'en', slug: 'quindio-inteligente-iot' }, 'Español', '/casos/quindio-inteligente-iot/'],
    [{ page: 'privacy', lang: 'es' }, 'English', '/en/privacy/'],
  ])('on %o links to the same page in the other language', (route, name, href) => {
    renderNav(route)
    const link = screen.getByRole('link', { name })
    expect(link).toHaveAttribute('href', href)
    expect(link).toHaveAttribute('hreflang', route.lang === 'es' ? 'en' : 'es')
  })
})

describe('Nav theme toggle', () => {
  it('switches the theme, remembers it and offers the way back', async () => {
    const user = userEvent.setup()
    renderNav()

    await user.click(screen.getByRole('button', { name: 'Cambiar a tema oscuro' }))
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(localStorage.getItem('theme')).toBe('dark')

    await user.click(screen.getByRole('button', { name: 'Cambiar a tema claro' }))
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('starts from the choice already applied to the page', () => {
    document.documentElement.setAttribute('data-theme', 'dark')
    renderNav()
    expect(screen.getByRole('button', { name: 'Cambiar a tema claro' })).toBeInTheDocument()
  })
})

describe('Nav active item', () => {
  it('marks the section being read, and the stack as part of experience', () => {
    renderNav()
    expect(desktopLinks().filter((link) => link.hasAttribute('aria-current'))).toHaveLength(0)

    const observer = MockIntersectionObserver.instances.find((candidate) =>
      candidate.observed.has(document.getElementById('cases')!),
    )!
    act(() => observer.report(document.getElementById('cases')!, { isIntersecting: true }))
    expect(screen.getAllByRole('link', { name: 'Casos' })[0]).toHaveAttribute('aria-current', 'location')

    act(() => observer.report(document.getElementById('stack')!, { isIntersecting: true }))
    expect(screen.getAllByRole('link', { name: 'Experiencia' })[0]).toHaveAttribute('aria-current', 'location')
    expect(screen.getAllByRole('link', { name: 'Casos' })[0]).not.toHaveAttribute('aria-current')
  })

  it('marks Casos as current on a case page', () => {
    renderNav({ page: 'case', lang: 'en', slug: 'bheex' })
    expect(screen.getAllByRole('link', { name: 'Cases' })[0]).toHaveAttribute('aria-current', 'true')
  })

  it('links every item to its home section in the page language', () => {
    renderNav({ page: 'case', lang: 'en', slug: 'bheex' })
    expect(screen.getAllByRole('link', { name: 'Experience' })[0]).toHaveAttribute('href', '/en/#experience')
  })
})

describe('Nav mobile menu', () => {
  it('opens as a modal layer, locks the page behind it and closes with Escape', async () => {
    const user = userEvent.setup()
    renderNav()
    const toggle = screen.getByRole('button', { name: 'Abrir menú' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(toggle).toHaveAccessibleName('Cerrar menú')
    expect(document.querySelector('main')).toHaveAttribute('inert')
    expect(document.documentElement.style.overflow).toBe('hidden')
    expect(screen.getByRole('navigation', { name: 'Menú' })).toBe(document.getElementById('menu'))
    await waitFor(() => expect(within(document.getElementById('menu')!).getAllByRole('link')[0]).toHaveFocus())

    await user.keyboard('{Escape}')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(document.querySelector('main')).not.toHaveAttribute('inert')
    expect(document.documentElement.style.overflow).toBe('')
    expect(toggle).toHaveFocus()
  })

  it('closes after choosing a section', async () => {
    const user = userEvent.setup()
    renderNav()
    await user.click(screen.getByRole('button', { name: 'Abrir menú' }))
    const menu = document.getElementById('menu')!
    fireEvent.click(within(menu).getByRole('link', { name: 'Proyectos' }))
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute('aria-expanded', 'false')
  })
})
