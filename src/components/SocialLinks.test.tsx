import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SocialLinks } from './SocialLinks'

describe('SocialLinks Component', () => {
  describe('Happy Path', () => {
    it('should render GitHub link when provided', () => {
      render(<SocialLinks github="https://github.com/user" />)
      
      const link = screen.getByRole('link', { name: /github/i })
      expect(link).toHaveAttribute('href', 'https://github.com/user')
    })

    it('should render LinkedIn link when provided', () => {
      render(<SocialLinks linkedin="https://linkedin.com/in/user" />)
      
      const link = screen.getByRole('link', { name: /linkedin/i })
      expect(link).toHaveAttribute('href', 'https://linkedin.com/in/user')
    })

    it('should render Twitter link when provided', () => {
      render(<SocialLinks twitter="https://twitter.com/user" />)
      
      const link = screen.getByRole('link', { name: /twitter/i })
      expect(link).toHaveAttribute('href', 'https://twitter.com/user')
    })

    it('should render Email link with mailto: prefix', () => {
      render(<SocialLinks email="test@example.com" />)
      
      const link = screen.getByRole('link', { name: /email/i })
      expect(link).toHaveAttribute('href', 'mailto:test@example.com')
    })

    it('should render all links when all props provided', () => {
      render(
        <SocialLinks 
          github="https://github.com/user"
          linkedin="https://linkedin.com/in/user"
          twitter="https://twitter.com/user"
          email="test@example.com"
        />
      )
      
      expect(screen.getAllByRole('link')).toHaveLength(4)
    })
  })

  describe('Edge Cases', () => {
    it('should return null when no links provided', () => {
      const { container } = render(<SocialLinks />)
      
      expect(container.firstChild).toBeNull()
    })

    it('should only render provided links', () => {
      render(<SocialLinks github="https://github.com/user" />)
      
      expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument()
      expect(screen.queryByRole('link', { name: /linkedin/i })).not.toBeInTheDocument()
      expect(screen.queryByRole('link', { name: /twitter/i })).not.toBeInTheDocument()
      expect(screen.queryByRole('link', { name: /email/i })).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should open external links in new tab', () => {
      render(<SocialLinks github="https://github.com/user" />)
      
      const link = screen.getByRole('link', { name: /github/i })
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noreferrer')
    })

    it('should NOT open email links in new tab', () => {
      render(<SocialLinks email="test@example.com" />)
      
      const link = screen.getByRole('link', { name: /email/i })
      expect(link).not.toHaveAttribute('target')
    })
  })
})
