import { useTheme } from './ThemeProvider'
import { useEffect, useState } from 'react'
import { useLanguage } from './LanguageProvider'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { t } = useLanguage()
  useEffect(() => setMounted(true), [])
  const label = theme === 'dark' ? t('theme.toggleToLight') : t('theme.toggleToDark')
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
