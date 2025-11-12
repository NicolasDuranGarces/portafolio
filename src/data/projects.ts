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
  'Python', 'FastAPI', 'Django', 'SQLModel', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Celery',
  'JavaScript', 'Express', 'Serverless',
  'React', 'TypeScript', 'Vite', 'Tailwind', 'Next.js', 'GraphQL',
  'Docker', 'Nginx', 'Kubernetes', 'GitHub Actions', 'CI/CD', 'Testing',
  'AWS Lambda', 'EC2', 'Fargate', 'DynamoDB', 'RDS',
  'WebSockets', 'Stripe', 'Airflow', 'Pandas', 'Supabase', 'Go'
] as const

export const projects: Project[] = [
  {
    slug: 'roastsync',
    title: {
      es: 'RoastSync — Gestión de tostión de café',
      en: 'RoastSync — Coffee roasting management',
    },
    description: {
      es: 'Plataforma full-stack para monitorear y optimizar ciclos de tostión, con backend en FastAPI y panel React + Vite.',
      en: 'Full-stack platform to monitor and optimize coffee roasting cycles, powered by FastAPI and a React + Vite dashboard.',
    },
    category: 'backend',
    tags: ['Python', 'FastAPI', 'React', 'Vite', 'Docker'],
    links: [
      { label: { es: 'Demo', en: 'Live' }, href: 'https://roastsync.nexori.co/' },
      { label: { es: 'Código', en: 'Code' }, href: 'https://github.com/NicolasDuranGarces/RoastFlow' },
    ],
    highlights: [
      { es: 'Orquestación de perfiles de tostión en tiempo real', en: 'Real-time roasting profile orchestration' },
      { es: 'API FastAPI con documentación y autenticación', en: 'FastAPI backend with docs and authentication' },
      { es: 'Panel React responsivo con Vite', en: 'Responsive React dashboard built with Vite' },
    ],
  },
  {
    slug: 'react-dashboard',
    title: {
      es: 'Dashboard React + Vite',
      en: 'React + Vite dashboard',
    },
    description: {
      es: 'SPA responsiva con estados, rutas y componentes accesibles.',
      en: 'Responsive SPA with state management, routing, and accessible components.',
    },
    category: 'frontend',
    tags: ['React', 'TypeScript', 'Vite'],
    links: [
      { label: { es: 'Demo', en: 'Demo' }, href: 'https://tusitio.com/demo' },
      { label: { es: 'Código', en: 'Code' }, href: 'https://github.com/tu-usuario/react-dashboard' },
    ],
    highlights: [
      { es: 'Animaciones', en: 'Animations' },
      { es: 'Dark Mode', en: 'Dark mode' },
      { es: 'Bundle ligero', en: 'Lightweight bundle' },
    ],
  },
  {
    slug: 'celery-workers',
    title: {
      es: 'Servicio de colas y workers',
      en: 'Queue and worker service',
    },
    description: {
      es: 'Procesamiento asíncrono de jobs con Celery + Redis y métricas.',
      en: 'Asynchronous job processing with Celery + Redis plus observability.',
    },
    category: 'devops',
    tags: ['Celery', 'Redis', 'Docker', 'CI/CD'],
    highlights: [
      { es: 'Retries', en: 'Retries' },
      { es: 'Observabilidad', en: 'Observability' },
      { es: 'Escalabilidad', en: 'Scalability' },
    ],
  },
  {
    slug: 'django-shop',
    title: {
      es: 'E-commerce con Django',
      en: 'Django e-commerce',
    },
    description: {
      es: 'Tienda completa con carrito, checkout (Stripe) y panel de administración.',
      en: 'Full store with cart, Stripe checkout, and admin panel.',
    },
    category: 'backend',
    tags: ['Python', 'Django', 'PostgreSQL', 'Stripe', 'Docker'],
    links: [{ label: { es: 'Código', en: 'Code' }, href: 'https://github.com/tu-usuario/django-shop' }],
    highlights: [
      { es: 'Autorización granular', en: 'Granular authorization' },
      { es: 'Webhooks', en: 'Webhooks' },
      { es: 'Migraciones y fixtures', en: 'Migrations and fixtures' },
    ],
  },
  {
    slug: 'fastapi-realtime',
    title: {
      es: 'Notificaciones en tiempo real',
      en: 'Real-time notifications',
    },
    description: {
      es: 'WebSockets con FastAPI para eventos en vivo y colas Redis.',
      en: 'FastAPI WebSockets for live events backed by Redis queues.',
    },
    category: 'backend',
    tags: ['FastAPI', 'WebSockets', 'Redis', 'Docker'],
    links: [{ label: { es: 'Código', en: 'Code' }, href: 'https://github.com/tu-usuario/fastapi-realtime' }],
    highlights: [
      { es: 'Escalado horizontal', en: 'Horizontal scaling' },
      { es: 'Backpressure', en: 'Backpressure' },
      { es: 'JWT en WS', en: 'JWT over WebSockets' },
    ],
  },
  {
    slug: 'portfolio-v2',
    title: {
      es: 'Portfolio v2 (este sitio)',
      en: 'Portfolio v2 (this site)',
    },
    description: {
      es: 'UI moderna con animaciones, filtros y modo oscuro.',
      en: 'Modern UI with animations, filters, and dark mode.',
    },
    category: 'frontend',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind'],
    highlights: [
      { es: 'Framer Motion', en: 'Framer Motion' },
      { es: 'A11y', en: 'A11y' },
      { es: 'Dark/Light Theme', en: 'Dark/Light theme' },
    ],
  },
  {
    slug: 'ci-cd-pipeline',
    title: {
      es: 'Pipeline CI/CD',
      en: 'CI/CD pipeline',
    },
    description: {
      es: 'Build, test y deploy automatizados con GitHub Actions y contenedores.',
      en: 'Automated build, test, and deploy with GitHub Actions and containers.',
    },
    category: 'devops',
    tags: ['GitHub Actions', 'CI/CD', 'Docker', 'Kubernetes'],
    highlights: [
      { es: 'Versionado semántico', en: 'Semantic versioning' },
      { es: 'Cache de dependencias', en: 'Dependency caching' },
      { es: 'Artefactos', en: 'Artifacts' },
    ],
  },
  {
    slug: 'etl-airflow',
    title: {
      es: 'ETL con Airflow',
      en: 'Airflow ETL',
    },
    description: {
      es: 'Ingesta y transformación de datos con DAGs, alertas y reportes.',
      en: 'Data ingestion and transformation with DAGs, alerts, and reporting.',
    },
    category: 'data',
    tags: ['Airflow', 'Pandas', 'PostgreSQL', 'Docker'],
    highlights: [
      { es: 'DAGs parametrizados', en: 'Parameterized DAGs' },
      { es: 'Backfills', en: 'Backfills' },
      { es: 'Monitoreo', en: 'Monitoring' },
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
