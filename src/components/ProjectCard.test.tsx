import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../test/test-utils'
import { ProjectCard } from './ProjectCard'
import type { ResolvedProject } from '../data/projects'
import userEvent from '@testing-library/user-event'

const mockProject: ResolvedProject = {
  slug: 'test-project',
  title: 'Test Project',
  description: 'This is a test project description',
  category: 'backend',
  tags: ['Python', 'FastAPI', 'Docker'],
  links: [
    { href: 'https://github.com/test', label: 'Code' },
    { href: 'https://demo.test', label: 'Demo' },
  ],
}

describe('ProjectCard', () => {
  it('should render project title and description', () => {
    const onOpen = vi.fn()
    render(<ProjectCard project={mockProject} onOpen={onOpen} />)

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Test Project')
    expect(screen.getByText('This is a test project description')).toBeInTheDocument()
  })

  it('should render all tags', () => {
    const onOpen = vi.fn()
    render(<ProjectCard project={mockProject} onOpen={onOpen} />)

    expect(screen.getByText('Python')).toBeInTheDocument()
    expect(screen.getByText('FastAPI')).toBeInTheDocument()
    expect(screen.getByText('Docker')).toBeInTheDocument()
  })

  it('should render all links with correct attributes', () => {
    const onOpen = vi.fn()
    render(<ProjectCard project={mockProject} onOpen={onOpen} />)

    const codeLink = screen.getByRole('link', { name: 'Code' })
    expect(codeLink).toHaveAttribute('href', 'https://github.com/test')
    expect(codeLink).toHaveAttribute('target', '_blank')
    expect(codeLink).toHaveAttribute('rel', 'noopener noreferrer')

    const demoLink = screen.getByRole('link', { name: 'Demo' })
    expect(demoLink).toHaveAttribute('href', 'https://demo.test')
  })

  it('should render details button', () => {
    const onOpen = vi.fn()
    render(<ProjectCard project={mockProject} onOpen={onOpen} />)

    const detailsButton = screen.getByRole('button', { name: 'Detalles' })
    expect(detailsButton).toBeInTheDocument()
  })

  it('should call onOpen when details button is clicked', async () => {
    const user = userEvent.setup()
    const onOpen = vi.fn()
    render(<ProjectCard project={mockProject} onOpen={onOpen} />)

    const detailsButton = screen.getByRole('button', { name: 'Detalles' })
    await user.click(detailsButton)

    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(onOpen).toHaveBeenCalledWith(mockProject)
  })

  it('should render without links if not provided', () => {
    const projectWithoutLinks: ResolvedProject = {
      ...mockProject,
      links: undefined,
    }
    const onOpen = vi.fn()
    render(<ProjectCard project={projectWithoutLinks} onOpen={onOpen} />)

    const links = screen.queryAllByRole('link')
    expect(links).toHaveLength(0)
  })

  it('should have correct article structure', () => {
    const onOpen = vi.fn()
    render(<ProjectCard project={mockProject} onOpen={onOpen} />)

    const article = screen.getByRole('article')
    expect(article).toBeInTheDocument()
    expect(article).toHaveClass('project-card', 'card', 'fancy', 'interactive')
  })

  it('should render project with empty tags array', () => {
    const projectWithNoTags: ResolvedProject = {
      ...mockProject,
      tags: [],
    }
    const onOpen = vi.fn()
    render(<ProjectCard project={projectWithNoTags} onOpen={onOpen} />)

    const badges = screen.queryAllByText(/^(Python|FastAPI|Docker)$/)
    expect(badges).toHaveLength(0)
  })
})
