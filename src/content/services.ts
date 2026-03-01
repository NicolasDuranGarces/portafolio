import type { SiteLocale } from '../lib/site'

export type ServiceCard = {
  title: string
  description: string
  bullets: string[]
}

const serviceCards: Record<SiteLocale, ServiceCard[]> = {
  es: [
    {
      title: 'Arquitectura backend y APIs',
      description: 'Diseno servicios backend medibles para productos que necesitan crecer sin perder claridad operativa.',
      bullets: ['Python y FastAPI', 'Node.js y TypeScript', 'Contratos API y arquitectura limpia'],
    },
    {
      title: 'Plataformas cloud y DevOps',
      description: 'Empaqueto, despliego y opero servicios con foco en Docker, AWS, trazabilidad y tiempos de entrega sanos.',
      bullets: ['Docker y Nginx', 'AWS Lambda y contenedores', 'CI/CD y observabilidad'],
    },
    {
      title: 'Consultoria tecnica remota',
      description: 'Entro en equipos que necesitan destrabar decisiones de software engineering y llevar features a produccion con criterio.',
      bullets: ['Discovery tecnico', 'Mentoria y code review', 'Entrega end-to-end cuando hace falta'],
    },
  ],
  en: [
    {
      title: 'Backend architecture and APIs',
      description: 'I design measurable backend services for products that need to scale without losing operational clarity.',
      bullets: ['Python and FastAPI', 'Node.js and TypeScript', 'API contracts and clean architecture'],
    },
    {
      title: 'Cloud platforms and DevOps',
      description: 'I package, deploy, and operate services with a practical focus on Docker, AWS, traceability, and healthy delivery speed.',
      bullets: ['Docker and Nginx', 'AWS Lambda and containers', 'CI/CD and observability'],
    },
    {
      title: 'Remote technical consulting',
      description: 'I join teams that need help unblocking engineering decisions and shipping production features with discipline.',
      bullets: ['Technical discovery', 'Mentoring and code review', 'End-to-end delivery when it adds value'],
    },
  ],
}

export function getServiceCards(locale: SiteLocale) {
  return serviceCards[locale]
}
