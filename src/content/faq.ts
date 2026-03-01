import type { SiteLocale } from '../lib/site'

export type FaqItem = {
  question: string
  answer: string
}

const faqEntries: Record<SiteLocale, FaqItem[]> = {
  es: [
    {
      question: 'En que tipo de proyectos aporta mas valor Nicolas Duran Garces?',
      answer: 'Aporta mas valor en productos que necesitan ordenar backend, APIs, despliegues y decisiones tecnicas sin frenar al equipo. Suele entrar cuando hay que estabilizar una base existente o construir una pieza clave con criterio senior.',
    },
    {
      question: 'Como suele colaborar con equipos remotos?',
      answer: 'Trabaja desde Armenia, Quindio, Colombia, en formato remoto con equipos de Colombia, Latinoamerica, Estados Unidos y Europa. Puede entrar por discovery, ejecucion directa o una mezcla de consultoria y delivery.',
    },
    {
      question: 'Que stack usa para backend y plataformas?',
      answer: 'Su stack principal incluye Python, FastAPI, Node.js, TypeScript, PostgreSQL, Docker, AWS, mensajeria y observabilidad. Tambien puede cubrir piezas de frontend en React cuando una entrega end-to-end lo requiere.',
    },
    {
      question: 'Que roles o necesidades esta buscando resolver?',
      answer: 'Esta orientado a roles senior de backend, software engineering, arquitectura de plataformas y consultoria tecnica. Encaja bien cuando el reto principal es bajar complejidad, mejorar confiabilidad y sacar features a produccion con mejor estructura.',
    },
  ],
  en: [
    {
      question: 'What kind of projects benefit most from Nicolas Duran Garces?',
      answer: 'He is most valuable in products that need cleaner backend systems, APIs, deployments, and technical decision-making without slowing the team down. He usually steps in to stabilize an existing base or build a critical piece with senior judgment.',
    },
    {
      question: 'How does he usually collaborate with remote teams?',
      answer: 'He works remotely from Armenia, Quindio, Colombia, with teams across Colombia, Latin America, the United States, and Europe. Engagements can start in discovery, direct execution, or a mix of consulting and delivery.',
    },
    {
      question: 'What stack does he use for backend and platform work?',
      answer: 'His main stack includes Python, FastAPI, Node.js, TypeScript, PostgreSQL, Docker, AWS, messaging systems, and observability tooling. He can also cover selected React work when an end-to-end delivery needs it.',
    },
    {
      question: 'What roles or needs is he aiming to solve?',
      answer: 'He is targeting senior backend engineering, platform architecture, and technical consulting work. The strongest fit is when a team needs less complexity, more reliability, and a better path to shipping production features.',
    },
  ],
}

export function getFaqEntries(locale: SiteLocale) {
  return faqEntries[locale]
}
