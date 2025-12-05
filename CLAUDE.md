# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Modern portfolio website built with React + TypeScript + Vite. Features bilingual support (ES/EN), dark/light theme, smooth animations with Framer Motion, and production deployment via Docker + Nginx.

## Development Commands

### Local Development
```bash
npm install          # Install dependencies
npm run dev          # Start dev server on http://localhost:5173
npm run build        # Type-check and build for production
npm run preview      # Preview production build on http://localhost:5173
```

### Testing
```bash
npm run test         # Run unit tests in watch mode
npm run test:run     # Run unit tests once
npm run test:ui      # Open Vitest UI
npm run test:coverage # Generate coverage report
npm run test:e2e     # Run E2E tests with Playwright
npm run test:e2e:ui  # Run E2E tests with Playwright UI
npm run test:all     # Run all tests (unit + E2E)
```

### Docker Deployment
```bash
# Using Docker directly
docker build -t portfolio .
docker run -p 8080:80 portfolio

# Using docker-compose
docker-compose up --build

# Using Makefile (recommended)
make help            # Show all available targets
make build           # Build Docker image
make up              # Stop, remove, and run container
make logs            # Tail container logs
make shell           # Open shell in running container
make rebuild         # Clean rebuild: stop, rm, build, run
```

Default ports: Dev server (5173), Docker container (3000→80 mapped via Makefile).

## Architecture

### Core Provider Pattern
The app uses React Context for two global concerns:

1. **ThemeProvider** (src/components/ThemeProvider.tsx)
   - Manages light/dark theme with localStorage persistence
   - Reads system preference (`prefers-color-scheme`) as default
   - Exposes `useTheme()` hook with `{ theme, toggle, set }`
   - Sets `data-theme` attribute on `<html>` for CSS variable switching

2. **LanguageProvider** (src/components/LanguageProvider.tsx)
   - Handles ES/EN localization with localStorage + URL query params
   - Exposes `useLanguage()` hook with `{ lang, toggle, set, t }`
   - `t(key)` function resolves dot-notation keys (e.g., `t('hero.title')`)
   - Query param `?lang=en|es` overrides stored preference

Both providers wrap the entire app in src/App.tsx.

### Data Layer

**Internationalized Data Pattern:**
- Projects (src/data/projects.ts) and Experience (src/data/experience.ts) use `LocalizedText = Record<Lang, string>`
- Each project/experience has bilingual fields resolved via `lang` parameter
- Type-safe with `Project` → `ResolvedProject` pattern
- Export `getProjects(lang)` and `getExperience(lang)` functions for runtime resolution

**Project Structure:**
```typescript
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
```

All text content lives in src/i18n/{es,en}.ts dictionaries.

### Component Organization

```
src/
  components/    # Reusable UI: ThemeProvider, LanguageProvider, ProjectCard,
                 # CornerControls (theme/lang toggles), SideRails, ScrollProgress,
                 # ParallaxOrbs, ProjectModal, TechIcon, SkillsMarquee, etc.

  sections/      # Page sections: Hero, About, Skills, Projects, Contact, Experience
                 # Each section imports components and uses language/theme hooks

  data/          # Typed data sources: projects.ts, experience.ts

  i18n/          # Localization dictionaries: es.ts, en.ts

  styles/        # global.css with CSS variables for themes and layout utilities
```

### Styling Strategy
- CSS variables defined in `src/styles/global.css` switch based on `[data-theme]`
- Component-scoped styles via inline styles or CSS modules (if added)
- Framer Motion for declarative animations
- Responsive design with mobile-first CSS

### SEO & Meta
- src/components/SEO.tsx uses `react-helmet-async` to inject `<title>`, `<meta>`, Open Graph, and Twitter Card tags
- Localized SEO content from `i18n/{lang}.seo.*`
- SEO config in src/seo.config.ts

## TypeScript Configuration

- **Strict mode enabled:** All type errors must be resolved before build
- **Target:** ES2020 with DOM libs
- **Module resolution:** Bundler (Vite-specific)
- **JSX:** react-jsx (automatic runtime, no import React needed in components)
- Use `type` imports where possible (enforced by ESLint rule `@typescript-eslint/consistent-type-imports`)

## ESLint Rules

- Enforces TypeScript best practices
- `react-refresh/only-export-components` warns on non-component exports from component files
- Unused vars allowed with `_` prefix
- Use `import type` for type-only imports

## Key Patterns & Conventions

1. **Localization:**
   - Always use `useLanguage().t(key)` for user-facing strings
   - For data structures, use `LocalizedText` and resolve at runtime via `lang` parameter
   - Never hardcode English or Spanish strings in components

2. **Theme:**
   - Use CSS variables for colors and spacing
   - Test both light and dark themes when styling

3. **Animation:**
   - Use Framer Motion for all animations
   - Keep animations subtle and accessible

4. **Component Props:**
   - Always type component props with TypeScript interfaces or types
   - Prefer named exports for components (except App.tsx which uses default)

