export type Link = { label: string; href: string }
export type Project = {
  slug: string
  title: string
  description: string
  category: 'Backend' | 'Frontend' | 'DevOps' | 'Data' | 'Mobile'
  tags: string[]
  links?: Link[]
  image?: string // URL o base64; opcional
  highlights?: string[]
}

export const allTags = [
  'Python', 'FastAPI', 'Django', 'SQLModel', 'PostgreSQL', 'Redis', 'Celery',
  'React', 'TypeScript', 'Vite', 'Tailwind', 'Next.js', 'GraphQL',
  'Docker', 'Nginx', 'Kubernetes', 'GitHub Actions', 'CI/CD', 'Testing',
  'WebSockets', 'Stripe', 'Airflow', 'Pandas', 'Supabase'
] as const

export const projects: Project[] = [
  {
    slug: 'fastapi-tasks',
    title: 'API de tareas con FastAPI',
    description: 'API REST con autenticación JWT, SQLModel, tests y despliegue en contenedor.',
    category: 'Backend',
    tags: ['Python', 'FastAPI', 'SQLModel', 'Docker', 'Testing'],
    links: [
      { label: 'Código', href: 'https://github.com/tu-usuario/fastapi-tasks' },
    ],
    highlights: ['Autenticación JWT', 'OpenAPI', 'Tests con PyTest'],
  },
  {
    slug: 'react-dashboard',
    title: 'Dashboard React + Vite',
    description: 'SPA responsiva con estados, rutas y componentes accesibles.',
    category: 'Frontend',
    tags: ['React', 'TypeScript', 'Vite'],
    links: [
      { label: 'Demo', href: 'https://tusitio.com/demo' },
      { label: 'Código', href: 'https://github.com/tu-usuario/react-dashboard' },
    ],
    highlights: ['Animaciones', 'Dark Mode', 'Bundle ligero'],
  },
  {
    slug: 'celery-workers',
    title: 'Servicio de colas y workers',
    description: 'Procesamiento asíncrono de jobs con Celery + Redis y métricas.',
    category: 'DevOps',
    tags: ['Celery', 'Redis', 'Docker', 'CI/CD'],
    highlights: ['Retries', 'Observabilidad', 'Escalabilidad'],
  },
  {
    slug: 'django-shop',
    title: 'E-commerce con Django',
    description: 'Tienda completa con carrito, checkout (Stripe) y panel de administración.',
    category: 'Backend',
    tags: ['Python', 'Django', 'PostgreSQL', 'Stripe', 'Docker'],
    links: [{ label: 'Código', href: 'https://github.com/tu-usuario/django-shop' }],
    highlights: ['Autorización granular', 'Webhooks', 'Migraciones y fixtures'],
  },
  {
    slug: 'fastapi-realtime',
    title: 'Notificaciones en tiempo real',
    description: 'WebSockets con FastAPI para eventos en vivo y colas Redis.',
    category: 'Backend',
    tags: ['FastAPI', 'WebSockets', 'Redis', 'Docker'],
    links: [{ label: 'Código', href: 'https://github.com/tu-usuario/fastapi-realtime' }],
    highlights: ['Escalado horizontal', 'Backpressure', 'JWT en WS'],
  },
  {
    slug: 'portfolio-v2',
    title: 'Portfolio v2 (este sitio)',
    description: 'UI moderna con animaciones, filtros y modo oscuro.',
    category: 'Frontend',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind'],
    highlights: ['Framer Motion', 'A11y', 'Dark/Light Theme'],
  },
  {
    slug: 'ci-cd-pipeline',
    title: 'Pipeline CI/CD',
    description: 'Build, test y deploy automatizados con GitHub Actions y contenedores.',
    category: 'DevOps',
    tags: ['GitHub Actions', 'CI/CD', 'Docker', 'Kubernetes'],
    highlights: ['Versionado semántico', 'Cache de dependencias', 'Artefactos'],
  },
  {
    slug: 'etl-airflow',
    title: 'ETL con Airflow',
    description: 'Ingesta y transformación de datos con DAGs, alertas y reportes.',
    category: 'Data',
    tags: ['Airflow', 'Pandas', 'PostgreSQL', 'Docker'],
    highlights: ['DAGs parametrizados', 'Backfills', 'Monitoreo'],
  },
]
