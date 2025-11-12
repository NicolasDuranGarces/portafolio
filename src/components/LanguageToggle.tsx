import { useLanguage } from './LanguageProvider'

export function LanguageToggle() {
  const { lang, toggle } = useLanguage()
  const next = lang === 'es' ? 'EN' : 'ES'
  const label = lang === 'es' ? `Cambiar idioma a ${next}` : `Switch language to ${next}`
  return (
    <button className="btn ghost" type="button" onClick={toggle} aria-label={label} title={label} style={{ paddingInline: '.75rem' }}>
      {lang.toUpperCase()} · {next}
    </button>
  )
}
