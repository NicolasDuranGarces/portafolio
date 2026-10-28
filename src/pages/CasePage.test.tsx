import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { caseSlugs, getCase } from '../content/cases'
import { langs } from '../lib/lang'
import { CasePage } from './CasePage'

const everyCase = caseSlugs.flatMap((slug) => langs.map((lang) => [slug, lang] as const))
const headings = {
  es: { role: 'Mi rol', decisions: 'Decisiones clave', difficulty: 'Qué lo hacía difícil', result: 'Resultado' },
  en: { role: 'My role', decisions: 'Key decisions', difficulty: 'What made it hard', result: 'Result' },
}

describe('CasePage', () => {
  it.each(everyCase)('%s (%s) reads as a case study of 300 to 600 words', (slug, lang) => {
    const { container } = render(<CasePage lang={lang} slug={slug} />)
    const words = (container.textContent ?? '').split(/\s+/).filter(Boolean).length
    expect(words).toBeGreaterThanOrEqual(300)
    expect(words).toBeLessThanOrEqual(600)
  })

  it.each(everyCase)('%s (%s) shows the role, the decisions with their reasons and the result', (slug, lang) => {
    render(<CasePage lang={lang} slug={slug} />)
    const text = getCase(slug).copy[lang]

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(text.title)
    for (const label of Object.values(headings[lang])) {
      expect(screen.getByRole('heading', { level: 2, name: label })).toBeInTheDocument()
    }
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(text.decisions.length)
    expect(screen.getByText(text.role)).toBeInTheDocument()
    expect(screen.getByText(text.result[0])).toBeInTheDocument()
  })

  it('offers a way back to the cases and an email to hire, in the page language', () => {
    const { rerender } = render(<CasePage lang="es" slug="bheex" />)
    expect(screen.getAllByRole('link', { name: 'Volver a casos' }).map((link) => link.getAttribute('href'))).toEqual([
      '/#cases',
      '/#cases',
    ])
    expect(screen.getByText('¿Buscas a alguien para algo así?')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Escríbeme' })).toHaveAttribute('href', 'mailto:niduga@outlook.es')

    rerender(<CasePage lang="en" slug="bheex" />)
    expect(screen.getAllByRole('link', { name: 'Back to cases' })[0]).toHaveAttribute('href', '/en/#cases')
  })

  it('states the confidentiality note only where a client stays anonymous', () => {
    const { rerender } = render(<CasePage lang="es" slug="price-match-automation" />)
    expect(screen.getByText('Detalles de clientes y código reservados por confidencialidad.')).toBeInTheDocument()

    rerender(<CasePage lang="es" slug="quindio-inteligente-iot" />)
    expect(screen.queryByText(/confidencialidad/)).not.toBeInTheDocument()
  })

  it('links the product only on the case where the site is live', () => {
    render(<CasePage lang="es" slug="bheex" />)
    const link = screen.getByRole('link', { name: /Ver el sitio de Bheex/ })
    expect(link).toHaveAttribute('href', 'https://www.bheex.com/')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('lists the stack as chips', () => {
    render(<CasePage lang="en" slug="quindio-inteligente-iot" />)
    const stack = screen.getByRole('heading', { level: 2, name: 'Stack' }).parentElement!
    expect(within(stack).getAllByRole('listitem').map((item) => item.textContent)).toEqual([
      'AWS Lambda',
      'Docker',
      'Python',
      'MQTT',
      'Mosquitto',
    ])
  })
})
