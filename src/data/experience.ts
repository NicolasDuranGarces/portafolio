import type { Lang } from '../components/LanguageProvider'

export type ExperienceItem = {
  company: string
  role: string
  period: string
  location?: string
  achievements: string[]
  stack?: string[]
  logos?: string[]  // For companies with multiple logos (e.g., EAM + EDEQ)
}

export const experience: Record<Lang, ExperienceItem[]> = {
  es: [
    // Ordenado cronológicamente de más antiguo a más reciente
    {
      company: 'Atlanticsoft',
      role: 'Software Developer (Prácticas)',
      period: 'feb. 2021 — ago. 2021',
      location: 'Armenia, Quindío, Colombia',
      achievements: [
        'Apoyo en desarrollo y QA automatizado',
        'Automatización con Appium y JavaScript',
      ],
      stack: ['JavaScript', 'Appium'],
    },
    {
      company: 'Atlanticsoft',
      role: 'Software Developer',
      period: 'ago. 2021 — may. 2024',
      location: 'Colombia · Jornada completa',
      achievements: [
        'Backend para correa automática en bodega; respuesta < 1s',
        'Automatizaciones para compras masivas (BestBuy, Walmart, Amazon) usando VMs',
        'Microservicios y Lambdas para gestión de números de seguimiento',
        'Automatizaciones con extensiones de Chrome',
      ],
      stack: ['Python', 'JavaScript', 'AWS Lambda', 'Docker', 'VMs', 'Chrome Extensions'],
    },
    {
      company: 'Institución Universitaria EAM',
      role: 'Profesor',
      period: 'ago. 2023 — jun. 2025',
      location: 'Armenia, Quindío, Colombia · Presencial · Jornada parcial',
      achievements: [
        'Lógica de programación y diseño de software',
        'Construcción de apps empresariales con Spring Boot',
        'Microservicios con Python y FastAPI; despliegues serverless en AWS (ECR + Lambda)',
      ],
      stack: ['Docencia', 'Spring Boot', 'FastAPI', 'AWS Lambda', 'ECR'],
    },
    {
      company: 'BetterWay Devs',
      role: 'Software Engineer',
      period: 'may. 2024 — Actualidad',
      location: 'Jornada completa · Remoto/Colombia',
      achievements: [
        'Automatizaciones y QA con Selenium + Python',
        'Reconocimiento de imágenes para lectura de números de seguimiento (OCR) con tiempos < 2s',
        'Soporte en features backend/frontend y mejora continua del pipeline',
      ],
      stack: ['Python', 'Selenium', 'OCR', 'JavaScript', 'Docker', 'AWS'],
    },
    {
      company: 'EAM + EDEQ',
      role: 'Arquitecto de soluciones',
      period: 'jun. 2024 — sep. 2025',
      location: 'Armenia, Quindío · Proyecto universidad-empresa',
      achievements: [
        'Diseño e implementación de la arquitectura en AWS para la plataforma Quindío Inteligente',
        'Backend en Python para ingestar y publicar mensajes MQTT utilizando Mosquitto en contenedores Docker',
        'Optimización de la app reduciendo los tiempos de respuesta mediante mejoras en infraestructura y mensajería',
      ],
      stack: ['AWS', 'EC2', 'Lambda', 'Docker', 'Mosquitto', 'MQTT', 'Python', 'Serverless'],
      logos: ['/assets/eam-logo.png', '/assets/logo-edeq.png'],
    },
    {
      company: 'EAM + Osmed Gateway',
      role: 'Full Stack Developer & Founder',
      period: 'sep. 2024 — sep. 2025',
      location: 'Armenia, Quindío · Proyecto universidad-empresa',
      achievements: [
        'Creación desde cero de plataforma para historias clínicas electrónicas',
        'Sistema de gestión de horarios de médicos con múltiples roles',
        'Desarrollo de aplicación móvil para iOS',
        'Desarrollo de plataforma web completa',
      ],
      stack: ['React', 'React Native', 'iOS', 'Node.js', 'PostgreSQL', 'AWS'],
      logos: ['/assets/eam-logo.png'],
    },
  ],
  en: [
    // Ordered chronologically from oldest to newest
    {
      company: 'Atlanticsoft',
      role: 'Software Developer (Internship)',
      period: 'Feb 2021 — Aug 2021',
      location: 'Armenia, Quindío, Colombia',
      achievements: [
        'Support across development and automated QA',
        'Automation with Appium and JavaScript',
      ],
      stack: ['JavaScript', 'Appium'],
    },
    {
      company: 'Atlanticsoft',
      role: 'Software Developer',
      period: 'Aug 2021 — May 2024',
      location: 'Colombia · Full-time',
      achievements: [
        'Warehouse conveyor backend delivering responses under 1 second',
        'Bulk purchase automations (BestBuy, Walmart, Amazon) using VMs',
        'Microservices and Lambdas to manage tracking numbers',
        'Automation with Chrome extensions',
      ],
      stack: ['Python', 'JavaScript', 'AWS Lambda', 'Docker', 'VMs', 'Chrome Extensions'],
    },
    {
      company: 'Institución Universitaria EAM',
      role: 'Professor',
      period: 'Aug 2023 — Jun 2025',
      location: 'Armenia, Quindío, Colombia · On-site · Part-time',
      achievements: [
        'Programming fundamentals and software design',
        'Enterprise apps with Spring Boot',
        'Microservices with Python and FastAPI; serverless deployments on AWS (ECR + Lambda)',
      ],
      stack: ['Teaching', 'Spring Boot', 'FastAPI', 'AWS Lambda', 'ECR'],
    },
    {
      company: 'BetterWay Devs',
      role: 'Software Engineer',
      period: 'May 2024 — Present',
      location: 'Full-time · Remote/Colombia',
      achievements: [
        'Automation suites and QA with Selenium + Python',
        'Image recognition for tracking numbers (OCR) under 2 seconds',
        'Support across backend/frontend features and pipeline improvements',
      ],
      stack: ['Python', 'Selenium', 'OCR', 'JavaScript', 'Docker', 'AWS'],
    },
    {
      company: 'EAM + EDEQ',
      role: 'Solutions Architect',
      period: 'Jun 2024 — Sep 2025',
      location: 'Armenia, Quindío · University-industry project',
      achievements: [
        'Designed and implemented the AWS architecture for the Quindío Inteligente platform',
        'Built a Python backend to ingest and publish MQTT messages with Mosquitto running in Docker',
        'Improved app response times by tuning the infrastructure and messaging pipelines',
      ],
      stack: ['AWS', 'EC2', 'Lambda', 'Docker', 'Mosquitto', 'MQTT', 'Python', 'Serverless'],
      logos: ['/assets/eam-logo.png', '/assets/logo-edeq.png'],
    },
    {
      company: 'EAM + Osmed Gateway',
      role: 'Full Stack Developer & Founder',
      period: 'Sep 2024 — Sep 2025',
      location: 'Armenia, Quindío · University-industry project',
      achievements: [
        'Built from scratch a platform for electronic health records',
        'Doctor scheduling system with multiple roles management',
        'iOS mobile application development',
        'Full web platform development',
      ],
      stack: ['React', 'React Native', 'iOS', 'Node.js', 'PostgreSQL', 'AWS'],
      logos: ['/assets/eam-logo.png'],
    },
  ],
}
