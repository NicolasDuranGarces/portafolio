import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { es } from '../i18n/es'
import { en } from '../i18n/en'

export type Lang = 'es' | 'en'
type Dict = typeof es

const dicts: Record<Lang, Dict> = { es, en }

type Ctx = {
  lang: Lang
  toggle: () => void
  set: (l: Lang) => void
  t: (key: string) => string
}

const LanguageCtx = createContext<Ctx | null>(null)

const getInitialLang = (): Lang => {
  if (typeof window === 'undefined') return 'es'
  const params = new URLSearchParams(window.location.search)
  const fromQuery = params.get('lang')
  if (fromQuery === 'es' || fromQuery === 'en') return fromQuery
  const stored = localStorage.getItem('lang')
  if (stored === 'es' || stored === 'en') return stored
  return 'es'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(getInitialLang)

  useEffect(() => {
    localStorage.setItem('lang', lang)
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    url.searchParams.set('lang', lang)
    window.history.replaceState({}, '', url)
  }, [lang])

  const t = useCallback((key: string) => {
    const parts = key.split('.')
    let cur: any = dicts[lang]
    for (const p of parts) {
      cur = cur?.[p]
      if (cur == null) return key
    }
    return typeof cur === 'string' ? cur : key
  }, [lang])

  const value = useMemo<Ctx>(() => ({
    lang,
    toggle: () => setLang(l => (l === 'es' ? 'en' : 'es')),
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
