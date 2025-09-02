export type ExperienceItem = {
  company: string
  role: string
  period: string
  location?: string
  achievements: string[]
  stack?: string[]
}

export const experience: ExperienceItem[] = [
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
]
