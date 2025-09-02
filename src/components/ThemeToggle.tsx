import { useTheme } from './ThemeProvider'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const label = theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
  return (
    <button
      className="btn ghost"
      type="button"
      aria-label={label}
      onClick={toggle}
      title={label}
      style={{ paddingInline: '.9rem' }}
    >
      {mounted && (theme === 'dark' ? '🌙' : '☀️')}
    </button>
  )
}

