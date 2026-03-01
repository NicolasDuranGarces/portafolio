import type { SiteLocale } from '../lib/site'

export type ServiceOverview = {
  eyebrow: string
  title: string
  description: string
  points: string[]
  proof: {
    label: string
    value: string
  }
}

export type ServiceCard = {
  eyebrow: string
  title: string
  description: string
  bullets: string[]
  outcomes: string[]
  fit: string
}

const serviceOverview: Record<SiteLocale, ServiceOverview> = {
  es: {
    eyebrow: 'Como entro a producto',
    title: 'Bloques backend listos para crecer sin perder control operativo.',
    description: 'Trabajo con equipos que ya tienen negocio real y necesitan ordenar arquitectura, entregas y despliegues sin convertir cada feature en una negociacion tecnica.',
    points: [
      'Diagnostico rapido de cuellos de botella en APIs, datos y entregas.',
      'Roadmap tecnico aterrizado a negocio, no solo a deuda.',
      'Ejecucion senior para construir, destrabar o estabilizar sin friccion innecesaria.',
    ],
    proof: {
      label: 'Foco recurrente',
      value: 'APIs, plataformas y features que ya estan en produccion o cerca de salir.',
    },
  },
  en: {
    eyebrow: 'How I plug into product',
    title: 'Backend building blocks that scale without losing operational control.',
    description: 'I work with teams that already have real business traction and need cleaner architecture, steadier delivery, and calmer deployments without turning every feature into a technical negotiation.',
    points: [
      'Fast diagnosis of bottlenecks across APIs, data flows, and delivery pipelines.',
      'Technical roadmap tied to business pressure, not abstract debt alone.',
      'Senior execution to build, unblock, or stabilize with minimal friction.',
    ],
    proof: {
      label: 'Recurring focus',
      value: 'APIs, platforms, and features already in production or close to launch.',
    },
  },
}

const serviceCards: Record<SiteLocale, ServiceCard[]> = {
  es: [
    {
      eyebrow: 'Core build',
      title: 'Arquitectura backend y APIs',
      description: 'Diseno servicios backend medibles para productos que necesitan crecer sin perder claridad tecnica ni operativa.',
      bullets: ['Python y FastAPI', 'Node.js y TypeScript', 'Contratos API, jobs y arquitectura limpia'],
      outcomes: ['Servicios mas faciles de evolucionar', 'Menos ambiguedad entre backend, frontend y operaciones'],
      fit: 'Ideal para equipos que estan armando o rehaciendo el core de producto.',
    },
    {
      eyebrow: 'Delivery layer',
      title: 'Cloud, despliegues y observabilidad',
      description: 'Empaqueto, despliego y opero servicios con foco en Docker, AWS, trazabilidad y un ritmo de entrega sostenible.',
      bullets: ['Docker, Nginx y entornos consistentes', 'AWS Lambda, contenedores y CI/CD', 'Logs, metricas y alertas utiles'],
      outcomes: ['Menos riesgo al salir a produccion', 'Mas visibilidad para detectar regresiones antes'],
      fit: 'Encaja cuando el sistema ya existe pero la operacion sigue siendo fragil.',
    },
    {
      eyebrow: 'Senior leverage',
      title: 'Consultoria tecnica remota',
      description: 'Entro en equipos que necesitan destrabar decisiones de software engineering y convertir conversaciones tecnicas en avance real.',
      bullets: ['Discovery tecnico y definicion de alcance', 'Mentoria, code review y criterio de arquitectura', 'Entrega end-to-end cuando hace falta'],
      outcomes: ['Decisiones mas rapidas y mejor documentadas', 'Menos retrabajo en features y deuda accidental'],
      fit: 'Util cuando hace falta seniority sin inflar el equipo con procesos innecesarios.',
    },
  ],
  en: [
    {
      eyebrow: 'Core build',
      title: 'Backend architecture and APIs',
      description: 'I design measurable backend services for products that need to scale without losing technical or operational clarity.',
      bullets: ['Python and FastAPI', 'Node.js and TypeScript', 'API contracts, jobs, and clean architecture'],
      outcomes: ['Services that are easier to evolve', 'Less ambiguity across backend, frontend, and ops'],
      fit: 'Best for teams building or reshaping the product core.',
    },
    {
      eyebrow: 'Delivery layer',
      title: 'Cloud, deployment, and observability',
      description: 'I package, deploy, and operate services with a practical focus on Docker, AWS, traceability, and sustainable delivery speed.',
      bullets: ['Docker, Nginx, and consistent environments', 'AWS Lambda, containers, and CI/CD', 'Logs, metrics, and useful alerting'],
      outcomes: ['Lower production risk during releases', 'Better visibility to catch regressions earlier'],
      fit: 'Good fit when the system exists but operations still feel fragile.',
    },
    {
      eyebrow: 'Senior leverage',
      title: 'Remote technical consulting',
      description: 'I join teams that need help unblocking engineering decisions and turning technical conversations into real forward motion.',
      bullets: ['Technical discovery and scope definition', 'Mentoring, code review, and architecture judgment', 'End-to-end delivery when it genuinely helps'],
      outcomes: ['Faster, better-documented decisions', 'Less rework across features and accidental debt'],
      fit: 'Useful when a team needs senior leverage without bloating process.',
    },
  ],
}

export function getServiceOverview(locale: SiteLocale) {
  return serviceOverview[locale]
}

export function getServiceCards(locale: SiteLocale) {
  return serviceCards[locale]
}
