import { experience } from '../content/experience'
import type { Lang } from './lang'

type ExperienceEntry = (typeof experience)[number]

/** A role as the side column shows it while the visitor reads the trajectory. */
export type Role = { id: string; year: string; org: string; period: string }

export const startYear = (entry: ExperienceEntry, lang: Lang) =>
  /\d{4}/.exec(entry.copy[lang].period)?.[0] ?? entry.copy[lang].period

function toRole(entry: ExperienceEntry, lang: Lang): Role {
  const { organization, period } = entry.copy[lang]
  return { id: entry.id, year: startYear(entry, lang), org: organization, period }
}

/** Consecutive roles that start in the same year share one year label. */
export function yearGroups(lang: Lang) {
  return experience.reduce<{ year: string; entries: ExperienceEntry[] }[]>((groups, entry) => {
    const year = startYear(entry, lang)
    const last = groups[groups.length - 1]
    if (last?.year === year) last.entries.push(entry)
    else groups.push({ year, entries: [entry] })
    return groups
  }, [])
}

/** Unique organizations in order, notes in parentheses dropped, anonymous entries skipped. */
export function companies(lang: Lang): string[] {
  const names = experience
    .filter((entry) => !entry.anonymous)
    .map((entry) => entry.copy[lang].organization.replace(/\s*\(.*\)/, '').trim())
  return [...new Set(names)]
}

export const firstRole = (lang: Lang) => toRole(experience[0], lang)
export const lastRole = (lang: Lang) => toRole(experience[experience.length - 1], lang)
