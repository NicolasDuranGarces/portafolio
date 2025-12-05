import { describe, it, expect } from 'vitest'
import { render, screen } from '../test/test-utils'
import { Section } from './Section'

describe('Section', () => {
  it('should render section with id', () => {
    const { container } = render(
      <Section id="test-section" title="Test Title">
        <p>Content</p>
      </Section>
    )

    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
    expect(section).toHaveAttribute('id', 'test-section')
  })

  it('should render title correctly', () => {
    render(
      <Section id="test" title="My Section Title">
        <p>Content</p>
      </Section>
    )

    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent('My Section Title')
  })

  it('should render lead text when provided', () => {
    render(
      <Section id="test" title="Title" lead="This is the lead text">
        <p>Content</p>
      </Section>
    )

    expect(screen.getByText('This is the lead text')).toBeInTheDocument()
  })

  it('should not render lead text when not provided', () => {
    const { container } = render(
      <Section id="test" title="Title">
        <p>Content</p>
      </Section>
    )

    const leadParagraph = container.querySelector('.lead')
    expect(leadParagraph).not.toBeInTheDocument()
  })

  it('should render children content', () => {
    render(
      <Section id="test" title="Title">
        <div data-testid="child-content">Child element</div>
      </Section>
    )

    expect(screen.getByTestId('child-content')).toBeInTheDocument()
    expect(screen.getByText('Child element')).toBeInTheDocument()
  })

  it('should have correct className on section', () => {
    const { container } = render(
      <Section id="test" title="Title">
        <p>Content</p>
      </Section>
    )

    const section = container.querySelector('section')
    expect(section).toHaveClass('section', 'container')
  })
})