5. **Data Flow:**
   - Static data (projects, experience) lives in src/data/
   - Runtime resolution via `get*` functions that accept `lang`
   - Context providers for theme and language state

## Common Development Tasks

### Adding a New Project
1. Edit `src/data/projects.ts`
2. Add new project object with bilingual `title`, `description`, `highlights`
3. Ensure `slug` is unique
4. Add required tags from `allTags` array

### Adding New Translations
1. Add key to both `src/i18n/es.ts` and `src/i18n/en.ts`
2. Use dot notation for nested keys (e.g., `hero.title`)
3. Access via `useLanguage().t('hero.title')`

### Modifying Theme Colors
1. Edit CSS variables in `src/styles/global.css`
2. Variables are scoped by `[data-theme="light"]` and `[data-theme="dark"]`

### Type Checking
Always run `npm run build` before committing to catch TypeScript errors. The build script runs `tsc -noEmit` followed by Vite build.

## Deployment Notes

- Docker multi-stage build: Node builder → Nginx runtime
- Static assets served from `/dist` by Nginx on port 80
- Configure nginx.conf for custom routing or headers if needed
- Makefile provides production-ready workflows (rebuild, logs, shell access)

## Testing Architecture

This project has comprehensive test coverage with three layers:

### 1. Unit Tests (Vitest + React Testing Library)
- Located in `*.test.tsx` files next to components
- Tests providers (ThemeProvider, LanguageProvider)
- Tests UI components (Section, ProjectCard)
- Tests data layer (projects.ts)
- Configuration: `vitest.config.ts`
- Test utilities: `src/test/test-utils.tsx` (custom render with providers)
- Setup: `src/test/setup.ts` (global mocks for matchMedia, IntersectionObserver)

**Key patterns:**
- Use `renderWithProviders` from test-utils for components that need context
- All error boundary tests suppress console.error to avoid noise
- localStorage and window.matchMedia are mocked globally

### 2. E2E Tests (Playwright)
- Located in `e2e/` directory
- Tests complete user flows and SEO implementation
- `homepage.spec.ts`: Tests meta tags, structured data (JSON-LD), hreflang tags
- `theme-language.spec.ts`: Tests theme/language toggle persistence
- `navigation.spec.ts`: Tests section navigation and external links
- Configuration: `playwright.config.ts`
- Runs against dev server automatically (webServer config)

**Important:**
- E2E tests verify SEO keywords including "NIDUGA" alias
- Tests run on multiple browsers: Chrome, Firefox, Safari, Mobile Chrome/Safari
- All tests use `page.waitForLoadState('networkidle')` for stability

### 3. CI/CD Pipeline (GitHub Actions)
- Workflow: `.github/workflows/ci.yml`
- Jobs: lint, type-check, unit tests, E2E tests, build, Lighthouse
- Lighthouse config: `lighthouserc.json` (enforces SEO score > 0.95)
- Coverage uploaded to Codecov
- Playwright reports saved as artifacts

## SEO Implementation

**Keywords Strategy:**
- Primary: "Nicolas Duran Garces", "NIDUGA", "niduga"
- Secondary: Backend Python, FastAPI, DevOps, Clean Architecture
- All keywords in `src/seo.config.ts`

**SEO Features:**
- Dynamic meta tags via react-helmet-async (src/components/SEO.tsx)
- JSON-LD structured data: Person, WebSite, BreadcrumbList schemas
- Canonical URLs with tracking param cleanup
- Hreflang tags for ES/EN localization
- Open Graph and Twitter Card meta tags
- Sitemap.xml with bilingual support (public/sitemap.xml)
- Robots.txt configured (public/robots.txt)
- PWA manifest (public/site.webmanifest)

**Testing SEO:**
- E2E tests verify presence of NIDUGA keyword in title and meta tags
- E2E tests validate JSON-LD structure and Person schema
- Lighthouse CI enforces SEO score > 95%

## Performance Optimizations

1. **Lazy Loading & Code Splitting:**
   - Heavy sections lazy-loaded via React.lazy() in App.tsx
   - Suspense fallbacks with min-height to prevent layout shift
   - Automatic chunk splitting by Vite

2. **Bundle Analysis:**
   - Main bundle ~300KB (includes React, Framer Motion)
   - Section chunks: 1-11KB each (lazy loaded)
   - TechIcon chunk largest due to react-icons (consider optimization)

## Files to Customize for Personal Use

Per README.md, quick customization points:
- Brand name: `src/components/Navbar.tsx` (if exists; check CornerControls for branding)
- Hero text: `src/sections/Hero.tsx` or via `src/i18n/es.ts` → `hero.*`
- Social links: `src/sections/Contact.tsx` or via `i18n`
- Projects: `src/data/projects.ts`
- Colors/theme: `src/styles/global.css`
- SEO keywords: `src/seo.config.ts` (update with your aliases and keywords)
