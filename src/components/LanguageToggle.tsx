import { useLanguage } from './LanguageProvider'

export function LanguageToggle() {
  const { lang, toggle } = useLanguage()
  const next = lang === 'es' ? 'EN' : 'ES'
  return (
    <button className="btn ghost" type="button" onClick={toggle} aria-label={`Cambiar idioma a ${next}`} title={`Cambiar idioma a ${next}`} style={{ paddingInline: '.75rem' }}>
      {lang.toUpperCase()} · {next}
    </button>
  )
}

