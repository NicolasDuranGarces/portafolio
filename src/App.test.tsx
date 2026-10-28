import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { App } from './App'

describe('App shell', () => {
  it('lets keyboard users skip the navigation: first Tab lands on the skip link that targets main', async () => {
    const user = userEvent.setup()
    render(<App route={{ page: 'home', lang: 'en' }} />)

    await user.tab()
    const skip = screen.getByRole('link', { name: 'Skip to content' })
    expect(skip).toHaveFocus()
    expect(skip).toHaveAttribute('href', '#main')
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main')
  })

  it('renders exactly one h1 per page and keeps nav and footer around the content', () => {
    const { rerender } = render(<App route={{ page: 'case', lang: 'es', slug: 'bheex' }} />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('navigation', { name: 'Navegación principal' })).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()

    rerender(<App route={{ page: 'privacy', lang: 'en' }} />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Privacy')
  })

  it('links the footer to the privacy page of the same language', () => {
    const { rerender } = render(<App route={{ page: 'home', lang: 'es' }} />)
    expect(screen.getByRole('link', { name: 'Privacidad' })).toHaveAttribute('href', '/privacidad/')

    rerender(<App route={{ page: 'home', lang: 'en' }} />)
    expect(screen.getByRole('link', { name: 'Privacy' })).toHaveAttribute('href', '/en/privacy/')
  })

  it('shows the same bilingual 404 for any missing URL, with a way home in each language', () => {
    render(<App route={{ page: 'notFound' }} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Página no encontrada Page not found')
    expect(screen.getByRole('link', { name: 'Volver al inicio' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', '/en/')
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
  })

  it('uses the current year in the footer', () => {
    render(<App route={{ page: 'home', lang: 'es' }} />)
    expect(screen.getByRole('contentinfo')).toHaveTextContent(`© ${new Date().getFullYear()} Nicolás Durán Garcés`)
  })
})
