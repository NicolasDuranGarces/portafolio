import { describe, it, expect } from 'vitest'
import { projects, getProjects, type ProjectCategory } from './projects'

describe('Projects Data', () => {
  it('should have valid project structure', () => {
    expect(projects).toBeDefined()
    expect(Array.isArray(projects)).toBe(true)
    expect(projects.length).toBeGreaterThan(0)
  })

  it('should have unique slugs', () => {
    const slugs = projects.map(p => p.slug)
    const uniqueSlugs = new Set(slugs)
    expect(uniqueSlugs.size).toBe(slugs.length)
  })

  it('should have bilingual titles and descriptions', () => {
    projects.forEach(project => {
      expect(project.title.es).toBeDefined()
      expect(project.title.en).toBeDefined()
      expect(project.description.es).toBeDefined()
      expect(project.description.en).toBeDefined()
      expect(typeof project.title.es).toBe('string')
      expect(typeof project.title.en).toBe('string')
      expect(typeof project.description.es).toBe('string')
      expect(typeof project.description.en).toBe('string')
    })
  })

  it('should have valid categories', () => {
    const validCategories: ProjectCategory[] = ['backend', 'frontend', 'devops', 'data', 'mobile']

    projects.forEach(project => {
      expect(validCategories).toContain(project.category)
    })
  })

  it('should have non-empty tags array', () => {
    projects.forEach(project => {
      expect(Array.isArray(project.tags)).toBe(true)
      expect(project.tags.length).toBeGreaterThan(0)
      project.tags.forEach(tag => {
        expect(typeof tag).toBe('string')
        expect(tag.length).toBeGreaterThan(0)
      })
    })
  })

  it('should have bilingual links if provided', () => {
    projects.forEach(project => {
      if (project.links) {
        expect(Array.isArray(project.links)).toBe(true)
        project.links.forEach(link => {
          expect(link.href).toBeDefined()
          expect(typeof link.href).toBe('string')
          expect(link.href.length).toBeGreaterThan(0)
          expect(link.label.es).toBeDefined()
          expect(link.label.en).toBeDefined()
        })
      }
    })
  })

  it('should have bilingual highlights if provided', () => {
    projects.forEach(project => {
      if (project.highlights) {
        expect(Array.isArray(project.highlights)).toBe(true)
        project.highlights.forEach(highlight => {
          expect(highlight.es).toBeDefined()
          expect(highlight.en).toBeDefined()
          expect(typeof highlight.es).toBe('string')
          expect(typeof highlight.en).toBe('string')
        })
      }
    })
  })

  describe('getProjects', () => {
    it('should resolve Spanish projects correctly', () => {
      const resolved = getProjects('es')

      expect(resolved).toBeDefined()
      expect(Array.isArray(resolved)).toBe(true)
      expect(resolved.length).toBe(projects.length)

      resolved.forEach((project, index) => {
        expect(project.slug).toBe(projects[index].slug)
        expect(project.title).toBe(projects[index].title.es)
        expect(project.description).toBe(projects[index].description.es)
        expect(project.category).toBe(projects[index].category)
        expect(project.tags).toEqual(projects[index].tags)
      })
    })

    it('should resolve English projects correctly', () => {
      const resolved = getProjects('en')

      expect(resolved).toBeDefined()
      expect(Array.isArray(resolved)).toBe(true)
      expect(resolved.length).toBe(projects.length)

      resolved.forEach((project, index) => {
        expect(project.slug).toBe(projects[index].slug)
        expect(project.title).toBe(projects[index].title.en)
        expect(project.description).toBe(projects[index].description.en)
        expect(project.category).toBe(projects[index].category)
        expect(project.tags).toEqual(projects[index].tags)
      })
    })

    it('should resolve links correctly', () => {
      const resolved = getProjects('es')

      resolved.forEach((project, index) => {
        if (projects[index].links) {
          expect(project.links).toBeDefined()
          expect(project.links?.length).toBe(projects[index].links?.length)

          project.links?.forEach((link, linkIndex) => {
            expect(link.href).toBe(projects[index].links?.[linkIndex].href)
            expect(link.label).toBe(projects[index].links?.[linkIndex].label.es)
          })
        }
      })
    })

    it('should resolve highlights correctly', () => {
      const resolvedEs = getProjects('es')
      const resolvedEn = getProjects('en')

      resolvedEs.forEach((project, index) => {
        if (projects[index].highlights) {
          expect(project.highlights).toBeDefined()
          expect(project.highlights?.length).toBe(projects[index].highlights?.length)

          project.highlights?.forEach((highlight, hIndex) => {
            expect(highlight).toBe(projects[index].highlights?.[hIndex].es)
          })
        }
      })

      resolvedEn.forEach((project, index) => {
        if (projects[index].highlights) {
          expect(project.highlights).toBeDefined()

          project.highlights?.forEach((highlight, hIndex) => {
            expect(highlight).toBe(projects[index].highlights?.[hIndex].en)
          })
        }
      })
    })
  })

  it('should have roastsync project with correct data', () => {
    const roastsync = projects.find(p => p.slug === 'roastsync')

    expect(roastsync).toBeDefined()
    expect(roastsync?.category).toBe('backend')
    expect(roastsync?.tags).toContain('Python')
    expect(roastsync?.tags).toContain('FastAPI')
    expect(roastsync?.links).toBeDefined()
    expect(roastsync?.links?.length).toBeGreaterThan(0)
  })
})
