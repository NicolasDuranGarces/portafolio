import type { Localized } from '../lib/lang'
import type { CaseSlug } from './cases'

type ExperienceCopy = {
  role: string
  organization: string
  location: string
  period: string
  bullets: string[]
}

type ExperienceEntry = {
  id: string
  /** True while the role is still ongoing. */
  current: boolean
  /** Case study that expands this role, when there is one. */
  caseSlug?: CaseSlug
  copy: Localized<ExperienceCopy>
}

/**
 * Reverse chronological, same order as the CV.
 * Freelance clients that are not authorized for public mention stay anonymous.
 */
export const experience: readonly ExperienceEntry[] = [
  {
    id: 'bheex',
    current: true,
    caseSlug: 'bheex',
    copy: {
      es: {
        role: 'Fundador e ingeniero de IA',
        organization: 'Bheex (empresa propia)',
        location: 'Remoto',
        period: '2026 a hoy',
        bullets: [
          'Construí y opero un SaaS multiempresa de atención al cliente con IA en producción sobre AWS EC2, con NestJS 11, Prisma, Next.js 15, workers BullMQ, PostgreSQL 16, Redis y CI/CD con Docker.',
          'Diseñé el pipeline de agentes LLM sobre Gemini: router de intención y agente conversacional con tool/function calling, con flujos configurables desde el panel de administración.',
          'Implementé RAG de punta a punta: ingesta de documentos (PDF, Word, Excel, CSV), fragmentación, embeddings y base de datos vectorial Qdrant filtrada por cliente, con respuestas citadas.',
          'Puse en producción WhatsApp (webhooks de Twilio) y llamadas de voz con IA, con voz a texto, texto a voz con ElevenLabs y traspaso en vivo de la IA a un humano sin cortar la llamada.',
          'Agregué controles de seguridad: consultas SQL de solo lectura (solo SELECT, tablas permitidas, LIMIT forzado, tiempo máximo), protección SSRF, secretos cifrados con AES 256 GCM y aislamiento entre clientes.',
        ],
      },
      en: {
        role: 'Founder and AI engineer',
        organization: 'Bheex (own company)',
        location: 'Remote',
        period: '2026 to present',
        bullets: [
          'Built and operate a multitenant AI customer service SaaS in production on AWS EC2, with NestJS 11, Prisma, Next.js 15, BullMQ workers, PostgreSQL 16, Redis and Docker CI/CD.',
          'Designed the LLM agent pipeline on Gemini: intent router plus a multiturn agent with tool/function calling and flow routing configured from the admin UI.',
          'Implemented RAG end to end: document ingestion (PDF, Word, Excel, CSV), chunking, embeddings and a Qdrant vector database filtered per tenant, with cited answers.',
          'Shipped WhatsApp (Twilio webhooks) and voice AI calls with speech to text, ElevenLabs text to speech and live handoff from the AI to a human without dropping the call.',
          'Added guardrails: read only SQL tools (SELECT only, allowed tables, forced LIMIT, timeouts), SSRF protection, AES 256 GCM encrypted secrets and tenant isolation.',
        ],
      },
    },
  },
  {
    id: 'software-company',
    current: true,
    copy: {
      es: {
        role: 'Desarrollador backend (freelance)',
        organization: 'Empresa de software, Colombia',
        location: 'Remoto',
        period: 'Jul 2026 a hoy',
        bullets: [
          'Construyo el backend de una plataforma de lotería y juegos: unos 17 microservicios Spring Boot 3 / Java 17 en arquitectura hexagonal más un frontend en Flutter Web, actualmente en pruebas de aceptación de usuario (UAT).',
        ],
      },
      en: {
        role: 'Backend developer (freelance)',
        organization: 'Software company, Colombia',
        location: 'Remote',
        period: 'Jul 2026 to present',
        bullets: [
          'Build the backend of a lottery and gaming platform: about 17 Spring Boot 3 / Java 17 microservices in hexagonal architecture plus a Flutter Web front end, currently in user acceptance testing (UAT).',
        ],
      },
    },
  },
  {
    id: 'independent',
    current: true,
    copy: {
      es: {
        role: 'Ingeniero full stack / backend (freelance)',
        organization: 'Independiente',
        location: 'Remoto',
        period: 'May 2026 a hoy',
        bullets: [
          'U360 (edtech): monorepo NestJS 11 y React 19 en AWS (CloudFormation, ECS, CloudFront); completé una migración completa del modelo de datos y pasé el portafolio del estudiante de almacenamiento simulado a un backend real.',
          'Servicios FastAPI que consumen streams de eventos de Kafka (AWS MSK) para una red de pagos y normalizan los mensajes a contratos internos.',
        ],
      },
      en: {
        role: 'Full stack / backend engineer (freelance)',
        organization: 'Independent',
        location: 'Remote',
        period: 'May 2026 to present',
        bullets: [
          'U360 (edtech): NestJS 11 and React 19 monorepo on AWS (CloudFormation, ECS, CloudFront); completed a full data model migration and moved the student portfolio from mock local storage to a real backend.',
          'FastAPI services consuming Kafka (AWS MSK) event streams for a payments network and normalizing the messages into internal contracts.',
        ],
      },
    },
  },
  {
    id: 'betterway',
    current: true,
    caseSlug: 'price-match-automation',
    copy: {
      es: {
        role: 'Ingeniero de software',
        organization: 'BetterWay Devs',
        location: 'Remoto',
        period: 'May 2024 a hoy',
        bullets: [
          'Desarrollo un bot de price match y reembolsos: Selenium en AWS ECS Fargate controlado por una API en FastAPI, con Terraform, CI/CD en GitLab y un backend LLM en Python que usa la API de OpenAI.',
          'Construí una API y un dashboard de operaciones con concurrencia por hora, tiempo en cola y tasas de éxito y cancelación.',
          'Evoluciono plataformas de automatización en Python y AWS Lambda y mantengo la infraestructura cloud para scraping y procesamiento de datos de retail a gran escala.',
          'Modernizo código legado y orquesto servicios para alta disponibilidad; acelero la entrega con Claude Code, MCP y herramientas de LLM.',
        ],
      },
      en: {
        role: 'Software engineer',
        organization: 'BetterWay Devs',
        location: 'Remote',
        period: 'May 2024 to present',
        bullets: [
          'Develop a price match and refund bot: Selenium on AWS ECS Fargate driven by a FastAPI control API, Terraform and GitLab CI/CD, with a Python LLM backend calling the OpenAI API.',
          'Built an operations API and dashboard tracking hourly concurrency, queue time, success and cancellation rates.',
          'Evolve Python and AWS Lambda automation platforms and maintain the cloud infrastructure for large scale retail scraping and data processing.',
          'Modernize legacy code and orchestrate services for high availability; accelerate delivery with Claude Code, MCP and LLM tooling.',
        ],
      },
    },
  },
  {
    id: 'osmed',
    current: false,
    copy: {
      es: {
        role: 'Líder de desarrollo full stack, Osmed Gateway',
        organization: 'Grupo de Innovación EAM',
        location: 'Armenia',
        period: 'Sep 2024 a Sep 2025',
        bullets: [
          'Lideré una plataforma HealthTech de historias clínicas y agendamiento con React, Node.js y PostgreSQL, desplegada en AWS.',
          'Construí la app nativa de iOS (React Native) e implementé control de acceso por roles y agendamiento médico en tiempo real.',
        ],
      },
      en: {
        role: 'Full stack development lead, Osmed Gateway',
        organization: 'Grupo de Innovación EAM',
        location: 'Armenia',
        period: 'Sep 2024 to Sep 2025',
        bullets: [
          'Led an end to end HealthTech platform for clinical records and scheduling with React, Node.js and PostgreSQL, deployed on AWS.',
          'Built the native iOS app (React Native) and implemented role based access control and real time medical scheduling.',
        ],
      },
    },
  },
  {
    id: 'edeq',
    current: false,
    caseSlug: 'quindio-inteligente-iot',
    copy: {
      es: {
        role: 'Arquitecto de soluciones cloud e IoT, EDEQ',
        organization: 'Grupo de Innovación EAM',
        location: 'Armenia',
        period: 'Jun 2024 a Sep 2025',
        bullets: [
          'Diseñé la arquitectura serverless (AWS Lambda y Docker) del proyecto Quindío Inteligente.',
          'Construí un backend en Python para ingesta IoT de alto volumen por MQTT (Mosquitto) para monitoreo en tiempo real, y reduje costos cloud con contenedores efímeros y servicios bajo demanda.',
        ],
      },
      en: {
        role: 'Cloud and IoT solutions architect, EDEQ',
        organization: 'Grupo de Innovación EAM',
        location: 'Armenia',
        period: 'Jun 2024 to Sep 2025',
        bullets: [
          'Designed the serverless architecture (AWS Lambda and Docker) for the Quindío Inteligente project.',
          'Built a Python backend for high volume IoT ingestion over MQTT (Mosquitto) for real time monitoring, and reduced cloud cost with ephemeral containers and on demand services.',
        ],
      },
    },
  },
  {
    id: 'eam-professor',
    current: false,
    copy: {
      es: {
        role: 'Profesor de Ingeniería de Software',
        organization: 'Institución Universitaria EAM',
        location: 'Armenia',
        period: 'Ago 2023 a Jun 2025',
        bullets: [
          'Dicté Aplicaciones Empresariales (Java Spring Boot, Docker), la electiva de Microservicios (Python FastAPI, AWS Serverless/Amplify), Lógica de Programación y Diseño de Software; acompañé a los estudiantes en arquitectura limpia y despliegue en la nube.',
        ],
      },
      en: {
        role: 'Software Engineering professor',
        organization: 'Institución Universitaria EAM',
        location: 'Armenia',
        period: 'Aug 2023 to Jun 2025',
        bullets: [
          'Taught Enterprise Applications (Java Spring Boot, Docker), a Microservices elective (Python FastAPI, AWS Serverless/Amplify), Programming Logic and Software Design; mentored students on clean architecture and cloud deployment.',
        ],
      },
    },
  },
  {
    id: 'atlanticsoft',
    current: false,
    caseSlug: 'warehouse-conveyor-backend',
    copy: {
      es: {
        role: 'Desarrollador de software',
        organization: 'Atlanticsoft',
        location: 'Colombia',
        period: 'Ago 2021 a May 2024',
        bullets: [
          'Construí el backend crítico de una banda transportadora automatizada de clasificación de bodega (WMS), con tiempos de respuesta menores a 1 segundo para mantener sincronizados los paquetes físicos.',
          'Migré automatizaciones de extensiones de Chrome a clústeres de Selenium en Docker sobre Azure, reduciendo de forma notable las cancelaciones de pedidos.',
          'Entregué interfaces de control de bodega en Bubble (no code) integradas con el backend.',
        ],
      },
      en: {
        role: 'Software developer',
        organization: 'Atlanticsoft',
        location: 'Colombia',
        period: 'Aug 2021 to May 2024',
        bullets: [
          'Built the critical backend of an automated warehouse sorting conveyor (WMS), bringing response times under 1 second to keep physical parcels in sync.',
          'Migrated Chrome extension automations to Dockerized Selenium clusters on Azure, sharply reducing order cancellation rates.',
          'Delivered warehouse control interfaces in Bubble (no code) integrated with the backend.',
        ],
      },
    },
  },
  {
    id: 'atlanticsoft-internship',
    current: false,
    copy: {
      es: {
        role: 'Desarrollador de software (práctica)',
        organization: 'Atlanticsoft',
        location: 'Armenia, Colombia',
        period: 'Feb 2021 a Ago 2021',
        bullets: [
          'Construí extensiones de Chrome que automatizaban compras masivas en Amazon, BestBuy y Walmart, y funciones AWS Lambda para guardar los registros de transacciones y compras.',
        ],
      },
      en: {
        role: 'Software developer (internship)',
        organization: 'Atlanticsoft',
        location: 'Armenia, Colombia',
        period: 'Feb 2021 to Aug 2021',
        bullets: [
          'Built Chrome extensions automating bulk purchasing on Amazon, BestBuy and Walmart, and AWS Lambda functions to store transaction and purchase logs.',
        ],
      },
    },
  },
]
