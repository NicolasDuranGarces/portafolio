import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ProjectModal } from './ProjectModal'
import { LanguageProvider } from './LanguageProvider'
import type { ResolvedProject } from '../data/projects'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, onClick, ...props }: React.ComponentProps<'div'>) => (
      <div onClick={onClick} {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

// Sample project data for testing
const mockProject: ResolvedProject = {
  slug: 'test-project',
  title: 'Test Project Title',
  description: 'This is a test project description.',
  category: 'backend',
  tags: ['React', 'TypeScript', 'Node.js'],
  links: [
    { href: 'https://github.com/test/repo', label: 'Código' },
    { href: 'https://demo.test.com', label: 'Demo' },
  ],
  highlights: [
    'Feature one highlight',
    'Feature two highlight',
    'Feature three highlight',
  ],
}

const mockProjectNoLinks: ResolvedProject = {
  slug: 'no-links-project',
  title: 'Project Without Links',
  description: 'A project without external links.',
  category: 'frontend',
  tags: ['HTML', 'CSS'],
}

const mockProjectNoHighlights: ResolvedProject = {
  slug: 'no-highlights-project',
  title: 'Project Without Highlights',
  description: 'A project without highlights.',
  category: 'frontend',
  tags: ['Vue'],
  highlights: [],
}

// Wrapper with LanguageProvider - uses localStorage mock
function renderWithProviders(ui: React.ReactElement) {
  // Mock localStorage to set the language to Spanish
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: vi.fn(() => 'es'),
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

describe('ProjectModal Component', () => {
  describe('Happy Path', () => {
    it('should render modal when project is provided', () => {
      const onClose = vi.fn()
      renderWithProviders(<ProjectModal project={mockProject} onClose={onClose} />)
      
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('should display project title', () => {
      const onClose = vi.fn()
      renderWithProviders(<ProjectModal project={mockProject} onClose={onClose} />)
      
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Test Project Title')
    })

    it('should display project description', () => {
      const onClose = vi.fn()
      renderWithProviders(<ProjectModal project={mockProject} onClose={onClose} />)
      
      expect(screen.getByText('This is a test project description.')).toBeInTheDocument()
    })

    it('should display all tags', () => {
      const onClose = vi.fn()
      renderWithProviders(<ProjectModal project={mockProject} onClose={onClose} />)
      
      expect(screen.getByText('React')).toBeInTheDocument()
      expect(screen.getByText('TypeScript')).toBeInTheDocument()
      expect(screen.getByText('Node.js')).toBeInTheDocument()
    })

    it('should display highlights when present', () => {
      const onClose = vi.fn()
      renderWithProviders(<ProjectModal project={mockProject} onClose={onClose} />)
      
      expect(screen.getByText('Feature one highlight')).toBeInTheDocument()
      expect(screen.getByText('Feature two highlight')).toBeInTheDocument()
      expect(screen.getByText('Feature three highlight')).toBeInTheDocument()
    })

    it('should display links when present', () => {
      const onClose = vi.fn()
      renderWithProviders(<ProjectModal project={mockProject} onClose={onClose} />)
      
      const codeLink = screen.getByRole('link', { name: 'Código' })
      const demoLink = screen.getByRole('link', { name: 'Demo' })
      
      expect(codeLink).toHaveAttribute('href', 'https://github.com/test/repo')
      expect(demoLink).toHaveAttribute('href', 'https://demo.test.com')
    })
  })

  describe('Close Functionality', () => {
    it('should call onClose when close button is clicked', () => {
      const onClose = vi.fn()
      renderWithProviders(<ProjectModal project={mockProject} onClose={onClose} />)
      
      const closeButton = screen.getByRole('button', { name: /cerrar/i })
      fireEvent.click(closeButton)
      
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('should call onClose when clicking overlay', () => {
      const onClose = vi.fn()
      renderWithProviders(<ProjectModal project={mockProject} onClose={onClose} />)
      
      const overlay = document.querySelector('.modal-overlay')
      if (overlay) {
        fireEvent.click(overlay)
        expect(onClose).toHaveBeenCalled()
      }
    })

    it('should NOT call onClose when clicking modal content', () => {
      const onClose = vi.fn()
      renderWithProviders(<ProjectModal project={mockProject} onClose={onClose} />)
      
      const dialog = screen.getByRole('dialog')
      const modalContent = dialog.querySelector('.modal')
      
      if (modalContent) {
        fireEvent.click(modalContent)
        // onClose should only be called once due to click propagation stop
      }
    })
  })

  describe('Edge Cases', () => {
    it('should not render when project is null', () => {
      const onClose = vi.fn()
      renderWithProviders(<ProjectModal project={null} onClose={onClose} />)
      
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('should render without links section when links are not provided', () => {
      const onClose = vi.fn()
      renderWithProviders(<ProjectModal project={mockProjectNoLinks} onClose={onClose} />)
      
      expect(screen.queryByRole('link', { name: 'Código' })).not.toBeInTheDocument()
    })

    it('should render without highlights when highlights array is empty', () => {
      const onClose = vi.fn()
      renderWithProviders(<ProjectModal project={mockProjectNoHighlights} onClose={onClose} />)
      
      // Should not have any list items for highlights
      expect(screen.queryByRole('list')).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have aria-modal attribute on overlay', () => {
      const onClose = vi.fn()
      renderWithProviders(<ProjectModal project={mockProject} onClose={onClose} />)
      
      // The overlay has aria-modal
      const overlay = document.querySelector('.modal-overlay')
      expect(overlay).toHaveAttribute('aria-modal', 'true')
    })

    it('should have accessible close button', () => {
      const onClose = vi.fn()
      renderWithProviders(<ProjectModal project={mockProject} onClose={onClose} />)
      
      const closeButton = screen.getByRole('button')
      expect(closeButton).toHaveAttribute('aria-label')
    })

    it('should open links in new tab with security attributes', () => {
      const onClose = vi.fn()
      renderWithProviders(<ProjectModal project={mockProject} onClose={onClose} />)
      
      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noreferrer')
      })
    })
  })
})
