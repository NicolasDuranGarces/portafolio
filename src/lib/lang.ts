export const langs = ['es', 'en'] as const
export type Lang = (typeof langs)[number]

/** A value that exists once per site language. */
export type Localized<T> = Record<Lang, T>

/** Same value in every language (names, product terms, numbers). */
export function both<T>(value: T): Localized<T> {
  return { es: value, en: value }
}

export function otherLang(lang: Lang): Lang {
  return lang === 'es' ? 'en' : 'es'
}
