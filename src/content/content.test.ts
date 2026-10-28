import { describe, expect, it } from 'vitest'
import { langs } from '../lib/lang'
import { caseSlugs, cases } from './cases'
import { experience } from './experience'
import { homeCopy } from './home'
import { openProjects } from './projects'
import { stackGroups } from './stack'
import { notFoundCopy, ui } from './ui'

/** Every string a visitor can read: keys that only carry URLs and identifiers are skipped. */
function visibleText(value: unknown, skip = new Set(['href', 'id', 'slug', 'caseSlug'])): string[] {
  if (typeof value === 'string') return [value]
  if (Array.isArray(value)) return value.flatMap((item) => visibleText(item, skip))
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) => (skip.has(key) ? [] : visibleText(item, skip)))
  }
  return []
}

const everything = visibleText({ cases, experience, openProjects, stackGroups, homeCopy, ui, notFoundCopy })

describe('case studies', () => {
  it('has the four cases with unique slugs', () => {
    expect(cases.map((entry) => entry.slug)).toEqual([...caseSlugs])
    expect(new Set(caseSlugs).size).toBe(4)
  })

  it.each(cases.flatMap((entry) => langs.map((lang) => [entry.slug, lang] as const)))(
    '%s (%s) states the role, 2 or 3 decisions with their reasons, and a result',
    (slug, lang) => {
      const text = cases.find((entry) => entry.slug === slug)!.copy[lang]
      expect(text.role.length).toBeGreaterThan(0)
      expect(text.result.join(' ').length).toBeGreaterThan(100)
      expect(text.decisions.length).toBeGreaterThanOrEqual(2)
      expect(text.decisions.length).toBeLessThanOrEqual(3)
      for (const decision of text.decisions) {
        expect(decision.title.length).toBeGreaterThan(0)
        expect(decision.why.length).toBeGreaterThan(40)
      }
      expect(text.context.length + text.problem.length + text.difficulty.length).toBeGreaterThan(2)
    },
  )

  it('has the same structure in Spanish and English', () => {
    for (const entry of cases) {
      const { es, en } = entry.copy
      expect(en.decisions.length, entry.slug).toBe(es.decisions.length)
      expect(en.problem.length, entry.slug).toBe(es.problem.length)
      expect(Boolean(en.confidentiality), entry.slug).toBe(Boolean(es.confidentiality))
    }
  })

  it('declares confidentiality wherever a client cannot be named', () => {
    const withNote = cases.filter((entry) => entry.copy.es.confidentiality).map((entry) => entry.slug)
    expect(withNote).toEqual(['bheex', 'price-match-automation', 'warehouse-conveyor-backend'])
  })
})

describe('experience', () => {
  it('lists the same roles in both languages, newest first, and links each case once', () => {
    for (const entry of experience) {
      expect(entry.copy.en.bullets.length, entry.id).toBe(entry.copy.es.bullets.length)
    }
    const linked = experience.flatMap((entry) => (entry.caseSlug ? [entry.caseSlug] : []))
    expect(linked.sort()).toEqual([...caseSlugs].sort())
    expect(experience[0].id).toBe('bheex')
  })

  it('only marks as current the roles that have no end date', () => {
    for (const entry of experience) {
      for (const lang of langs) {
        const open = /\b(hoy|present)\b/.test(entry.copy[lang].period)
        expect(entry.current, `${entry.id} ${lang}`).toBe(open)
      }
    }
  })
})

describe('other content', () => {
  it('keeps projects and stack aligned across languages', () => {
    for (const project of openProjects) {
      expect(project.copy.es.description.length).toBeGreaterThan(40)
      expect(project.copy.en.description.length).toBeGreaterThan(40)
      expect(project.links.length).toBeGreaterThan(0)
      for (const link of project.links) expect(link.href).toMatch(/^https:\/\/github\.com\/NicolasDuranGarces\//)
    }
    expect(openProjects.find((project) => project.id === 'caturro')?.links).toHaveLength(4)
    expect(stackGroups.map((group) => group.id)).toEqual(['backend', 'ai', 'cloud', 'data', 'automation', 'frontend'])
  })
})

describe('confidentiality and copy rules', () => {
  it('scans the whole copy, not an empty list', () => {
    expect(everything.length).toBeGreaterThan(300)
  })

  it('contains no contact details or infrastructure artifacts that stay off the web', () => {
    const forbidden = [
      /\+57/,
      /\b\d{1,3}(\.\d{1,3}){3}\b/,
      /\.pem\b/i,
    ]
    for (const text of everything) {
      for (const pattern of forbidden) expect(text, `${pattern}`).not.toMatch(pattern)
    }
  })

  it('writes without hyphens or dashes inside copy', () => {
    const offenders = everything.filter((text) => /[-–—]/.test(text))
    expect(offenders).toEqual([])
  })

  it('avoids the clichés the style guide bans', () => {
    const banned = /\b(elevar|potenciar|soluciones innovadoras|seamless|elevate|unleash|game changer|delve)\b/i
    expect(everything.filter((text) => banned.test(text))).toEqual([])
  })
})
