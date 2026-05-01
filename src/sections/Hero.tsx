import { useLanguage } from '../components/LanguageProvider'
import { HeroBentoScene } from '../components/HeroBentoScene'

export function Hero() {
  const { lang, t } = useLanguage()

  const techCategories = [
    {
      // Lenguajes base — qué sabes escribir
      label: lang === 'es' ? 'Lenguajes' : 'Languages',
      items: [
        { name: 'Java',       icon: 'java' },
        { name: 'Python',     icon: 'python' },
        { name: 'TypeScript', icon: 'typescript' },
        { name: 'C#',         icon: 'c#' },
      ],
    },
    {
      // Frameworks y runtimes backend — con qué construyes APIs
      label: 'Backend',
      items: [
        { name: 'Spring Boot', icon: 'spring boot' },
        { name: 'Node.js',     icon: 'node.js' },
        { name: 'Express',     icon: 'express' },
        { name: 'NestJS',      icon: 'nestjs' },
        { name: 'FastAPI',     icon: 'fastapi' },
        { name: 'Serverless',  icon: 'serverless' },
      ],
    },
    {
      // UI — lo que tocas en frontend
      label: 'Frontend',
      items: [
        { name: 'React',    icon: 'react' },
        { name: 'Next.js',  icon: 'next.js' },
        { name: 'Vue',      icon: 'vue' },
        { name: 'Angular',  icon: 'angular' },
        { name: 'Tailwind', icon: 'tailwind' },
      ],
    },
    {
      // Dónde vive el código en producción
      label: lang === 'es' ? 'Cloud & DevOps' : 'Cloud & DevOps',
      items: [
        { name: 'AWS',            icon: 'aws' },
        { name: 'AWS Lambda',     icon: 'aws lambda' },
        { name: 'Docker',         icon: 'docker' },
        { name: 'Kubernetes',     icon: 'kubernetes' },
        { name: 'GitHub Actions', icon: 'github actions' },
      ],
    },
    {
      // Persistencia — SQL, NoSQL, caché
      label: lang === 'es' ? 'Bases de datos' : 'Databases',
      items: [
        { name: 'PostgreSQL', icon: 'postgresql' },
        { name: 'MySQL',      icon: 'mysql' },
        { name: 'MongoDB',    icon: 'mongodb' },
        { name: 'Redis',      icon: 'redis' },
        { name: 'DynamoDB',   icon: 'dynamodb' },
      ],
    },
    {
      // IA aplicada + herramientas de desarrollo
      label: 'AI & Dev Tools',
      items: [
        { name: 'Claude Code',  icon: 'claude code' },
        { name: 'Codex',        icon: 'codex' },
        { name: 'LangChain',    icon: 'langchain' },
        { name: 'Hugging Face', icon: 'hugging face' },
        { name: 'Cursor',       icon: 'cursor' },
        { name: 'GitHub',       icon: 'github' },
        { name: 'GitLab',       icon: 'gitlab' },
        { name: 'SourceTree',   icon: 'sourcetree' },
      ],
    },
  ]

  const chips = t('hero.specialties')
    .split('|')
    .map((s) => s.trim())
    .filter(Boolean)

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
      profileLabel={t('hero.bento.centralCardTitle')}
      availabilityLabel={t('hero.bento.availabilityLabel')}
      availabilityValue={t('hero.bento.availabilityValue')}
      locationValue={t('hero.bento.locationValue')}
      currentJob={currentJob}
      githubUrl="https://github.com/NicolasDuranGarces"
      githubLabel="github.com/NicolasDuranGarces"
      stats={stats}
      techCategories={techCategories}
      labelCurrentJob={lang === 'es' ? 'Trabajo actual' : 'Current role'}
      ctaGithub={t('hero.ctaGithub')}
      ctaLinkedIn={t('hero.ctaLinkedIn')}
      ctaCV={t('hero.ctaCV')}
      downloadCV={t('hero.downloadCV')}
      ctaAriaLabel={lang === 'es' ? 'Acciones principales' : 'Primary actions'}
    />
  )
}
