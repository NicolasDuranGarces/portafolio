import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Theme = 'light' | 'dark'
type Ctx = { theme: Theme; toggle: () => void; set: (t: Theme) => void }
const ThemeCtx = createContext<Ctx | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = window.localStorage.getItem('theme') as Theme | null
    if (saved) return saved
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  })

  useEffect(() => {
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

