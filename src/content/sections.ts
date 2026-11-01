import type { CaseSlug } from './cases'

/** Home sections in page order. Ids stay English in both languages: links, tests and nav labels key on them. */
export const homeSections = ['about', 'education', 'featured', 'cases', 'experience', 'stack', 'projects', 'contact'] as const

/** The case shown in full in the featured section; every other case is a row under "cases". */
export const featuredSlug: CaseSlug = 'bheex'
