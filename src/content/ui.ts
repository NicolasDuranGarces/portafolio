import type { Localized } from '../lib/lang'

const es = {
  skipToContent: 'Saltar al contenido',
  nav: {
    label: 'Navegación principal',
    cases: 'Casos',
    experience: 'Experiencia',
    projects: 'Proyectos',
    about: 'Sobre mí',
    contact: 'Contacto',
    menu: 'Menú',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
  },
  languageSwitch: { short: 'EN', name: 'English' },
  theme: { toDark: 'Cambiar a tema oscuro', toLight: 'Cambiar a tema claro' },
  sections: {
    cases: {
      title: 'Casos de estudio',
      lead: 'Cuatro sistemas que construí, con mi rol, las decisiones clave y el resultado.',
    },
    experience: {
      title: 'Experiencia',
      lead: 'De lo más reciente a lo más antiguo.',
    },
    stack: {
      title: 'Stack por área',
      lead: 'Las tecnologías que uso, agrupadas por el trabajo para el que las uso.',
    },
    projects: {
      title: 'Proyectos abiertos',
      lead: 'Repositorios públicos en GitHub.',
    },
    about: { title: 'Sobre mí' },
    contact: { title: 'Contacto' },
  },
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
        body: 'Los enlaces a LinkedIn, GitHub y Bheex llevan a sitios de terceros, con sus propias políticas. La tipografía se sirve desde este mismo sitio, sin pedir nada a servicios externos.',
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
    cases: 'Cases',
    experience: 'Experience',
    projects: 'Projects',
    about: 'About',
    contact: 'Contact',
    menu: 'Menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  languageSwitch: { short: 'ES', name: 'Español' },
  theme: { toDark: 'Switch to dark theme', toLight: 'Switch to light theme' },
  sections: {
    cases: {
      title: 'Case studies',
      lead: 'Four systems I built, with my role, the key decisions and the result.',
    },
    experience: {
      title: 'Experience',
      lead: 'Most recent first.',
    },
    stack: {
      title: 'Stack by area',
      lead: 'The technologies I use, grouped by the work I use them for.',
    },
    projects: {
      title: 'Public projects',
      lead: 'Public repositories on GitHub.',
    },
    about: { title: 'About me' },
    contact: { title: 'Contact' },
  },
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
        body: 'Links to LinkedIn, GitHub and Bheex lead to third party sites with their own policies. The typeface is served from this same site, without requesting anything from external services.',
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
