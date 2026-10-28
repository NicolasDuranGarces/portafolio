import type { Localized } from '../lib/lang'
import { site } from '../lib/site'

export const caseSlugs = [
  'bheex',
  'price-match-automation',
  'quindio-inteligente-iot',
  'warehouse-conveyor-backend',
] as const
export type CaseSlug = (typeof caseSlugs)[number]

type CaseDecision = { title: string; why: string }

type CaseCopy = {
  title: string
  /** Card text on the home page and meta description of the case page. */
  summary: string
  role: string
  organization: string
  period: string
  context: string[]
  problem: string[]
  myRole: string[]
  decisions: CaseDecision[]
  difficulty: string[]
  result: string[]
  /** Only when the case involves a client that cannot be named. */
  confidentiality?: string
}

type CaseStudy = {
  slug: CaseSlug
  stack: readonly string[]
  /** External link to the product, only when the site is live. */
  link?: { href: string; label: Localized<string> }
  copy: Localized<CaseCopy>
}

export const cases: readonly CaseStudy[] = [
  {
    slug: 'bheex',
    stack: [
      'NestJS 11',
      'Prisma',
      'Next.js 15',
      'BullMQ',
      'PostgreSQL 16',
      'Redis',
      'Docker',
      'AWS EC2',
      'Gemini',
      'Qdrant',
      'Twilio',
      'ElevenLabs',
    ],
    link: { href: site.bheex, label: { es: 'Ver el sitio de Bheex', en: 'Visit the Bheex site' } },
    copy: {
      es: {
        title: 'Bheex: SaaS de atención al cliente con IA',
        summary:
          'Plataforma multiempresa en producción con agentes LLM, RAG sobre los documentos de cada cliente, WhatsApp y llamadas de voz con traspaso a una persona.',
        role: 'Fundador e ingeniero de IA',
        organization: 'Bheex, empresa propia',
        period: '2026 a hoy',
        context: [
          'Bheex es mi empresa: un SaaS de atención al cliente con inteligencia artificial. Cada empresa cliente configura sus agentes desde un panel de administración, carga sus documentos y atiende a sus clientes por WhatsApp y por llamadas de voz. Opera en producción sobre AWS EC2.',
        ],
        problem: [
          'Responder en nombre de una empresa exige más que conectar un modelo de lenguaje a un chat. Las respuestas tienen que salir de los documentos de esa empresa y poder citarse, ninguna empresa puede ver datos de otra y una persona tiene que poder tomar la conversación cuando haga falta, también en medio de una llamada de voz.',
        ],
        myRole: [
          'Soy el fundador y el ingeniero de IA. Diseñé y construí el sistema completo y hoy lo opero: el backend, el panel de administración, el pipeline de agentes, la ingesta de documentos, los canales de WhatsApp y de voz, el despliegue y los controles de seguridad.',
        ],
        decisions: [
          {
            title: 'Un router de intención y un agente con tool calling sobre Gemini',
            why: 'Separar la detección de la intención de la conversación permite enviar cada mensaje al flujo correcto. Esos flujos se configuran desde el panel de administración, así que cambiar el comportamiento de un agente no requiere tocar código.',
          },
          {
            title: 'RAG filtrado por cliente sobre Qdrant, con respuestas citadas',
            why: 'Cada búsqueda en la base de datos vectorial lleva el filtro del cliente, de modo que una respuesta solo puede apoyarse en documentos de la empresa que pregunta. La cita permite comprobar de dónde sale cada dato.',
          },
          {
            title: 'Controles de seguridad como parte del diseño',
            why: 'El agente usa herramientas con datos reales, así que limité lo que puede hacer: consultas SQL de solo lectura (solo SELECT, tablas permitidas, LIMIT forzado y tiempo máximo), protección SSRF, secretos cifrados con AES 256 GCM y aislamiento entre clientes. Un error del modelo no debería convertirse en un daño.',
          },
        ],
        difficulty: [
          'Había tres frentes a la vez. El aislamiento: varias empresas comparten la plataforma y ninguna debe ver datos de otra, ni siquiera a través del modelo. La voz en vivo: pasar una llamada de la IA a una persona sin cortarla obliga a coordinar voz a texto, texto a voz y el traspaso en tiempo real. Y las herramientas con datos reales: las consultas SQL y las peticiones salientes son superficies de ataque que había que cerrar de antemano.',
        ],
        result: [
          'Bheex funciona hoy en producción como plataforma multiempresa sobre AWS EC2, con despliegue automatizado mediante CI/CD con Docker. El canal de WhatsApp (webhooks de Twilio) y el de voz con IA están en producción: la voz usa voz a texto y texto a voz con ElevenLabs, y una persona puede tomar la llamada sin que se corte. Las respuestas citan los documentos de cada cliente y los controles de seguridad limitan lo que el agente puede leer y ejecutar.',
        ],
        confidentiality: 'Las empresas que usan Bheex no se nombran en este sitio.',
      },
      en: {
        title: 'Bheex: AI customer service SaaS',
        summary:
          "Multitenant platform in production with LLM agents, RAG over each customer's documents, WhatsApp and voice calls with a live handoff to a person.",
        role: 'Founder and AI engineer',
        organization: 'Bheex, own company',
        period: '2026 to present',
        context: [
          'Bheex is my company: an AI customer service SaaS. Each customer company configures its agents from an admin panel, uploads its documents and serves its own customers over WhatsApp and voice calls. It runs in production on AWS EC2.',
        ],
        problem: [
          "Answering on behalf of a company takes more than plugging a language model into a chat. Answers must come from that company's own documents and be citable, no company may see another company's data, and a person must be able to take over the conversation when needed, even in the middle of a voice call.",
        ],
        myRole: [
          'I am the founder and the AI engineer. I designed and built the whole system and I run it today: the backend, the admin panel, the agent pipeline, document ingestion, the WhatsApp and voice channels, deployment and the security controls.',
        ],
        decisions: [
          {
            title: 'An intent router and an agent with tool calling on Gemini',
            why: 'Separating intent detection from the conversation lets each message reach the right flow. Those flows are configured from the admin panel, so changing how an agent behaves does not require touching code.',
          },
          {
            title: 'RAG filtered per customer on Qdrant, with cited answers',
            why: 'Every vector search carries the customer filter, so an answer can only rest on documents from the company that is asking. The citation lets anyone check where each fact came from.',
          },
          {
            title: 'Security controls as part of the design',
            why: 'The agent uses tools with real data, so I limited what it can do: read only SQL queries (SELECT only, allowed tables, forced LIMIT and a maximum run time), SSRF protection, secrets encrypted with AES 256 GCM and isolation between customers. A model mistake should never turn into damage.',
          },
        ],
        difficulty: [
          "Three fronts at once. Isolation: several companies share the platform and none may see another's data, not even through the model. Live voice: handing a call from the AI to a person without dropping it means coordinating speech to text, text to speech and the handoff in real time. And tools with real data: SQL queries and outbound requests are attack surfaces that had to be closed up front.",
        ],
        result: [
          "Bheex runs in production today as a multitenant platform on AWS EC2, with automated deployment through Docker CI/CD. The WhatsApp channel (Twilio webhooks) and the voice AI channel are in production: voice uses speech to text and ElevenLabs text to speech, and a person can take over a call without it dropping. Answers cite each customer's documents and the security controls limit what the agent can read and run.",
        ],
        confidentiality: 'The companies that use Bheex are not named on this site.',
      },
    },
  },
  {
    slug: 'price-match-automation',
    stack: [
      'Python',
      'FastAPI',
      'Selenium',
      'AWS ECS Fargate',
      'AWS Lambda',
      'Terraform',
      'GitLab CI/CD',
      'OpenAI API',
      'Claude Code',
      'MCP',
    ],
    copy: {
      es: {
        title: 'Automatización de price match y reembolsos',
        summary:
          'Selenium en AWS ECS Fargate controlado por una API FastAPI, con un backend LLM en Python y un panel de operaciones, para minoristas de EE.UU.',
        role: 'Ingeniero de software',
        organization: 'Better Way (BetterWay Devs)',
        period: 'May 2024 a hoy',
        context: [
          'En BetterWay Devs trabajo en plataformas de automatización para minoristas de EE.UU. Este caso reúne dos frentes: un bot de price match y reembolsos, y las plataformas de scraping y de procesamiento de datos de retail a gran escala que lo acompañan.',
        ],
        problem: [
          'El bot tiene que operar sitios de retail con navegadores reales, y hacerlo muchas veces en paralelo. Eso plantea tres necesidades: ejecutar sesiones de navegador a escala, controlarlas desde una API y ver en todo momento cuántas corren, cuánto esperan en cola y cuántas terminan bien o se cancelan.',
        ],
        myRole: [
          'Desarrollo el bot y su API de control, construí la API y el panel de operaciones, evoluciono las plataformas de automatización en Python y AWS Lambda y mantengo la infraestructura cloud del scraping y del procesamiento de datos. También modernizo código legado y orquesto servicios para alta disponibilidad, y acelero la entrega con Claude Code, MCP y herramientas de LLM.',
        ],
        decisions: [
          {
            title: 'Selenium sobre AWS ECS Fargate, controlado por una API FastAPI',
            why: 'Fargate ejecuta los navegadores sin administrar servidores, y la API de control permite lanzar y vigilar las sesiones desde el resto del sistema en lugar de depender de scripts sueltos.',
          },
          {
            title: 'Infraestructura en Terraform y CI/CD en GitLab',
            why: 'Describir la infraestructura como código hace que el entorno de los bots se pueda revisar, repetir y cambiar sin pasos manuales.',
          },
          {
            title: 'Un panel de operaciones con las métricas que importan',
            why: 'La concurrencia por hora, el tiempo en cola y las tasas de éxito y de cancelación muestran si el sistema está saturado o si algo empezó a fallar, y permiten reaccionar con datos en lugar de intuición.',
          },
        ],
        difficulty: [
          'Operar navegadores automatizados a escala es frágil por naturaleza: las sesiones fallan y las páginas cambian, por eso la tasa de éxito y la de cancelación son métricas de primera clase. A eso se suma sostener la alta disponibilidad mientras se moderniza código legado y se orquestan servicios.',
        ],
        result: [
          'Construí una API y un panel de operaciones que muestran la concurrencia por hora, el tiempo en cola y las tasas de éxito y de cancelación. El bot de price match y reembolsos sigue en desarrollo activo, con su infraestructura en Terraform y su CI/CD en GitLab, y mantengo la infraestructura cloud para el scraping y el procesamiento de datos de retail a gran escala.',
        ],
        confidentiality: 'Detalles de clientes y código reservados por confidencialidad.',
      },
      en: {
        title: 'Price match and refund automation',
        summary:
          'Selenium on AWS ECS Fargate driven by a FastAPI control API, with a Python LLM backend and an operations dashboard, for US retailers.',
        role: 'Software engineer',
        organization: 'Better Way (BetterWay Devs)',
        period: 'May 2024 to present',
        context: [
          'At BetterWay Devs I work on automation platforms for US retailers. This case brings together two fronts: a price match and refund bot, and the large scale retail scraping and data processing platforms around it.',
        ],
        problem: [
          'The bot has to operate retail sites with real browsers, and do it many times in parallel. That creates three needs: running browser sessions at scale, controlling them from an API, and seeing at any moment how many are running, how long they wait in the queue and how many finish well or get cancelled.',
        ],
        myRole: [
          'I develop the bot and its control API, built the operations API and dashboard, evolve the Python and AWS Lambda automation platforms and maintain the cloud infrastructure for scraping and data processing. I also modernize legacy code and orchestrate services for high availability, and I speed up delivery with Claude Code, MCP and LLM tooling.',
        ],
        decisions: [
          {
            title: 'Selenium on AWS ECS Fargate, driven by a FastAPI control API',
            why: 'Fargate runs the browsers without managing servers, and the control API lets the rest of the system launch and watch sessions instead of relying on loose scripts.',
          },
          {
            title: 'Infrastructure in Terraform and CI/CD in GitLab',
            why: 'Describing infrastructure as code means the environment where the bots run can be reviewed, repeated and changed without manual steps.',
          },
          {
            title: 'An operations dashboard with the metrics that matter',
            why: 'Hourly concurrency, queue time and success and cancellation rates show whether the system is saturated or something started to fail, and let the team react with data instead of guesswork.',
          },
        ],
        difficulty: [
          'Running automated browsers at scale is fragile by nature: sessions fail and pages change, which is why success and cancellation rates are first class metrics. On top of that comes keeping high availability while legacy code is modernized and services are orchestrated.',
        ],
        result: [
          'I built an API and an operations dashboard that show hourly concurrency, queue time and success and cancellation rates. The price match and refund bot is still under active development, with its infrastructure in Terraform and its CI/CD in GitLab, and I maintain the cloud infrastructure for large scale retail scraping and data processing.',
        ],
        confidentiality: 'Client details and code are withheld for confidentiality.',
      },
    },
  },
  {
    slug: 'quindio-inteligente-iot',
    stack: ['AWS Lambda', 'Docker', 'Python', 'MQTT', 'Mosquitto'],
    copy: {
      es: {
        title: 'Quindío Inteligente: ingesta IoT serverless',
        summary:
          'Arquitectura serverless en AWS y backend en Python para ingerir datos IoT de alto volumen por MQTT y monitorearlos en tiempo real, con menos costo de nube.',
        role: 'Arquitecto de soluciones cloud e IoT',
        organization: 'Grupo de Innovación EAM, proyecto con EDEQ',
        period: 'Jun 2024 a Sep 2025',
        context: [
          'Quindío Inteligente fue un proyecto del Grupo de Innovación EAM, en Armenia, desarrollado con EDEQ. Su objetivo técnico era recibir datos de dispositivos IoT y mostrarlos en un monitoreo en tiempo real.',
        ],
        problem: [
          'Los dispositivos envían mensajes de forma continua y en alto volumen. El sistema tenía que absorberlos sin perder el ritmo del monitoreo en tiempo real, y hacerlo sin pagar por infraestructura que se queda ociosa.',
        ],
        myRole: [
          'Fui el arquitecto de soluciones cloud e IoT. Diseñé la arquitectura serverless del proyecto con AWS Lambda y Docker y construí el backend en Python que ingiere los mensajes por MQTT.',
        ],
        decisions: [
          {
            title: 'Arquitectura serverless con AWS Lambda y Docker',
            why: 'El cómputo se paga cuando se usa y se ajusta al volumen de mensajes, sin administrar servidores propios. Con Docker, el mismo código corre igual en desarrollo y en la nube, lo que facilita probar la ingesta antes de desplegarla.',
          },
          {
            title: 'MQTT con Mosquitto como puerta de entrada de los dispositivos',
            why: 'MQTT es un protocolo liviano pensado para IoT y Mosquitto es un broker maduro. Encajan con dispositivos que publican mensajes pequeños y frecuentes, y permiten que el backend reciba lo que se publica en lugar de consultar los dispositivos uno por uno.',
          },
          {
            title: 'Contenedores efímeros y servicios bajo demanda',
            why: 'Lo que no está procesando mensajes no se queda encendido, y eso redujo los costos de nube. Un contenedor efímero se crea para trabajar y desaparece cuando termina, de modo que el costo sigue al trabajo realizado y no al tiempo que el servicio permanece activo.',
          },
        ],
        difficulty: [
          'Había que combinar tres exigencias que tiran en direcciones distintas: alto volumen de mensajes, respuesta en tiempo real y un gasto de nube controlado. Más volumen suele pedir más capacidad encendida, más rapidez suele pedir recursos reservados y menos costo pide lo contrario. Cada decisión de arquitectura equilibraba capacidad, demora y costo.',
        ],
        result: [
          'Entregué una arquitectura serverless y un backend de ingesta IoT que alimenta el monitoreo en tiempo real de Quindío Inteligente. Los contenedores efímeros y los servicios bajo demanda redujeron los costos de nube del proyecto.',
        ],
      },
      en: {
        title: 'Quindío Inteligente: serverless IoT ingestion',
        summary:
          'Serverless architecture on AWS and a Python backend that ingest high volume IoT data over MQTT for real time monitoring, with lower cloud cost.',
        role: 'Cloud and IoT solutions architect',
        organization: 'Grupo de Innovación EAM, project with EDEQ',
        period: 'Jun 2024 to Sep 2025',
        context: [
          'Quindío Inteligente was a project of the Grupo de Innovación EAM, in Armenia, carried out with EDEQ. Its technical goal was to receive data from IoT devices and show it in real time monitoring.',
        ],
        problem: [
          'The devices send messages continuously and in high volume. The system had to absorb them without losing the pace of real time monitoring, and do it without paying for infrastructure that sits idle.',
        ],
        myRole: [
          'I was the cloud and IoT solutions architect. I designed the serverless architecture of the project with AWS Lambda and Docker and built the Python backend that ingests the messages over MQTT.',
        ],
        decisions: [
          {
            title: 'Serverless architecture with AWS Lambda and Docker',
            why: 'Compute is paid for when it is used and follows the message volume, with no servers of my own to manage. With Docker, the same code runs the same way in development and in the cloud, which makes it easier to test the ingestion before deploying it.',
          },
          {
            title: 'MQTT with Mosquitto as the entry point for the devices',
            why: 'MQTT is a lightweight protocol designed for IoT and Mosquitto is a mature broker. They fit devices that publish small, frequent messages, and they let the backend receive what gets published instead of polling the devices one by one.',
          },
          {
            title: 'Ephemeral containers and on demand services',
            why: 'Whatever is not processing messages does not stay on, and that reduced cloud costs. An ephemeral container is created to do work and disappears when it finishes, so cost follows the work done and not the time a service stays up.',
          },
        ],
        difficulty: [
          'Three demands that pull in different directions had to be combined: high message volume, real time response and a controlled cloud bill. More volume usually asks for more capacity kept on, more speed usually asks for reserved resources and lower cost asks for the opposite. Every architecture decision balanced capacity, delay and cost.',
        ],
        result: [
          'I delivered a serverless architecture and an IoT ingestion backend that feeds the real time monitoring of Quindío Inteligente. Ephemeral containers and on demand services reduced the cloud costs of the project.',
        ],
      },
    },
  },
  {
    slug: 'warehouse-conveyor-backend',
    stack: ['Selenium', 'Docker', 'Azure', 'Bubble', 'WMS'],
    copy: {
      es: {
        title: 'Backend de banda transportadora de bodega',
        summary:
          'Backend crítico de una banda de clasificación automatizada (WMS) con respuesta menor a 1 segundo, y migración de automatizaciones a Selenium en Docker sobre Azure.',
        role: 'Desarrollador de software',
        organization: 'Atlanticsoft',
        period: 'Ago 2021 a May 2024',
        context: [
          'En Atlanticsoft trabajé para un cliente de logística, cuyo nombre se reserva. Su bodega usa una banda transportadora automatizada de clasificación, gestionada por un sistema de gestión de bodegas (WMS), por donde avanzan paquetes físicos.',
        ],
        problem: [
          'La banda no espera: mientras el backend decide, el paquete sigue avanzando. Si la respuesta llega tarde, el sistema y la banda se desincronizan. El requisito era responder en menos de 1 segundo.',
          'Aparte, las automatizaciones de pedidos corrían como extensiones de Chrome y producían cancelaciones de pedidos que había que reducir.',
        ],
        myRole: [
          'Desarrollador de software. Construí el backend crítico de la banda, migré las automatizaciones de extensiones de Chrome a clústeres de Selenium en Docker sobre Azure y entregué las interfaces de control de bodega en Bubble, integradas con el backend.',
        ],
        decisions: [
          {
            title: 'Un backend diseñado para responder en menos de 1 segundo',
            why: 'Cada respuesta tardía desincroniza un paquete físico, así que el tiempo de respuesta era un requisito de funcionamiento y no una métrica de rendimiento deseable.',
          },
          {
            title: 'Clústeres de Selenium en Docker sobre Azure en lugar de extensiones de Chrome',
            why: 'Un clúster en contenedores se replica, se reinicia y se vigila de forma centralizada, algo que las extensiones de Chrome no permiten. Tras la migración, las cancelaciones de pedidos bajaron de forma notable.',
          },
          {
            title: 'Interfaces de control en Bubble integradas con el backend',
            why: 'Dieron a la operación de la bodega pantallas de control sin construir un frontend a medida, conectadas al mismo backend.',
          },
        ],
        difficulty: [
          'El software tiene que ir al ritmo de objetos físicos en movimiento: no hay margen para una respuesta lenta y un fallo se nota en la bodega, no solo en un registro. Además, migrar las automatizaciones de Chrome a Selenium en contenedores implicaba cambiar la base de procesos que ya estaban en uso.',
        ],
        result: [
          'El backend mantuvo tiempos de respuesta menores a 1 segundo, y con eso los paquetes físicos y el sistema siguieron sincronizados. La migración a clústeres de Selenium en Docker sobre Azure redujo de forma notable las cancelaciones de pedidos, y las interfaces en Bubble dieron control de la bodega sobre el mismo backend.',
        ],
        confidentiality: 'Cliente y detalles internos reservados por confidencialidad.',
      },
      en: {
        title: 'Warehouse conveyor backend',
        summary:
          'Critical backend of an automated sorting conveyor (WMS) with responses under 1 second, and a migration of automations to Selenium on Docker on Azure.',
        role: 'Software developer',
        organization: 'Atlanticsoft',
        period: 'Aug 2021 to May 2024',
        context: [
          'At Atlanticsoft I worked for a logistics client whose name is withheld. Its warehouse runs an automated sorting conveyor, managed by a warehouse management system (WMS), along which physical parcels travel.',
        ],
        problem: [
          'The conveyor does not wait: while the backend decides, the parcel keeps moving. If the response arrives late, the system and the conveyor fall out of sync. The requirement was to respond in under 1 second.',
          'Separately, the order automations ran as Chrome extensions and produced order cancellations that had to come down.',
        ],
        myRole: [
          'Software developer. I built the critical backend of the conveyor, migrated the automations from Chrome extensions to Selenium clusters on Docker on Azure, and delivered the warehouse control interfaces in Bubble, integrated with the backend.',
        ],
        decisions: [
          {
            title: 'A backend designed to respond in under 1 second',
            why: 'Every late response puts a physical parcel out of sync, so response time was an operating requirement and not a nice to have performance metric.',
          },
          {
            title: 'Selenium clusters on Docker on Azure instead of Chrome extensions',
            why: 'A cluster of containers is replicated, restarted and watched from one place, which Chrome extensions do not allow. After the migration, order cancellations dropped sharply.',
          },
          {
            title: 'Control interfaces in Bubble integrated with the backend',
            why: 'They gave warehouse operations control screens without building a custom front end, connected to the same backend.',
          },
        ],
        difficulty: [
          'The software has to keep pace with physical objects in motion: there is no room for a slow response and a failure shows up on the warehouse floor, not only in a log. On top of that, moving the Chrome automations to Selenium in containers meant changing the base of processes that were already in use.',
        ],
        result: [
          'The backend kept response times under 1 second, and with that the physical parcels and the system stayed in sync. The migration to Selenium clusters on Docker on Azure sharply reduced order cancellations, and the Bubble interfaces gave warehouse control on top of the same backend.',
        ],
        confidentiality: 'Client and internal details are withheld for confidentiality.',
      },
    },
  },
]

export function isCaseSlug(value: string): value is CaseSlug {
  return (caseSlugs as readonly string[]).includes(value)
}

export function getCase(slug: CaseSlug): CaseStudy {
  const entry = cases.find((candidate) => candidate.slug === slug)
  if (!entry) throw new Error(`Unknown case: ${slug}`)
  return entry
}
