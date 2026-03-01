import { siteConfig } from './lib/site'

export const SEO = {
  ...siteConfig,
  locale: 'es_CO',
  alternateLocale: 'en_US',
  keywords: {
    shared: [
      'Nicolas Duran Garces',
      'NIDUGA',
      'niduga.dev',
      'Nicolas Duran',
      'Duran Garces',
      'backend developer',
      'backend software engineer',
      'Python backend',
      'FastAPI developer',
      'API development',
      'Docker',
      'AWS Lambda',
      'Node.js backend',
      'software architecture',
      'DevOps engineer',
      'clean architecture',
    ],
    es: [
      'Ingeniero de software Armenia Quindio',
      'Ingeniero de software backend Armenia Quindio',
      'Desarrollador backend Armenia Quindio',
      'Arquitectura backend Colombia',
      'Ingeniero de software Colombia',
      'Consultor backend Python',
    ],
    en: [
      'backend engineer Armenia Quindio Colombia',
      'software engineer Colombia',
      'remote backend developer Latin America',
      'Python FastAPI engineer',
      'backend architect',
      'senior backend developer',
    ],
  },
  twitter: undefined,
  sameAs: [
    siteConfig.github,
    siteConfig.linkedin,
    `mailto:${siteConfig.email}`,
  ],
  worksFor: {
    name: 'Independent consultant',
  },
}
