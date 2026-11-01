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
        'Soy ingeniero backend y de IA con más de 5 años poniendo sistemas en producción donde una falla se nota: el backend de una banda transportadora de bodega que responde en menos de un segundo para mantener sincronizados los paquetes físicos, la ingesta IoT por MQTT del proyecto Quindío Inteligente y la automatización de retail a gran escala sobre AWS.',
        'Hoy dirijo Bheex, el SaaS de atención al cliente con IA que fundé: agentes LLM con tool calling, RAG sobre los documentos de cada cliente, WhatsApp y llamadas de voz con traspaso a una persona. Lo diseñé, lo construí y lo opero en producción, incluido el aislamiento entre clientes. En paralelo trabajo en BetterWay Devs y construyo como freelance el backend de una plataforma de lotería con unos 17 microservicios en Spring Boot.',
        'Antes fui profesor de Ingeniería de Software en la EAM, la universidad donde me formé. Enseñar arquitectura limpia, microservicios y despliegue en la nube me obligó a explicar el porqué de cada decisión técnica. Busco un rol senior de backend o de IA con responsabilidad sobre la arquitectura.',
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
        'IBM AI Developer, especialización de 10 cursos (IBM en Coursera, jul 2024). Incluye Building Generative AI Powered Applications with Python, Build & Deploy AI Applications with Python & Flask y Python for Data Science & AI',
        'Building AI Powered Chatbots Without Programming (IBM en Coursera, ene 2024)',
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
        'I am a backend and AI engineer with more than 5 years shipping systems to production where a failure shows: a warehouse conveyor backend that answers in under one second to keep physical parcels in sync, high volume IoT ingestion over MQTT for the Quindío Inteligente project, and retail automation at scale on AWS.',
        'Today I run Bheex, the AI customer service SaaS I founded: LLM agents with tool calling, RAG over each client’s documents, WhatsApp and voice calls with handoff to a person. I designed it, built it and operate it in production, tenant isolation included. In parallel I work at BetterWay Devs and, as a freelancer, build the backend of a lottery platform with about 17 Spring Boot microservices.',
        'Before that I taught Software Engineering at EAM, the university where I studied. Teaching clean architecture, microservices and cloud deployment made me explain the reason behind every technical decision. I am looking for a senior backend or AI role with ownership of the architecture.',
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
        'IBM AI Developer, 10 course specialization (IBM on Coursera, Jul 2024). Includes Building Generative AI Powered Applications with Python, Build & Deploy AI Applications with Python & Flask and Python for Data Science & AI',
        'Building AI Powered Chatbots Without Programming (IBM on Coursera, Jan 2024)',
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
