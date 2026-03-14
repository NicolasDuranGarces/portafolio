import { useLanguage } from '../components/LanguageProvider'
import { HeroBentoScene } from '../components/HeroBentoScene'

const backendItems = [
  { name: 'Python',     icon: 'python' },
  { name: 'Node.js',    icon: 'node.js' },
  { name: 'Serverless', icon: 'serverless' },
  { name: 'AWS',        icon: 'aws' },
  { name: 'FastAPI',    icon: 'fastapi' },
  { name: 'Docker',     icon: 'docker' },
  { name: 'PostgreSQL', icon: 'postgresql' },
  { name: 'Java',       icon: 'java' },
]

export function Hero() {
  const { lang, t } = useLanguage()

  const chips = t('hero.specialties')
    .split('|')
    .map((s) => s.trim())
    .filter(Boolean)

  const frontendItems = t('hero.bento.educationItems')
    .split('|')
    .map((name) => ({ name: name.trim(), icon: 'education' }))
    .filter((item) => item.name)

  const aiItems = t('hero.bento.certificationItems')
    .split('|')
    .map((name, index) => ({
      name: name.trim(),
      icon: index === 0 ? 'aws' : 'certificate',
    }))
    .filter((item) => item.name)

  const stats = [
    {
      value: '5+',
      label: lang === 'es' ? 'años de experiencia' : 'years of experience',
    },
    {
      value: '15+',
      label: lang === 'es' ? 'proyectos personales productivos' : 'productive personal projects',
    },
    {
      value: '20',
      label: lang === 'es' ? 'repos open source' : 'open source repos',
    },
    {
      value: lang === 'es' ? 'Bilingüe' : 'Bilingual',
      label: lang === 'es' ? 'español e inglés' : 'Spanish & English',
    },
  ]

  const currentJob = {
    company: 'BetterWay Devs',
    role: lang === 'es' ? 'Software Engineer' : 'Software Engineer',
    period: lang === 'es' ? 'may. 2024 — Actualidad' : 'May 2024 — Present',
    stack: ['Python', 'Node.js', 'AWS Lambda', 'Docker', 'OCR/IA'],
  }

  return (
    <HeroBentoScene
      overline={t('hero.overline')}
      headline={t('hero.headline')}
      title={t('hero.title')}
      description={t('hero.sub')}
      chips={chips}
      greeting={t('hero.greeting')}
      role={t('hero.role')}
      avatarAlt={t('hero.avatarAlt')}
      profileLabel={t('hero.bento.centralCardTitle')}
      availabilityLabel={t('hero.bento.availabilityLabel')}
      availabilityValue={t('hero.bento.availabilityValue')}
      locationValue={t('hero.bento.locationValue')}
      currentJob={currentJob}
      githubUrl="https://github.com/NicolasDuranGarces"
      githubLabel="github.com/NicolasDuranGarces"
      stats={stats}
      backendItems={backendItems}
      frontendItems={frontendItems}
      aiItems={aiItems}
      labelBackend={lang === 'es' ? 'Python · Node · Arquitectura · Serverless' : 'Python · Node · Architecture · Serverless'}
      labelFrontend={lang === 'es' ? 'Educación' : 'Education'}
      labelAI={lang === 'es' ? 'Certificaciones' : 'Certifications'}
      labelCurrentJob={lang === 'es' ? 'Trabajo actual' : 'Current role'}
      ctaGithub={t('hero.ctaGithub')}
      ctaLinkedIn={t('hero.ctaLinkedIn')}
      ctaCV={t('hero.ctaCV')}
      downloadCV={t('hero.downloadCV')}
      ctaAriaLabel={lang === 'es' ? 'Acciones principales' : 'Primary actions'}
    />
  )
}
