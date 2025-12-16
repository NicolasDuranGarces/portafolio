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

  it('should render up to 3 tags', () => {
    const onOpen = vi.fn()
    render(<ProjectCard project={mockProject} onOpen={onOpen} />)

    expect(screen.getByText('Python')).toBeInTheDocument()
    expect(screen.getByText('FastAPI')).toBeInTheDocument()
    expect(screen.getByText('Docker')).toBeInTheDocument()
  })

  it('should show tag overflow indicator when more than 3 tags', () => {
    const onOpen = vi.fn()
    const projectWithManyTags: ResolvedProject = {
      ...mockProject,
      tags: ['Python', 'FastAPI', 'Docker', 'Redis', 'PostgreSQL'],
    }
    render(<ProjectCard project={projectWithManyTags} onOpen={onOpen} />)

    expect(screen.getByText('+2')).toBeInTheDocument()
  })

  it('should call onOpen when article is clicked', async () => {
    const user = userEvent.setup()
    const onOpen = vi.fn()
    render(<ProjectCard project={mockProject} onOpen={onOpen} />)

    const article = screen.getByRole('article')
    await user.click(article)

    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(onOpen).toHaveBeenCalledWith(mockProject)
  })

  it('should have correct article structure with 3D class', () => {
    const onOpen = vi.fn()
    render(<ProjectCard project={mockProject} onOpen={onOpen} />)

    const article = screen.getByRole('article')
    expect(article).toBeInTheDocument()
    expect(article).toHaveClass('project-card-3d')
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

