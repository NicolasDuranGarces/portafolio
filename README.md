# Portafolio React + Vite + Docker

Portafolio moderno creado con React, TypeScript, Vite, animaciones con Framer Motion, tema claro/oscuro y despliegue productivo con Nginx en Docker.

## Características
- Tema claro/oscuro con preferencia del sistema y persistencia.
- Animaciones sutiles y accesibles (Framer Motion).
- Secciones: Hero, Sobre mí, Stack, Proyectos y Contacto.
- Componentes reutilizables y estilos con CSS variables.
- Docker multi-stage + Nginx para servir estáticamente.

## Requisitos
- Node 18+ y npm, o sólo Docker (recomendado para producción).

## Desarrollo local
```bash
npm install
npm run dev
```

## Build de producción
```bash
npm run build
npm run preview
```

## Ejecutar con Docker
```bash
# Construir imagen
docker build -t portfolio .
# Ejecutar
docker run -p 8080:80 portfolio
# o con docker-compose
docker-compose up --build
```

Abre http://localhost:8080.

## Personalización rápida
- Cambia el nombre/brand en `src/components/Navbar.tsx:5`.
- Ajusta el texto del Hero en `src/sections/Hero.tsx:6`.
- Actualiza tus redes en `src/sections/Contact.tsx:16`.
- Edita tus proyectos en `src/data/projects.ts:1` (tipado y ejemplos incluidos).
- Colores/temas en `src/styles/global.css:1`.

## Estructura
```
src/
  components/    # Navbar, Theme, UI
  sections/      # Hero, About, Skills, Projects, Contact
  data/          # projects.ts (fuente de datos tipada)
  styles/        # global.css con variables y utilidades
```

## Buenas prácticas
- TypeScript estricto y ESLint configurado.
- Componentes puros y props tipadas.
- Estilos con variables CSS y diseño responsivo.
- Accesibilidad básica: roles, labels, colores con contraste.

## Proyectos y filtros
- Los proyectos viven en `src/data/projects.ts` con el tipo `Project`.
- La sección muestra filtros por categoría, tags y búsqueda; además, modal de detalles.

## Licencia
Uso personal/educativo; ajusta a tus necesidades.
