import { FiGithub, FiLinkedin, FiMail, FiTwitter, FiFileText } from 'react-icons/fi'
import { useLanguage } from './LanguageProvider'

export function SideRails() {
  return <LeftRail />
}

function LeftRail() {
  const { t } = useLanguage()
  return (
    <aside className="rail-left" aria-label={t('rails.socialAria')}>
      <span className="rail-tag" aria-label={t('rails.availableAria')}>{t('rails.available')}</span>
      <a href="https://github.com/tu-usuario" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub"><FiGithub /></a>
      <a href="https://www.linkedin.com/in/tu-usuario/" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn"><FiLinkedin /></a>
      <a href="https://twitter.com/tu-usuario" target="_blank" rel="noreferrer" aria-label="Twitter" title="Twitter"><FiTwitter /></a>
      <a href="mailto:correo@ejemplo.com" aria-label="Email" title="Email"><FiMail /></a>
      <a href="/cv.pdf" aria-label="CV" title="CV" rel="nofollow"><FiFileText /></a>
      <span className="rail-line" aria-hidden />
    </aside>
  )
}
