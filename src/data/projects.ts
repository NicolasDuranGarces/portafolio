import type { Lang } from '../components/LanguageProvider'

export type LocalizedText = Record<Lang, string>
export type ProjectCategory = 'backend' | 'frontend' | 'devops' | 'data' | 'mobile'

export type Project = {
  slug: string
  title: LocalizedText
  description: LocalizedText
  category: ProjectCategory
  tags: string[]
  links?: { href: string; label: LocalizedText }[]
  image?: string // URL o base64; opcional
  highlights?: LocalizedText[]
}

export type ResolvedProject = {
  slug: string
  title: string
  description: string
  category: ProjectCategory
  tags: string[]
  links?: { href: string; label: string }[]
  image?: string
  highlights?: string[]
}

export const allTags = [
  'Java', 'Spring Boot', 'Spring Cloud', 'RabbitMQ',
  'Python', 'FastAPI', 'Django', 'SQLModel', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Celery',
  'JavaScript', 'Express', 'Serverless', 'Node.js',
  'React', 'TypeScript', 'Vite', 'Tailwind', 'Next.js', 'GraphQL', 'Framer Motion',
  'Docker', 'Nginx', 'Kubernetes', 'GitHub Actions', 'CI/CD', 'Testing',
  'AWS Lambda', 'EC2', 'Fargate', 'DynamoDB', 'RDS',
  'WebSockets', 'Stripe', 'Airflow', 'Pandas', 'Supabase', 'Go',
  'Chrome Extension', 'Manifest V3', 'LZ-String', 'Chrome Sync', 'CSS',
] as const

