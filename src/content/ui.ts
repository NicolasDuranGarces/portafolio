import type { Localized } from '../lib/lang'

const es = {
  skipToContent: 'Saltar al contenido',
  nav: {
    label: 'Navegación principal',
    about: 'Sobre mí',
    education: 'Formación',
    featured: 'Destacado',
    cases: 'Casos',
    experience: 'Trayectoria',
    stack: 'Stack',
    projects: 'Proyectos',
    contact: 'Contacto',
    menu: 'Menú',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
  },
  languageSwitch: { short: 'EN', name: 'English' },
  theme: { toDark: 'Cambiar a tema oscuro', toLight: 'Cambiar a tema claro' },
  sections: {
    about: { title: 'Sobre mí' },
    education: { title: 'Formación' },
    featured: { title: 'Destacado' },
    cases: { title: 'Casos de estudio' },
    experience: {
      title: 'Trayectoria',
      lead: 'De lo más reciente a lo más antiguo.',
    },
    stack: {
      title: 'Stack',
      lead: 'Las tecnologías que uso, agrupadas por el trabajo para el que las uso.',
    },
    projects: {
      title: 'Proyectos abiertos',
      lead: 'Repositorios públicos en GitHub.',
    },
    contact: { title: 'Contacto' },
  },
  side: {
    workedWith: 'Ha trabajado con',
    coreTech: 'Tecnologías principales',
    allStack: 'Ver todo el stack',
  },
  featured: { decision: 'Decisión clave' },
  cases: {
    viewCase: 'Ver caso',
    back: 'Volver a casos',
    labels: { role: 'Rol', period: 'Periodo', organization: 'Organización' },
    sections: {
      context: 'Contexto',
      problem: 'Problema',
      role: 'Mi rol',
      decisions: 'Decisiones clave',
      difficulty: 'Qué lo hacía difícil',
      result: 'Resultado',
      stack: 'Stack',
    },
    ctaTitle: '¿Buscas a alguien para algo así?',
    ctaAction: 'Escríbeme',
  },
  projects: { viewOnGithub: 'Ver en GitHub' },
  footer: { rights: 'Todos los derechos reservados.', privacy: 'Privacidad' },
  privacy: {
    title: 'Privacidad',
    lead: 'Este sitio no usa cookies, analítica ni formularios. Solo registra logs técnicos del servidor.',
    sections: [
      {
        title: 'Qué registra el servidor',
        body: 'El servidor web guarda logs técnicos de acceso, como la fecha, la ruta solicitada y datos básicos de la conexión. Sirven para operar y proteger el sitio.',
      },
      {
        title: 'Qué guarda tu navegador',
        body: 'El sitio recuerda en el almacenamiento local de tu navegador una sola preferencia: el tema claro u oscuro. Ese dato se queda en tu dispositivo y no se envía a ningún servidor.',
      },
      {
        title: 'Enlaces externos',
        body: 'Los enlaces a LinkedIn, GitHub y Bheex llevan a sitios de terceros, con sus propias políticas. La tipografía es la de tu sistema, así que el sitio no pide nada a servicios externos.',
      },
    ],
    contact: { title: 'Contacto', body: 'Si quieres preguntarme algo sobre este sitio, escríbeme a' },
    back: 'Volver al inicio',
  },
}

type Ui = typeof es

const en: Ui = {
  skipToContent: 'Skip to content',
  nav: {
    label: 'Main navigation',
    about: 'About',
    education: 'Education',
    featured: 'Featured',
    cases: 'Cases',
    experience: 'Experience',
    stack: 'Stack',
    projects: 'Projects',
    contact: 'Contact',
    menu: 'Menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  languageSwitch: { short: 'ES', name: 'Español' },
  theme: { toDark: 'Switch to dark theme', toLight: 'Switch to light theme' },
  sections: {
    about: { title: 'About me' },
    education: { title: 'Education' },
    featured: { title: 'Featured' },
    cases: { title: 'Case studies' },
    experience: {
      title: 'Experience',
      lead: 'Most recent first.',
    },
    stack: {
      title: 'Stack',
      lead: 'The technologies I use, grouped by the work I use them for.',
    },
    projects: {
      title: 'Public projects',
      lead: 'Public repositories on GitHub.',
    },
    contact: { title: 'Contact' },
  },
  side: {
    workedWith: 'Has worked with',
    coreTech: 'Core technologies',
    allStack: 'See the full stack',
  },
  featured: { decision: 'Key decision' },
  cases: {
    viewCase: 'View case',
    back: 'Back to cases',
    labels: { role: 'Role', period: 'Period', organization: 'Organization' },
    sections: {
      context: 'Context',
      problem: 'Problem',
      role: 'My role',
      decisions: 'Key decisions',
      difficulty: 'What made it hard',
      result: 'Result',
      stack: 'Stack',
    },
    ctaTitle: 'Looking for someone for something like this?',
    ctaAction: 'Email me',
  },
  projects: { viewOnGithub: 'View on GitHub' },
  footer: { rights: 'All rights reserved.', privacy: 'Privacy' },
  privacy: {
    title: 'Privacy',
    lead: 'This site does not use cookies, analytics or forms. It only records technical server logs.',
    sections: [
      {
        title: 'What the server records',
        body: 'The web server keeps technical access logs, such as the date, the requested path and basic connection data. They are used to operate and protect the site.',
      },
      {
        title: 'What your browser stores',
        body: 'The site remembers one preference in your browser local storage: the light or dark theme. That value stays on your device and is not sent to any server.',
      },
      {
        title: 'External links',
        body: 'Links to LinkedIn, GitHub and Bheex lead to third party sites with their own policies. The typeface is the one on your system, so the site requests nothing from external services.',
      },
    ],
    contact: { title: 'Contact', body: 'If you want to ask me something about this site, write to' },
    back: 'Back to home',
  },
}

export const ui: Localized<Ui> = { es, en }

type NotFoundCopy = { heading: string; body: string; action: string }

export const notFoundCopy: Localized<NotFoundCopy> = {
  es: {
    heading: 'Página no encontrada',
    body: 'La dirección que abriste no existe o cambió de lugar.',
    action: 'Volver al inicio',
  },
  en: {
    heading: 'Page not found',
    body: 'The address you opened does not exist or has moved.',
    action: 'Back to home',
  },
}
