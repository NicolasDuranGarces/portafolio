import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Theme = 'light' | 'dark'
type Ctx = { theme: Theme; toggle: () => void; set: (t: Theme) => void }
const ThemeCtx = createContext<Ctx | null>(null)

const isTheme = (value: string | null): value is Theme =>
  value === 'light' || value === 'dark'

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light'

  const storedTheme = window.localStorage.getItem('theme')
  if (isTheme(storedTheme)) return storedTheme

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    window.localStorage.setItem('theme', theme)
  }, [theme])

  const value = useMemo<Ctx>(() => ({
    theme,
    toggle: () => setTheme(t => (t === 'dark' ? 'light' : 'dark')),
    set: setTheme,
  }), [theme])

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeCtx)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