export const projects: Project[] = [
  // ⭐ FEATURED PROJECT - Caturro Café
  {
    slug: 'caturro-cafe',
    title: {
      es: 'Caturro Café — Ecosistema Digital Completo',
      en: 'Caturro Café — Complete Digital Ecosystem',
    },
    description: {
      es: 'Suite integral para cafetería artesanal con 4 sistemas containerizados: POS con Next.js para gestión operativa, Spinner con FastAPI para fidelización, Scheduler con Express para nómina, y Landing optimizada con Nginx.',
      en: 'Complete artisan coffee shop suite with 4 containerized systems: Next.js POS for operations, FastAPI Spinner for loyalty, Express Scheduler for payroll, and Nginx-optimized Landing.',
    },
    category: 'frontend',
    tags: ['Next.js', 'FastAPI', 'Express', 'React', 'Prisma', 'MySQL', 'Docker', 'Nginx'],
    links: [
      { label: { es: 'POS', en: 'POS' }, href: 'https://github.com/NicolasDuranGarces/caturro-point-of-sale' },
      { label: { es: 'Spinner', en: 'Spinner' }, href: 'https://github.com/NicolasDuranGarces/spinner-caturro-cafe' },
      { label: { es: 'Scheduler', en: 'Scheduler' }, href: 'https://github.com/NicolasDuranGarces/caturro-scheduler-payments' },
      { label: { es: 'Landing', en: 'Landing' }, href: 'https://github.com/NicolasDuranGarces/caturro-cafe-landing-page' },
    ],
    highlights: [
      { es: '🏪 POS: Next.js 15 + Express + Prisma/MySQL — Inventario, ventas, turnos, UI tablet', en: '🏪 POS: Next.js 15 + Express + Prisma/MySQL — Inventory, sales, shifts, tablet UI' },
      { es: '🎡 Spinner: FastAPI + Vite/React — Ruleta, puntos por compra, tienda de premios', en: '🎡 Spinner: FastAPI + Vite/React — Wheel, purchase points, rewards store' },
      { es: '📅 Scheduler: Express + React/TS + Prisma — Turnos, asistencia, cálculo de nómina', en: '📅 Scheduler: Express + React/TS + Prisma — Shifts, attendance, payroll calculation' },
      { es: '🌐 Landing: HTML/CSS/JS + Nginx — Parallax, A11y, cache optimizado', en: '🌐 Landing: HTML/CSS/JS + Nginx — Parallax, A11y, optimized caching' },
    ],
  },
  {
    slug: 'atlas-distributed-commerce',
    title: {
      es: 'Atlas — E-commerce Distribuido',
      en: 'Atlas — Distributed Commerce',
    },
    description: {
      es: 'Sistema backend cloud-native escalable que demuestra patrones modernos de arquitectura de microservicios. Construido con Spring Boot y Spring Cloud.',
      en: 'Scalable cloud-native backend system demonstrating modern microservices architecture patterns. Built with Spring Boot and Spring Cloud.',
    },
    category: 'backend',
    tags: ['Java', 'Spring Boot', 'Spring Cloud', 'Docker', 'RabbitMQ', 'Redis', 'PostgreSQL', 'Kubernetes'],
    links: [
      { label: { es: 'Código', en: 'Code' }, href: 'https://github.com/NicolasDuranGarces/atlas-distributed-commerce' },
    ],
    highlights: [
      { es: 'Patrón SAGA para transacciones distribuidas', en: 'SAGA pattern for distributed transactions' },
      { es: 'Circuit Breakers con Resilience4j', en: 'Circuit Breakers with Resilience4j' },
      { es: 'API Gateway con rate limiting y seguridad', en: 'API Gateway with rate limiting and security' },
      { es: 'Observabilidad: Prometheus, Grafana, Zipkin', en: 'Observability: Prometheus, Grafana, Zipkin' },
    ],
  },
  {
    slug: 'tab-vault',
    title: {
      es: 'Tab Vault — Gestión de Sesiones',
      en: 'Tab Vault — Session Manager',
    },
    description: {
      es: 'Extensión Chrome que revoluciona la gestión de tabs y sesiones del navegador. Recuperación ante crashes, sincronización y búsqueda inteligente.',
      en: 'Chrome extension that revolutionizes browser tab and session management. Crash recovery, sync, and intelligent search.',
    },
    category: 'frontend',
    tags: ['TypeScript', 'Chrome Extension', 'Manifest V3', 'LZ-String', 'Chrome Sync'],
    links: [
      { label: { es: 'Código', en: 'Code' }, href: 'https://github.com/NicolasDuranGarces/tab-vault' },
    ],
    highlights: [
      { es: 'Guardado de sesiones con un click', en: 'One-click session capture' },
      { es: 'Recuperación ante crashes del navegador', en: 'Browser crash recovery' },
      { es: 'Compresión LZ-String para optimización', en: 'LZ-String compression for optimization' },
    ],
  },
  {
    slug: 'roastsync',
    title: {
      es: 'RoastSync — Gestión de Tostión',
      en: 'RoastSync — Roasting Management',
    },
    description: {
      es: 'Plataforma full-stack para monitorear y optimizar ciclos de tostión de café. Backend FastAPI con panel React + Vite.',
      en: 'Full-stack platform to monitor and optimize coffee roasting cycles. FastAPI backend with React + Vite dashboard.',
    },
    category: 'backend',
    tags: ['Python', 'FastAPI', 'React', 'Vite', 'Docker', 'PostgreSQL'],
    links: [
      { label: { es: 'Demo', en: 'Live' }, href: 'https://roastsync.nexori.co/' },
      { label: { es: 'Código', en: 'Code' }, href: 'https://github.com/NicolasDuranGarces/RoastFlow' },
    ],
    highlights: [
      { es: 'Orquestación de perfiles en tiempo real', en: 'Real-time profile orchestration' },
      { es: 'API FastAPI con autenticación JWT', en: 'FastAPI with JWT authentication' },
      { es: 'Panel React responsivo', en: 'Responsive React dashboard' },
    ],
  },
  {
    slug: 'jaltech-print-api',
    title: {
      es: 'Jaltech Print — Impresora POS Inalámbrica',
      en: 'Jaltech Print — Wireless POS Printer',
    },
    description: {
      es: 'API que convierte una impresora POS Jaltech en inalámbrica mediante Raspberry Pi. Permite facturar desde tablets en todo el establecimiento.',
      en: 'API that turns a Jaltech POS printer wireless via Raspberry Pi. Enables billing from tablets anywhere in the establishment.',
    },
    category: 'backend',
    tags: ['Python', 'Raspberry Pi', 'REST API', 'IoT', 'Hardware'],
    links: [
      { label: { es: 'Código', en: 'Code' }, href: 'https://github.com/NicolasDuranGarces/jaltech-print-api' },
    ],
    highlights: [
      { es: 'Comunicación serial con impresora térmica', en: 'Serial communication with thermal printer' },
      { es: 'API REST para impresión remota', en: 'REST API for remote printing' },
      { es: 'Despliegue en Raspberry Pi', en: 'Raspberry Pi deployment' },
    ],
  },
  {
    slug: 'portfolio-v2',
    title: {
      es: 'Portfolio v2 (este sitio)',
      en: 'Portfolio v2 (this site)',
    },
    description: {
      es: 'Portafolio profesional con animaciones premium, glassmorphism, y modo oscuro. Construido con React + Vite + TypeScript.',
      en: 'Professional portfolio with premium animations, glassmorphism, and dark mode. Built with React + Vite + TypeScript.',
    },
    category: 'frontend',
    tags: ['React', 'TypeScript', 'Vite', 'Framer Motion', 'CSS'],
    links: [
      { label: { es: 'Código', en: 'Code' }, href: 'https://github.com/NicolasDuranGarces/portafolio' },
    ],
    highlights: [
      { es: 'Animaciones con Framer Motion', en: 'Framer Motion animations' },
      { es: 'Accesibilidad (A11y)', en: 'Accessibility (A11y)' },
      { es: 'Tema Dark/Light dinámico', en: 'Dynamic Dark/Light theme' },
    ],
  },
]

export function getProjects(lang: Lang): ResolvedProject[] {
  return projects.map(project => ({
    slug: project.slug,
    title: project.title[lang],
    description: project.description[lang],
    category: project.category,
    tags: project.tags,
    image: project.image,
    links: project.links?.map(link => ({ href: link.href, label: link.label[lang] })),
    highlights: project.highlights?.map(highlight => highlight[lang]),
  }))
}
