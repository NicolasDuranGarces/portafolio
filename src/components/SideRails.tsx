import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { useLanguage } from './LanguageProvider'

export function SideRails() {
  return <LeftRail />
}

function LeftRail() {
  const { t } = useLanguage()
  return (
    <aside className="rail-left" aria-label={t('rails.socialAria')}>
      <span className="rail-tag" aria-label={t('rails.availableAria')}>{t('rails.available')}</span>
      <a href="https://github.com/NicolasDuranGarces" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub"><FiGithub /></a>
      <a href="https://www.linkedin.com/in/garcesnicolas/" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn"><FiLinkedin /></a>
      <a href="mailto:niduga@outlook.es" aria-label="Email" title="Email"><FiMail /></a>
      <span className="rail-line" aria-hidden />
    </aside>
  )
}
