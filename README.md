# Portfolio - Modern React + TypeScript + Vite

A modern, fully-featured portfolio website built with React, TypeScript, and Vite. Features bilingual support (Spanish/English), dark/light theme, smooth animations with Framer Motion, comprehensive testing, and production-ready Docker deployment.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-Personal%2FEducational-green)](LICENSE)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Customization](#customization)
- [Performance](#performance)
- [SEO](#seo)
- [License](#license)

## Features

### Core Functionality
- **Bilingual Support**: Full internationalization (Spanish/English) with URL query params and localStorage persistence
- **Theme Switching**: Light/dark theme with system preference detection and persistence
- **Smooth Animations**: Powered by Framer Motion with accessibility considerations
- **Responsive Design**: Mobile-first approach with optimized layouts for all screen sizes
- **SEO Optimized**: Meta tags, JSON-LD structured data, sitemap, and hreflang tags
- **PWA Ready**: Manifest file and service worker support

### Sections
- **Hero**: Eye-catching introduction with animated background orbs
- **About**: Professional summary with personal story
- **Skills**: Tech stack showcase with animated marquee
- **Experience**: Professional timeline with detailed positions
- **Projects**: Filterable project gallery with categories, tags, and detailed modal views
- **Contact**: Social links and contact information

### User Experience
- **Project Filtering**: Category-based filters, tag selection, and search functionality
- **Project Modals**: Detailed project views with highlights, tech stack, and links
- **Corner Controls**: Fixed theme and language toggles for easy access
- **Side Rails**: Social links and scroll-to-top navigation
- **Scroll Progress**: Visual indicator of page scroll progress
- **Parallax Effects**: Smooth parallax orbs on hero section

## Tech Stack

### Core
- **React 18.3**: Modern React with hooks and concurrent features
- **TypeScript 5.5**: Strict type checking for reliability
- **Vite 5.4**: Lightning-fast build tool and dev server

### UI & Styling
- **Framer Motion**: Declarative animations and gestures
- **React Icons**: Comprehensive icon library
- **CSS Variables**: Theme-aware styling with custom properties

### SEO & Meta
- **React Helmet Async**: Dynamic meta tags and structured data
- **JSON-LD**: Structured data for Person, WebSite, and BreadcrumbList schemas
- **Sitemap**: Bilingual sitemap for search engines

### Testing
- **Vitest**: Fast unit test runner with coverage
- **React Testing Library**: Component testing utilities
- **Playwright**: End-to-end testing across browsers
- **Lighthouse CI**: Automated performance and SEO audits

### DevOps
- **Docker**: Multi-stage builds with Nginx
- **GitHub Actions**: CI/CD pipeline with automated testing
- **ESLint**: Code quality and consistency
- **Makefile**: Production-ready deployment workflows

## Quick Start

### Prerequisites
- Node.js 18+ and npm (for development)
- Docker and Docker Compose (for production deployment)

### Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Docker Deployment

```bash
# Using Docker directly
docker build -t portfolio .
docker run -p 8080:80 portfolio

# Using docker-compose
docker-compose up --build

# Using Makefile (recommended)
make help     # Show all available commands
make build    # Build Docker image
make up       # Run container
make logs     # View container logs
make rebuild  # Clean rebuild
```

Access at http://localhost:8080 (Docker) or http://localhost:5173 (dev server).

## Development

### Available Scripts

```bash
# Development
npm run dev              # Start Vite dev server
npm run build            # Type-check and build for production
npm run preview          # Preview production build

# Testing
npm run test             # Run unit tests in watch mode
npm run test:run         # Run unit tests once
npm run test:ui          # Open Vitest UI
npm run test:coverage    # Generate coverage report
npm run test:e2e         # Run E2E tests with Playwright
npm run test:e2e:ui      # Run E2E tests with Playwright UI
npm run test:all         # Run all tests (unit + E2E)
```

### TypeScript Configuration
- **Strict mode enabled**: All type errors must be resolved before build
- **Target**: ES2020 with DOM libraries
- **Module resolution**: Bundler (Vite-specific)
- **JSX**: react-jsx (automatic runtime, no need to import React)

### ESLint Rules
- Enforces TypeScript best practices
- `react-refresh/only-export-components` warns on non-component exports
- Unused variables allowed with `_` prefix
- Use `import type` for type-only imports

## Testing

### Unit Tests (Vitest + React Testing Library)
Located in `*.test.tsx` files next to components:
- **Providers**: ThemeProvider, LanguageProvider
- **Components**: Section, ProjectCard, and more
- **Data Layer**: projects.ts validation

```bash
npm run test           # Watch mode
npm run test:coverage  # Generate coverage report
```

**Key patterns:**
- Use `renderWithProviders` from `src/test/test-utils.tsx` for components needing context
- Global mocks for `matchMedia` and `IntersectionObserver` in `src/test/setup.ts`

### E2E Tests (Playwright)
Located in `e2e/` directory:
- **homepage.spec.ts**: Meta tags, structured data, hreflang validation
- **theme-language.spec.ts**: Theme and language persistence
- **navigation.spec.ts**: Section navigation and external links

```bash
npm run test:e2e        # Headless mode
npm run test:e2e:ui     # Playwright UI
npm run test:e2e:headed # Headed browser mode
```

Tests run on: Chrome, Firefox, Safari, Mobile Chrome/Safari

### CI/CD Pipeline
GitHub Actions workflow (`.github/workflows/ci.yml`) includes:
- ESLint linting
- TypeScript type checking
- Unit tests with coverage (uploaded to Codecov)
- E2E tests with artifact uploads
- Build verification
- Lighthouse CI (SEO score > 95% enforced)

## Deployment

### Docker Multi-Stage Build
```dockerfile
# Stage 1: Node builder
FROM node:20-alpine AS builder
# Install dependencies and build

# Stage 2: Nginx runtime
FROM nginx:alpine
# Copy build artifacts and serve
```

### Makefile Commands
```bash
make help      # Show all available targets
make build     # Build Docker image
make up        # Stop, remove, and run container
make logs      # Tail container logs
make shell     # Open shell in running container
make rebuild   # Clean rebuild: stop, rm, build, run
```

### Production Configuration
- Static assets served from `/dist` by Nginx on port 80
- Container port mapped to 3000 by default (configurable in Makefile)
- Nginx configuration in `nginx.conf` for routing and headers

## Project Structure

```
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI/CD pipeline
├── e2e/                        # Playwright E2E tests
│   ├── homepage.spec.ts        # SEO and meta tag tests
│   ├── theme-language.spec.ts  # Theme/language persistence
│   └── navigation.spec.ts      # Navigation and routing
├── public/                     # Static assets
│   ├── sitemap.xml            # SEO sitemap
│   ├── robots.txt             # Search engine instructions
│   └── site.webmanifest       # PWA manifest
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── ThemeProvider.tsx  # Dark/light theme context
│   │   ├── LanguageProvider.tsx # i18n context
│   │   ├── SEO.tsx            # Dynamic meta tags
│   │   ├── ProjectCard.tsx    # Project card component
│   │   ├── ProjectModal.tsx   # Project detail modal
│   │   ├── CornerControls.tsx # Theme/language toggles
│   │   ├── SideRails.tsx      # Social links sidebar
│   │   ├── ScrollProgress.tsx # Scroll indicator
│   │   ├── ParallaxOrbs.tsx   # Animated background
│   │   ├── TechIcon.tsx       # Technology icons
│   │   └── SkillsMarquee.tsx  # Animated skills showcase
│   ├── sections/              # Page sections
│   │   ├── Hero.tsx           # Landing section
│   │   ├── About.tsx          # About me section
│   │   ├── Skills.tsx         # Tech stack section
│   │   ├── Experience.tsx     # Work experience timeline
│   │   ├── Projects.tsx       # Projects gallery
│   │   └── Contact.tsx        # Contact information
│   ├── data/                  # Typed data sources
│   │   ├── projects.ts        # Project data with LocalizedText
│   │   └── experience.ts      # Experience data
│   ├── i18n/                  # Internationalization
│   │   ├── es.ts              # Spanish translations
│   │   └── en.ts              # English translations
│   ├── styles/
│   │   └── global.css         # CSS variables and utilities
│   ├── test/                  # Test utilities
│   │   ├── setup.ts           # Global test setup
│   │   └── test-utils.tsx     # Custom render helpers
│   ├── seo.config.ts          # SEO configuration
│   ├── App.tsx                # Main app component
│   └── main.tsx               # React entry point
├── Dockerfile                 # Multi-stage Docker build
├── docker-compose.yml         # Docker Compose configuration
├── Makefile                   # Production deployment commands
├── nginx.conf                 # Nginx server configuration
├── vitest.config.ts          # Vitest configuration
├── playwright.config.ts      # Playwright configuration
├── lighthouserc.json         # Lighthouse CI configuration
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
├── CLAUDE.md                 # AI assistant instructions
└── README.md                 # This file
```

## Architecture

### Core Provider Pattern

#### ThemeProvider (`src/components/ThemeProvider.tsx`)
Manages light/dark theme with:
- System preference detection via `prefers-color-scheme`
- localStorage persistence
- `useTheme()` hook exposing `{ theme, toggle, set }`
- Sets `data-theme` attribute on `<html>` for CSS variable switching

#### LanguageProvider (`src/components/LanguageProvider.tsx`)
Handles internationalization with:
- ES/EN localization with localStorage + URL query params
- `useLanguage()` hook exposing `{ lang, toggle, set, t }`
- `t(key)` function for dot-notation translation keys (e.g., `t('hero.title')`)
- Query param `?lang=en|es` overrides stored preference

Both providers wrap the entire app in `src/App.tsx`.

### Data Layer

**Internationalized Data Pattern:**
```typescript
type LocalizedText = Record<Lang, string>

type Project = {
  slug: string
  title: LocalizedText       // { es: '...', en: '...' }
  description: LocalizedText
  category: ProjectCategory  // 'backend' | 'frontend' | 'devops' | 'data' | 'mobile'
  tags: string[]
  links?: { href: string; label: LocalizedText }[]
  image?: string
  highlights?: LocalizedText[]
}

// Runtime resolution
function getProjects(lang: Lang): ResolvedProject[]
```

All text content lives in `src/i18n/{es,en}.ts` dictionaries.

### Styling Strategy
- **CSS Variables**: Defined in `src/styles/global.css`, switch based on `[data-theme]`
- **Component Scoping**: Inline styles or scoped CSS
- **Animations**: Framer Motion for declarative, accessible animations
- **Responsive**: Mobile-first CSS with breakpoints

### SEO & Meta
- `src/components/SEO.tsx` uses `react-helmet-async` to inject:
  - `<title>` and `<meta>` tags
  - Open Graph and Twitter Card tags
  - JSON-LD structured data (Person, WebSite, BreadcrumbList)
  - Hreflang tags for bilingual support
- Localized SEO content from `i18n/{lang}.seo.*`
- Configuration in `src/seo.config.ts`

## Customization

### Quick Customization Points

1. **Personal Information**
   - Brand name: Update in `src/i18n/es.ts` and `src/i18n/en.ts`
   - Hero text: Modify `hero.*` keys in i18n files
   - Social links: Edit `src/sections/Contact.tsx`

2. **Projects**
   - Edit `src/data/projects.ts`
   - Add projects with bilingual `title`, `description`, `highlights`
   - Ensure unique `slug` for each project
   - Use tags from `allTags` array

3. **Experience**
   - Edit `src/data/experience.ts`
   - Add work experiences with bilingual content

4. **Translations**
   - Add keys to both `src/i18n/es.ts` and `src/i18n/en.ts`
   - Use dot notation for nested keys (e.g., `hero.title`)
   - Access via `useLanguage().t('hero.title')`

5. **Theme Colors**
   - Edit CSS variables in `src/styles/global.css`
   - Variables scoped by `[data-theme="light"]` and `[data-theme="dark"]`

6. **SEO Keywords**
   - Update `src/seo.config.ts` with your name and aliases
   - Modify keywords for your expertise

### Adding New Translations
```typescript
// src/i18n/en.ts
export const en = {
  hero: {
    title: 'Welcome',
    subtitle: 'Your subtitle here'
  }
}

// Usage in components
const { t } = useLanguage()
<h1>{t('hero.title')}</h1>
```

### Modifying Theme
```css
/* src/styles/global.css */
[data-theme="dark"] {
  --bg-primary: #0a0a0a;
  --text-primary: #e8e8e8;
  /* ... */
}
```

## Performance

### Optimizations Implemented

1. **Lazy Loading & Code Splitting**
   - Heavy sections lazy-loaded via `React.lazy()` in `App.tsx`
   - Suspense fallbacks with min-height to prevent layout shift
   - Automatic chunk splitting by Vite
   - Main bundle: ~300KB (includes React, Framer Motion)
   - Section chunks: 1-11KB each (lazy loaded)

2. **Bundle Analysis**
   - Run `npm run build` to see chunk sizes
   - Consider optimizing TechIcon chunk (react-icons) if needed

3. **Image Optimization**
   - Use WebP format for images
   - Lazy load images below the fold
   - Proper sizing and aspect ratios

4. **Caching Strategy**
   - Docker/Nginx serves static assets with cache headers
   - Service worker ready for offline support

## SEO

### Keywords Strategy
**Primary**: Nicolas Duran Garces, NIDUGA, niduga
**Secondary**: Backend Python, FastAPI, DevOps, Clean Architecture

Configure in `src/seo.config.ts`.

### SEO Features
- **Meta Tags**: Dynamic via react-helmet-async
- **Structured Data**: JSON-LD schemas (Person, WebSite, BreadcrumbList)
- **Canonical URLs**: With tracking param cleanup
- **Hreflang Tags**: ES/EN localization
- **Social Media**: Open Graph and Twitter Card meta tags
- **Sitemap**: `public/sitemap.xml` with bilingual support
- **Robots**: `public/robots.txt` configured
- **PWA**: `public/site.webmanifest`

### SEO Testing
- E2E tests verify NIDUGA keyword in title and meta tags
- E2E tests validate JSON-LD structure
- Lighthouse CI enforces SEO score > 95%

### Lighthouse Scores
Target scores (enforced by CI):
- Performance: > 90%
- Accessibility: > 90%
- Best Practices: > 90%
- SEO: > 95%

## Contributing

This is a personal portfolio project, but feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Please ensure:
- All tests pass (`npm run test:all`)
- No TypeScript errors (`npm run build`)
- ESLint passes
- New features have tests

## License

This project is for personal and educational use. Feel free to use it as a template for your own portfolio. Please customize the content with your own information and projects.

## Author

**Nicolas Duran Garces (NIDUGA)**

- Portfolio: [Your deployed URL]
- GitHub: [@nicolasdurangarces](https://github.com/nicolasdurangarces)
- LinkedIn: [Your LinkedIn]

---

Built with ❤️ using React, TypeScript, and Vite
