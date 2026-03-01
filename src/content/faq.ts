import type { SiteLocale } from '../lib/site'

export type FaqItem = {
  question: string
  answer: string
}

const faqEntries: Record<SiteLocale, FaqItem[]> = {
  es: [
    {
      question: 'Quien es Nicolas Duran Garces?',
      answer: 'Nicolas Duran Garces, tambien conocido como NIDUGA, es un ingeniero de software backend en Armenia, Quindio, especializado en Python, FastAPI, APIs escalables, Docker y arquitectura de software.',
    },
    {
      question: 'Donde esta ubicado Nicolas Duran Garces?',
      answer: 'Esta ubicado en Armenia, Quindio, Colombia, y trabaja de forma remota con equipos de Colombia, Latinoamerica, Estados Unidos y Europa.',
    },
    {
      question: 'Que tecnologias usa como backend developer?',
      answer: 'Trabaja principalmente con Python, FastAPI, Django, Node.js, TypeScript, PostgreSQL, Docker, AWS, mensajeria y observabilidad para plataformas backend en produccion.',
    },
    {
      question: 'Que tipo de roles busca Nicolas Duran Garces?',
      answer: 'Busca roles senior de backend, software engineering, arquitectura de plataformas y consultoria tecnica orientada a APIs, rendimiento y despliegues confiables.',
    },
  ],
  en: [
    {
      question: 'Who is Nicolas Duran Garces?',
      answer: 'Nicolas Duran Garces, also known as NIDUGA, is a backend software engineer based in Armenia, Quindio, focused on Python, FastAPI, scalable APIs, Docker, and software architecture.',
    },
    {
      question: 'Where is Nicolas Duran Garces based?',
      answer: 'He is based in Armenia, Quindio, Colombia, and works remotely with teams across Colombia, Latin America, the United States, and Europe.',
    },
    {
      question: 'What technologies does he use as a backend developer?',
      answer: 'His core stack includes Python, FastAPI, Django, Node.js, TypeScript, PostgreSQL, Docker, AWS, messaging systems, and observability tooling for production platforms.',
    },
    {
      question: 'What kind of roles is Nicolas Duran Garces looking for?',
      answer: 'He is targeting senior backend engineering, platform architecture, and technical consulting roles centered on APIs, performance, and reliable delivery.',
    },
  ],
}

export function getFaqEntries(locale: SiteLocale) {
  return faqEntries[locale]
}
