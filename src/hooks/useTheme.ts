import { useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const DARK_QUERY = '(prefers-color-scheme: dark)'
const listeners = new Set<() => void>()

/** An explicit choice lives in <html data-theme>; without it the system preference decides. */
function readTheme(): Theme {
  const explicit = document.documentElement.dataset.theme
  if (explicit === 'light' || explicit === 'dark') return explicit
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light'
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Storage can be blocked; the choice still applies to the current page.
  }
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  const media = window.matchMedia(DARK_QUERY)
  media.addEventListener('change', listener)
  return () => {
    listeners.delete(listener)
    media.removeEventListener('change', listener)
  }
}

/** The prerendered HTML cannot know the visitor theme, so it renders the light state and corrects after hydration. */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => 'light' as Theme)
  return { theme, toggle: () => setTheme(theme === 'dark' ? 'light' : 'dark') }
}
