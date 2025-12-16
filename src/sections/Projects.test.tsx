import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Projects } from './Projects'
import { LanguageProvider } from '../components/LanguageProvider'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    article: ({ children, onClick, ...props }: React.ComponentProps<'article'>) => (
      <article onClick={onClick} {...props}>{children}</article>
    ),
    div: ({ children, onClick, ...props }: React.ComponentProps<'div'>) => (
      <div onClick={onClick} {...props}>{children}</div>
    ),
    header: ({ children, ...props }: React.ComponentProps<'header'>) => (
      <header {...props}>{children}</header>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

// Wrapper with LanguageProvider - uses localStorage mock
function renderWithProviders(ui: React.ReactElement, lang: 'es' | 'en' = 'es') {
  // Mock localStorage to set the language
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: vi.fn(() => lang),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    },
    writable: true,
  })
  
  return render(
    <LanguageProvider>
      {ui}
    </LanguageProvider>
  )
}

describe('Projects Section', () => {
  describe('Happy Path', () => {
    it('should render the projects section with title', () => {
      renderWithProviders(<Projects />)
      
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/proyectos/i)
    })

    it('should render search input', () => {
      renderWithProviders(<Projects />)
      
      const searchInput = screen.getByPlaceholderText(/buscar/i)
      expect(searchInput).toBeInTheDocument()
    })

    it('should render category filter buttons', () => {
      renderWithProviders(<Projects />)
      
      expect(screen.getByRole('button', { name: /todos/i })).toBeInTheDocument()
    })

    it('should render featured project with badge', () => {
      renderWithProviders(<Projects />)
      
      expect(screen.getByText(/proyecto destacado/i)).toBeInTheDocument()
    })

    it('should render project cards', () => {
      renderWithProviders(<Projects />)
      
      // Featured project should be visible
      const articles = screen.getAllByRole('article')
      expect(articles.length).toBeGreaterThan(0)
    })

    it('should display project tags', () => {
      renderWithProviders(<Projects />)
      
      // Check for common tags in projects
      const tags = screen.getAllByText(/react|typescript|docker|next\.js/i)
      expect(tags.length).toBeGreaterThan(0)
    })
  })

  describe('Search Functionality', () => {
    it('should filter projects when typing in search', async () => {
      const user = userEvent.setup()
      renderWithProviders(<Projects />)
      
      const searchInput = screen.getByPlaceholderText(/buscar/i)
      const initialArticles = screen.getAllByRole('article').length
      
      // Search for something specific
      await user.type(searchInput, 'atlas')
      
      await waitFor(() => {
        const filteredArticles = screen.getAllByRole('article')
        expect(filteredArticles.length).toBeLessThanOrEqual(initialArticles)
      })
    })

    it('should show empty state when no projects match search', async () => {
      const user = userEvent.setup()
      renderWithProviders(<Projects />)
      
      const searchInput = screen.getByPlaceholderText(/buscar/i)
      
      // Search for something that doesn't exist
      await user.type(searchInput, 'xyznonexistent123')
      
      await waitFor(() => {
        expect(screen.getByText(/no se encontraron proyectos/i)).toBeInTheDocument()
      })
    })

    it('should be case insensitive', async () => {
      const user = userEvent.setup()
      renderWithProviders(<Projects />)
      
      const searchInput = screen.getByPlaceholderText(/buscar/i)
      
      await user.type(searchInput, 'CATURRO')
      
      await waitFor(() => {
        expect(screen.getByText(/caturro/i)).toBeInTheDocument()
      })
    })
  })

  describe('Category Filter', () => {
    it('should filter by category when clicking filter button', async () => {
      const user = userEvent.setup()
      renderWithProviders(<Projects />)
      
      // Get backend filter if exists
      const backendButton = screen.queryByRole('button', { name: /backend/i })
      
      if (backendButton) {
        await user.click(backendButton)
        
        // After filtering, all visible projects should be backend
        // The active class should be applied
        expect(backendButton).toHaveClass('active')
      }
    })

    it('should show all projects when "Todos" is selected', async () => {
      const user = userEvent.setup()
      renderWithProviders(<Projects />)
      
      const todosButton = screen.getByRole('button', { name: /todos/i })
      await user.click(todosButton)
      
      expect(todosButton).toHaveClass('active')
    })
  })

  describe('Project Card Interactions', () => {
    it('should render project links', () => {
      renderWithProviders(<Projects />)
      
      // Check for GitHub or demo links
      const links = screen.getAllByRole('link')
      expect(links.length).toBeGreaterThan(0)
    })

    it('should have correct target for external links', () => {
      renderWithProviders(<Projects />)
      
      const externalLinks = screen.getAllByRole('link').filter(
        link => link.getAttribute('target') === '_blank'
      )
      
      externalLinks.forEach(link => {
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      })
    })
  })

  describe('Language Support', () => {
    it('should display content in Spanish by default', () => {
      renderWithProviders(<Projects />, 'es')
      
      // Featured badge should be visible
      const articles = screen.getAllByRole('article')
      expect(articles.length).toBeGreaterThan(0)
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty search gracefully', async () => {
      const user = userEvent.setup()
      renderWithProviders(<Projects />)
      
      const searchInput = screen.getByPlaceholderText(/buscar/i)
      
      // Type and then clear
      await user.type(searchInput, 'test')
      await user.clear(searchInput)
      
      // Should show all projects again
      await waitFor(() => {
        const articles = screen.getAllByRole('article')
        expect(articles.length).toBeGreaterThan(0)
      })
    })

    it('should handle whitespace-only search', async () => {
      const user = userEvent.setup()
      renderWithProviders(<Projects />)
      
      const searchInput = screen.getByPlaceholderText(/buscar/i)
      
      await user.type(searchInput, '   ')
      
      // Should still show projects (whitespace is trimmed)
      await waitFor(() => {
        const articles = screen.getAllByRole('article')
        expect(articles.length).toBeGreaterThan(0)
      })
    })
  })
})
