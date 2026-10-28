export const site = {
  url: 'https://niduga.dev',
  name: 'Nicolás Durán Garcés',
  alternateNames: ['Nicolas Duran Garces', 'NIDUGA'],
  email: 'niduga@outlook.es',
  linkedin: 'https://www.linkedin.com/in/garcesnicolas',
  github: 'https://github.com/NicolasDuranGarces',
  bheex: 'https://www.bheex.com/',
  ogImage: '/og-image.png',
  cv: {
    es: '/cv/nicolas-duran-garces-cv-es.pdf',
    en: '/cv/nicolas-duran-garces-resume-en.pdf',
  },
  location: {
    city: 'Armenia',
    region: 'Quindío',
    country: 'Colombia',
    countryCode: 'CO',
  },
} as const

export function absoluteUrl(path: string) {
  return `${site.url}${path}`
}
