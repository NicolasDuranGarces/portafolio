import type { Localized } from '../lib/lang'

type HomeCopy = {
  seo: { title: string; description: string; jobTitle: string }
  hero: {
    name: string
    /** The role sentence and the statement sit on separate lines of the h1. */
    role: string
    statement: string
    sub: string
    downloadCv: string
    emailMe: string
    proof: string
    photoAlt: string
  }
  tagline: { label: string; text: string }
  about: {
    paragraphs: string[]
    educationTitle: string
    education: { name: string; place: string; period: string }[]
    certificationsTitle: string
    certifications: string[]
    platziLabel: string
    platzi: string[]
    languagesTitle: string
    languages: { name: string; level: string }[]
  }
  contact: { text: string }
}

export const homeCopy: Localized<HomeCopy> = {
  es: {
    seo: {
      title: 'Nicolás Durán Garcés | Ingeniero backend e IA',
      description:
        'Ingeniero backend e IA con más de 5 años en producción: Python, Java y TypeScript sobre AWS. Fundador de Bheex. Busco un rol senior.',
      jobTitle: 'Ingeniero backend e IA',
    },
    hero: {
      name: 'Nicolás Durán Garcés',
      role: 'Ingeniero backend e IA.',
      statement: 'Construyo sistemas en producción con Python, Java y TypeScript sobre AWS.',
      sub: 'Más de 5 años entregando APIs, automatización a gran escala e IoT. Fundador de Bheex, un SaaS de atención con IA en producción. Busco un rol senior con responsabilidad sobre la arquitectura.',
      downloadCv: 'Descargar CV',
      emailMe: 'Escríbeme',
      proof: 'Armenia, Colombia · Remoto · Español nativo, inglés B1',
      photoAlt: 'Retrato de Nicolás Durán Garcés',
    },
    tagline: {
      label: 'Cómo diseño sistemas',
      text: 'Diseño sistemas que siguen funcionando cuando el volumen crece y nadie está mirando.',
    },
    about: {
      paragraphs: [
        'Soy ingeniero de software de Armenia, Quindío. Estudié Ingeniería de Software en la EAM y después fui profesor allí, de Ago 2023 a Jun 2025: dicté aplicaciones empresariales con Java Spring Boot y Docker, una electiva de microservicios con FastAPI y AWS Serverless, lógica de programación y diseño de software, y acompañé a mis estudiantes en arquitectura limpia y despliegue en la nube.',
        'Hoy construyo sistemas de IA y backend en producción. Fundé y opero Bheex, mi SaaS de atención al cliente con IA, trabajo como ingeniero de software en BetterWay Devs y tomo proyectos freelance de backend y full stack. Busco un rol senior con responsabilidad sobre la arquitectura.',
      ],
      educationTitle: 'Educación',
      education: [
        { name: 'Ingeniería de Software', place: 'Institución Universitaria EAM, Armenia', period: '2018 a 2022' },
        {
          name: 'Tecnólogo en Desarrollo de Software',
          place: 'Institución Universitaria EAM, Armenia',
          period: '2018 a 2021',
        },
        { name: 'Técnico en Programación de Software', place: 'SENA, Colombia', period: '2016 a 2017' },
      ],
      certificationsTitle: 'Certificaciones',
      certifications: [
        'IBM AI Developer Specialization (IBM)',
        'AWS Academy Graduate, Cloud Foundations (AWS)',
      ],
      platziLabel: 'Cursos en Platzi',
      platzi: [
        'Cloud Digital Leader',
        'Serverless Framework en AWS',
        'FastAPI',
        'Docker',
        'Arquitectura de Alta Concurrencia',
        'Arquitectura de Software',
        'Web Scraping con Python',
        'N8N',
      ],
      languagesTitle: 'Idiomas',
      languages: [
        { name: 'Español', level: 'nativo' },
        { name: 'Inglés', level: 'B1, lectura y escritura técnica fluida' },
      ],
    },
    contact: {
      text: 'Busco un rol senior de backend o de ingeniería de IA. Escríbeme por correo o por LinkedIn.',
    },
  },
  en: {
    seo: {
      title: 'Nicolás Durán Garcés | Backend and AI engineer',
      description:
        'Backend and AI engineer with 5+ years in production: Python, Java and TypeScript on AWS. Founder of Bheex. Looking for a senior role.',
      jobTitle: 'Backend and AI engineer',
    },
    hero: {
      name: 'Nicolás Durán Garcés',
      role: 'Backend and AI engineer.',
      statement: 'I build production systems in Python, Java and TypeScript on AWS.',
      sub: '5+ years shipping APIs, large scale automation and IoT. Founder of Bheex, an AI customer service SaaS in production. Looking for a senior role with ownership of architecture.',
      downloadCv: 'Download resume',
      emailMe: 'Email me',
      proof: 'Armenia, Colombia · Remote · Native Spanish, B1 English',
      photoAlt: 'Portrait of Nicolás Durán Garcés',
    },
    tagline: {
      label: 'How I design systems',
      text: 'I design systems that keep working when volume grows and nobody is watching.',
    },
    about: {
      paragraphs: [
        'I am a software engineer from Armenia, Quindío. I studied Software Engineering at EAM and then taught there, from Aug 2023 to Jun 2025: enterprise applications with Java Spring Boot and Docker, a microservices elective with FastAPI and AWS Serverless, programming logic and software design, mentoring students on clean architecture and cloud deployment.',
        'Today I build AI and backend systems in production. I founded and run Bheex, my AI customer service SaaS, work as a software engineer at BetterWay Devs and take freelance backend and full stack projects. I am looking for a senior role with ownership of architecture.',
      ],
      educationTitle: 'Education',
      education: [
        { name: 'Software Engineering', place: 'Institución Universitaria EAM, Armenia', period: '2018 to 2022' },
        {
          name: 'Software Development Technologist',
          place: 'Institución Universitaria EAM, Armenia',
          period: '2018 to 2021',
        },
        { name: 'Software Programming Technician', place: 'SENA, Colombia', period: '2016 to 2017' },
      ],
      certificationsTitle: 'Certifications',
      certifications: [
        'IBM AI Developer Specialization (IBM)',
        'AWS Academy Graduate, Cloud Foundations (AWS)',
      ],
      platziLabel: 'Platzi courses',
      platzi: [
        'Cloud Digital Leader',
        'Serverless Framework on AWS',
        'FastAPI',
        'Docker',
        'High Concurrency Architecture',
        'Software Architecture',
        'Web Scraping with Python',
        'N8N',
      ],
      languagesTitle: 'Languages',
      languages: [
        { name: 'Spanish', level: 'native' },
        { name: 'English', level: 'B1, fluent technical reading and writing' },
      ],
    },
    contact: {
      text: 'I am looking for a senior backend or AI engineering role. Write to me by email or on LinkedIn.',
    },
  },
}
