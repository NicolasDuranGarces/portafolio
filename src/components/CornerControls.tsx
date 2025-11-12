import { useEffect, useState } from 'react'
import { useLanguage } from './LanguageProvider'
import { useTheme } from './ThemeProvider'

export function CornerControls() {
  const { lang, toggle: toggleLang, t } = useLanguage()
  const { theme, toggle: toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const nextLang = lang === 'es' ? 'EN' : 'ES'
  const langLabel = lang === 'es' ? `Cambiar idioma a ${nextLang}` : `Switch language to ${nextLang}`
  const themeLabel = theme === 'dark' ? t('theme.toggleToLight') : t('theme.toggleToDark')

  return (
    <div className="corner-controls" role="group" aria-label="display preferences">
      <button className="corner-btn" type="button" onClick={toggleLang} aria-label={langLabel} title={langLabel}>
        <span>{lang.toUpperCase()}</span>
      </button>
      <button className="corner-btn" type="button" onClick={toggleTheme} aria-label={themeLabel} title={themeLabel}>
        <span>{mounted ? (theme === 'dark' ? '🌙' : '☀️') : '•'}</span>
      </button>
    </div>
  )
}
