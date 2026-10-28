import type { Localized } from '../lib/lang'
import { site } from '../lib/site'

type ProjectLink = {
  href: string
  /** Defaults to the generic "view on GitHub" label. */
  label?: Localized<string>
}

type OpenProject = {
  id: string
  links: readonly ProjectLink[]
  tags: readonly string[]
  copy: Localized<{ name: string; description: string }>
}

const repo = (name: string) => `${site.github}/${name}`

/** Public repositories only. Descriptions checked against each repo README or description. */
export const openProjects: readonly OpenProject[] = [
  {
    id: 'atlas',
    links: [{ href: repo('atlas-distributed-commerce') }],
    tags: ['Java', 'SAGA', 'RabbitMQ', 'Eureka', 'Resilience4j', 'Prometheus', 'Grafana', 'Zipkin'],
    copy: {
      es: {
        name: 'Atlas distributed commerce',
        description:
          'Backend de comercio electrónico distribuido con microservicios Spring Boot: transacciones SAGA, circuit breakers con Resilience4j, API Gateway con límite de peticiones y observabilidad con Prometheus, Grafana y Zipkin.',
      },
      en: {
        name: 'Atlas distributed commerce',
        description:
          'Distributed ecommerce backend with Spring Boot microservices: SAGA transactions, Resilience4j circuit breakers, a rate limited API Gateway and observability with Prometheus, Grafana and Zipkin.',
      },
    },
  },
  {
    id: 'mcp-text-to-sql',
    links: [{ href: repo('mcp-text-to-sql') }],
    tags: ['Python', 'MCP', 'FastAPI', 'Docker'],
    copy: {
      es: {
        name: 'MCP text to SQL',
        description:
          'Servidor MCP en Python que traduce preguntas en lenguaje natural a consultas sobre PostgreSQL, MySQL, SQLite, MongoDB, CSV y Excel, con modo de solo lectura.',
      },
      en: {
        name: 'MCP text to SQL',
        description:
          'Python MCP server that turns natural language questions into queries over PostgreSQL, MySQL, SQLite, MongoDB, CSV and Excel, with a read only mode.',
      },
    },
  },
  {
    id: 'caturro',
    links: [
      { href: repo('caturro-point-of-sale'), label: { es: 'Punto de venta', en: 'Point of sale' } },
      { href: repo('spinner-caturro-cafe'), label: { es: 'Fidelización', en: 'Loyalty' } },
      { href: repo('caturro-scheduler-payments'), label: { es: 'Turnos y pagos', en: 'Shifts and payroll' } },
      { href: repo('caturro-cafe-landing-page'), label: { es: 'Landing', en: 'Landing page' } },
    ],
    tags: ['Next.js', 'FastAPI', 'Express', 'Prisma', 'MySQL', 'Docker', 'Nginx'],
    copy: {
      es: {
        name: 'Ecosistema Caturro Café',
        description:
          'Cuatro sistemas en contenedores para una cafetería: punto de venta, fidelización con ruleta y puntos, turnos y pagos del equipo, y una landing.',
      },
      en: {
        name: 'Caturro Café ecosystem',
        description:
          'Four containerized systems for a coffee shop: point of sale, loyalty with a points roulette, team shifts and payroll, and a landing page.',
      },
    },
  },
  {
    id: 'tab-vault',
    links: [{ href: repo('tab-vault') }],
    tags: ['TypeScript', 'Chrome MV3'],
    copy: {
      es: {
        name: 'Tab Vault',
        description:
          'Extensión de Chrome (Manifest V3) en TypeScript para guardar, organizar y restaurar sesiones de pestañas, con recuperación automática tras un cierre inesperado.',
      },
      en: {
        name: 'Tab Vault',
        description:
          'Chrome extension (Manifest V3) in TypeScript to save, organize and restore tab sessions, with automatic recovery after an unexpected close.',
      },
    },
  },
  {
    id: 'superset-themes',
    links: [{ href: repo('superset-themes') }],
    tags: ['JSON'],
    copy: {
      es: {
        name: 'Superset themes',
        description:
          'Temas de color gratuitos para Superset, una app de agentes de programación con IA: Dracula, Nord, Gruvbox, Catppuccin, Rosé Pine, Solarized Dark y más, en JSON listo para usar.',
      },
      en: {
        name: 'Superset themes',
        description:
          'Free color themes for Superset, an AI coding agent app: Dracula, Nord, Gruvbox, Catppuccin, Rosé Pine, Solarized Dark and more, as drop in JSON.',
      },
    },
  },
  {
    id: 'jaltech-print-api',
    links: [{ href: repo('jaltech-print-api') }],
    tags: ['Python', 'FastAPI', 'Raspberry Pi', 'ESC/POS'],
    copy: {
      es: {
        name: 'Jaltech print API',
        description:
          'API REST con FastAPI y ESC/POS para controlar por USB una impresora térmica POS de 58 mm y su cajón de dinero desde una Raspberry Pi.',
      },
      en: {
        name: 'Jaltech print API',
        description:
          'REST API with FastAPI and ESC/POS to control a 58 mm thermal POS printer and its cash drawer over USB from a Raspberry Pi.',
      },
    },
  },
]
