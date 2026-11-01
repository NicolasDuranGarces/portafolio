import { act, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { caseSlugs } from '../content/cases'
import { experience } from '../content/experience'
import { homeSections } from '../content/sections'
import { techGroups } from '../content/stack'
import { MockIntersectionObserver } from '../test/intersection'
import { HomePage } from './HomePage'

const sideOf = (container: HTMLElement) => container.querySelector('header#top')!

describe('HomePage side column', () => {
  it('carries the name as the one h1, then role, statement and proof', () => {
    const { container } = render(<HomePage lang="es" />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    const side = within(sideOf(container) as HTMLElement)
    expect(side.getByRole('heading', { level: 1 })).toHaveTextContent('Nicolás Durán Garcés')
    expect(side.getByText('Ingeniero backend e IA.')).toBeInTheDocument()
    expect(side.getByText(/Armenia, Colombia/)).toBeInTheDocument()
  })

  it('lists the organizations once and skips the anonymous ones', () => {
    const { container } = render(<HomePage lang="en" />)
    const worked = within(sideOf(container) as HTMLElement).getByText('Has worked with').nextElementSibling!
    const names = worked.textContent!.split(', ')
    expect(new Set(names).size).toBe(names.length)
    expect(names).toEqual(['Bheex', 'BetterWay Devs', 'Grupo de Innovación EAM', 'Institución Universitaria EAM', 'Atlanticsoft'])
    expect(worked.textContent).not.toMatch(/Independent|Software company/)
  })

  it('shows 8 core technologies and links to the full stack', () => {
    const { container } = render(<HomePage lang="es" />)
    const side = within(sideOf(container) as HTMLElement)
    const list = side.getByText('Tecnologías principales').nextElementSibling!.querySelector('ul')!
    expect(list.querySelectorAll('li')).toHaveLength(8)
    expect(list.querySelectorAll('svg[aria-hidden="true"]').length).toBeGreaterThan(5)
    expect(side.getByRole('link', { name: /Ver todo el stack/ })).toHaveAttribute('href', '#stack')
  })

  it('serves the CV of its language, plus email, LinkedIn and GitHub', () => {
    const { container, rerender } = render(<HomePage lang="es" />)
    let side = within(sideOf(container) as HTMLElement)
    expect(side.getByRole('link', { name: /Descargar CV/ })).toHaveAttribute('href', '/cv/nicolas-duran-garces-cv-es.pdf')
    expect(side.getByRole('link', { name: /Descargar CV/ })).toHaveAttribute('download')
    expect(side.getByRole('link', { name: 'niduga@outlook.es' })).toHaveAttribute('href', 'mailto:niduga@outlook.es')
    expect(side.getByRole('link', { name: /LinkedIn/ })).toHaveAttribute('target', '_blank')
    expect(side.getByRole('link', { name: /GitHub/ })).toHaveAttribute('rel', 'noopener noreferrer')

    rerender(<HomePage lang="en" />)
    side = within(sideOf(container) as HTMLElement)
    expect(side.getByRole('link', { name: /Download resume/ })).toHaveAttribute('href', '/cv/nicolas-duran-garces-resume-en.pdf')
  })

  it('has the language switch and theme toggle of the top nav, with the same names', () => {
    const { container } = render(<HomePage lang="es" />)
    const side = within(sideOf(container) as HTMLElement)
    expect(side.getByRole('link', { name: 'English' })).toHaveAttribute('href', '/en/')
    expect(side.getByRole('button', { name: 'Cambiar a tema oscuro' })).toBeInTheDocument()
  })
})

describe('HomePage sections', () => {
  it('renders every section in order with English ids and a labelled heading', () => {
    const { container } = render(<HomePage lang="es" />)
    const sections = [...container.querySelectorAll('main section')]
    expect(sections.map((section) => section.id)).toEqual([...homeSections])
    for (const section of sections) {
      const title = document.getElementById(section.getAttribute('aria-labelledby')!)
      expect(title?.tagName).toBe('H2')
    }
  })

  it('shows the portrait sized, described and never lazy', () => {
    render(<HomePage lang="es" />)
    const photo = screen.getByRole('img', { name: 'Retrato de Nicolás Durán Garcés' })
    expect(photo).toHaveAttribute('width', '576')
    expect(photo).toHaveAttribute('height', '720')
    expect(photo).toHaveAttribute('fetchpriority', 'high')
    expect(photo).not.toHaveAttribute('loading')
  })

  it('features the Bheex case and links every other case from a row', () => {
    const { container } = render(<HomePage lang="en" />)
    const featured = within(container.querySelector('#featured') as HTMLElement)
    expect(featured.getByRole('link', { name: 'Bheex: AI customer service SaaS' })).toHaveAttribute('href', '/en/cases/bheex/')
    for (const label of ['Problem', 'My role', 'Key decision', 'Result', 'Stack']) {
      expect(featured.getByText(label)).toBeInTheDocument()
    }
    expect(featured.getByRole('link', { name: /Visit the Bheex site/ })).toHaveAttribute('href', 'https://www.bheex.com/')

    const rows = [...container.querySelectorAll('#cases li.row-link')]
    expect(rows).toHaveLength(caseSlugs.length - 1)
    for (const slug of caseSlugs.filter((slug) => slug !== 'bheex')) {
      expect(container.querySelectorAll(`#cases a[href="/en/cases/${slug}/"]`)).toHaveLength(1)
    }
  })

  it('groups the trajectory by start year and marks the first role as current', () => {
    const { container } = render(<HomePage lang="es" />)
    const years = [...container.querySelectorAll('.track-year')].map((year) => year.textContent)
    expect(years).toEqual([...new Set(years)])
    expect(container.querySelectorAll('[data-entry]')).toHaveLength(experience.length)
    expect(container.querySelector('[data-entry][data-active]')).toHaveAttribute('data-entry', experience[0].id)
  })

  it('shows the whole catalog with every technology name', () => {
    const { container } = render(<HomePage lang="en" />)
    const stack = within(container.querySelector('#stack') as HTMLElement)
    for (const group of techGroups) {
      expect(stack.getByRole('heading', { level: 3, name: group.title.en })).toBeInTheDocument()
    }
    expect(stack.getByText('OpenAI API')).toBeInTheDocument()
    expect(stack.getByText('Chrome extensions')).toBeInTheDocument()
    expect(stack.getByText('Playwright')).toBeInTheDocument()
  })
})

describe('HomePage reading state', () => {
  const observerOf = (target: Element) => MockIntersectionObserver.watching(target)[0]

  it('marks the section crossing the band in the side nav, starting with the first', () => {
    const { container } = render(<HomePage lang="es" />)
    const nav = within(container.querySelector('header#top nav') as HTMLElement)
    expect(nav.getAllByRole('link')).toHaveLength(homeSections.length)
    expect(nav.getByRole('link', { name: 'Sobre mí' })).toHaveAttribute('aria-current', 'location')

    const stack = document.getElementById('stack')!
    act(() => observerOf(stack).report(stack, { isIntersecting: true }))
    expect(nav.getByRole('link', { name: 'Stack' })).toHaveAttribute('aria-current', 'location')
    expect(nav.getByRole('link', { name: 'Sobre mí' })).not.toHaveAttribute('aria-current')
  })

  it('shows the year and organization of the role under the band, only while the trajectory is in view', () => {
    const { container } = render(<HomePage lang="es" />)
    const now = container.querySelector('.now')!
    const track = container.querySelector('[data-track]')!
    expect(now).not.toHaveAttribute('data-live')
    expect(now).toHaveTextContent(`2026Bheex (empresa propia)`)

    act(() => observerOf(track).report(track, { isIntersecting: true }))
    expect(now).toHaveAttribute('data-live')

    const entries = container.querySelectorAll<HTMLElement>('[data-entry]')
    const last = entries[entries.length - 1]
    act(() => observerOf(last).report(last, { isIntersecting: true }))
    expect(now).toHaveTextContent(last.dataset.year!)
    expect(now).toHaveTextContent(last.dataset.org!)
    expect(last).toHaveAttribute('data-active')

    act(() => observerOf(track).report(track, { isIntersecting: false, top: -500 }))
    expect(now).not.toHaveAttribute('data-live')
  })

  it('settles on the last role after a jump past the trajectory, and on the first one after a jump above it', () => {
    const { container } = render(<HomePage lang="en" />)
    const now = container.querySelector('.now')!
    const track = container.querySelector('[data-track]')!
    const entries = container.querySelectorAll<HTMLElement>('[data-entry]')
    const last = entries[entries.length - 1]

    // No entry crossed the band: the position of the whole trajectory decides.
    act(() => observerOf(track).report(track, { isIntersecting: false, top: -2000 }))
    expect(now).toHaveTextContent(last.dataset.year!)
    expect(now).toHaveTextContent(last.dataset.org!)
    expect(now).not.toHaveTextContent('Bheex')

    act(() => observerOf(track).report(track, { isIntersecting: false, top: 800 }))
    expect(now).toHaveTextContent('Bheex (own company)')
  })
})
