import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { es } from '../i18n/es'
import { en } from '../i18n/en'
import {
  type SiteLocale,
  getLocalizedPath,
  getPreferredLocale,
  getLocaleFromPathname,
} from '../lib/site'

export type Lang = SiteLocale
type Dict = typeof es

const dicts: Record<Lang, Dict> = { es, en }

type Ctx = {
  lang: Lang
  toggle: () => void
  set: (l: Lang) => void
  t: (key: string) => string
}

const LanguageCtx = createContext<Ctx | null>(null)

type Props = {
  children: React.ReactNode
  initialLang?: Lang
}

const getInitialLang = (initialLang?: Lang): Lang => {
  if (initialLang) return initialLang
  if (typeof window === 'undefined') return 'es'
  return getPreferredLocale(window.location.pathname, window.location.search, localStorage.getItem('lang'))
}

export function LanguageProvider({ children, initialLang }: Props) {
  const [lang, setLang] = useState<Lang>(() => getInitialLang(initialLang))

  useEffect(() => {
    if (typeof window === 'undefined') return
    localStorage.setItem('lang', lang)

    const targetPath = getLocalizedPath(lang, window.location.hash)
    const currentPath = `${window.location.pathname}${window.location.hash}`
    if (currentPath !== targetPath) {
      window.history.replaceState({}, '', targetPath)
    }
  }, [lang])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const syncLocaleFromPath = () => {
      const nextLang = getLocaleFromPathname(window.location.pathname)
      setLang(currentLang => (currentLang === nextLang ? currentLang : nextLang))
    }

    window.addEventListener('popstate', syncLocaleFromPath)
    return () => window.removeEventListener('popstate', syncLocaleFromPath)
  }, [])

  const t = useCallback((key: string) => {
    const parts = key.split('.')
    let cur: unknown = dicts[lang]
    for (const p of parts) {
      cur = (cur as Record<string, unknown>)?.[p]
      if (cur == null) return key
    }
    return typeof cur === 'string' ? cur : key
  }, [lang])

  const value = useMemo<Ctx>(() => ({
    lang,
    toggle: () => setLang(current => (current === 'es' ? 'en' : 'es')),
    set: setLang,
    t,
  }), [lang, t])

  return <LanguageCtx.Provider value={value}>{children}</LanguageCtx.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageCtx)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
