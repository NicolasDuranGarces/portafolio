import { useLanguage } from '../components/LanguageProvider'
import { HeroBentoScene } from '../components/HeroBentoScene'

export function Hero() {
  const { lang, t } = useLanguage()
  const specialties = t('hero.specialties')
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean)

  const stats = [
    { value: t('hero.stats.years.value'), label: t('hero.stats.years.label') },
    { value: t('hero.stats.projects.value'), label: t('hero.stats.projects.label') },
    { value: t('hero.stats.repos.value'), label: t('hero.stats.repos.label') },
    { value: t('hero.stats.coffee.value'), label: t('hero.stats.coffee.label') },
  ]

  return (
    <HeroBentoScene
      overline={t('hero.overline')}
      kicker={t('hero.bento.kicker')}
      headline={t('hero.headline')}
      title={t('hero.title')}
      description={t('hero.sub')}
      greeting={t('hero.greeting')}
      role={t('hero.role')}
      avatarAlt={t('hero.avatarAlt')}
      specialtiesAria={t('hero.bento.specialtiesAria')}
      signalLabel={t('hero.bento.locationLabel')}
      signalValue={t('hero.bento.locationValue')}
      signalBody={t('hero.bento.locationBody')}
      profileLabel={t('hero.bento.centralCardTitle')}
      availabilityLabel={t('hero.bento.availabilityLabel')}
      availabilityValue={t('hero.bento.availabilityValue')}
      spotlightTitle={t('hero.spotlight.title')}
      spotlightBody={t('hero.spotlight.body')}
      metricsLabel={t('hero.bento.metricsLabel')}
      terminalLines={[
        t('hero.bento.terminal.0'),
        t('hero.bento.terminal.1'),
        t('hero.bento.terminal.2'),
        t('hero.bento.terminal.3'),
      ]}
      specialties={specialties}
      stats={stats}
      tagline={t('hero.bento.centralCardBody')}
      ctaProjects={t('hero.ctaProjects')}
      ctaContact={t('hero.ctaContact')}
      ctaCV={t('hero.ctaCV')}
      downloadCV={t('hero.downloadCV')}
      ctaAriaLabel={lang === 'es' ? 'Acciones principales' : 'Primary actions'}
      scrollLabel={lang === 'es' ? 'Seguir bajando' : 'Keep scrolling'}
      scrollAriaLabel={lang === 'es' ? 'Ir a la seccion de experiencia' : 'Jump to the experience section'}
    />
  )
}
