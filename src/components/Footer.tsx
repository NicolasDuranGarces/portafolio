import { useLanguage } from './LanguageProvider'

export function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()
  return (
    <footer>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <small>© {year} {t('footer.owner')}. {t('footer.rights')}</small>
        <small>{t('footer.madeWith')}</small>
      </div>
    </footer>
  )
}
