import { useEffect, useState } from 'react'
import { FiMaximize2, FiMinimize2 } from 'react-icons/fi'
import { useLanguage } from './LanguageProvider'
import { useTheme } from './ThemeProvider'

type Props = {
  variant?: 'floating' | 'embedded'
  heroFocusActive?: boolean
  onToggleHeroFocus?: () => void
}

export function CornerControls({ variant = 'floating', heroFocusActive = false, onToggleHeroFocus }: Props) {
  const { lang, toggle: toggleLang, t } = useLanguage()
  const { theme, toggle: toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const nextLang = lang === 'es' ? 'EN' : 'ES'
  const langLabel = lang === 'es' ? `Cambiar idioma a ${nextLang}` : `Switch language to ${nextLang}`
  const themeLabel = theme === 'dark' ? t('theme.toggleToLight') : t('theme.toggleToDark')
  const focusLabel = lang === 'es'
    ? heroFocusActive
      ? 'Salir del modo foco del bento'
      : 'Pantalla completa del bento'
    : heroFocusActive
      ? 'Exit bento focus mode'
      : 'Open bento fullscreen mode'
  const className = variant === 'embedded' ? 'corner-controls corner-controls--embedded' : 'corner-controls'

  return (
    <div className={className} role="group" aria-label="display preferences">
      {onToggleHeroFocus ? (
        <button className="corner-btn" type="button" onClick={onToggleHeroFocus} aria-label={focusLabel} title={focusLabel}>
          {heroFocusActive ? <FiMinimize2 size={15} /> : <FiMaximize2 size={15} />}
        </button>
      ) : null}
      <button className="corner-btn" type="button" onClick={toggleLang} aria-label={langLabel} title={langLabel}>
        <span>{nextLang}</span>
      </button>
      <button className="corner-btn" type="button" onClick={toggleTheme} aria-label={themeLabel} title={themeLabel}>
        <span>{mounted ? (theme === 'dark' ? '🌙' : '☀️') : '•'}</span>
      </button>
    </div>
  )
}
