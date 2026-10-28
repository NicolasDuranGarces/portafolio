# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Portfolio of Nicolás Durán Garcés (niduga.dev): a static bilingual site (ES at `/`, EN at `/en/`) aimed at recruiters and contract roles. React 18 + TypeScript + Vite 7 + Tailwind v4, prerendered to one HTML file per page, served by nginx in a Docker image. Home page plus four case study pages, a privacy page and a bilingual 404. See `README.md` for the full picture; this file lists what to keep in mind while changing code.

## Commands

```bash
npm run dev                      # Vite dev server on :5173 (client render only, no <head> SEO tags)
npm run build                    # tsc -noEmit -> vite build -> vite build --ssr -> node scripts/prerender.mjs
npm run preview                  # vite preview of dist/ on :4173

npx tsc --noEmit                 # type check
npx eslint src --ext .ts,.tsx    # lint; there is NO npm lint script, this is the exact CI command
npm run test:run                 # unit tests (Vitest, jsdom)
npm run test:coverage
npm run test:e2e -- --project=chromium   # Playwright; webServer = npm run build && node e2e/serve-dist.mjs
npm audit --audit-level=high
npm run og                       # regenerate public/og-image.png
```

Everything above must pass before a change is done. Node 22 is the target (Dockerfile and CI); local Node can be newer.

## Architecture

### Routing without a router

- `src/lib/routes.ts` is the only place that knows URLs. `resolveRoute(pathname)` returns `{ page: 'home' | 'case' | 'privacy', lang, slug? }` or `{ page: 'notFound' }`; `pathOf`, `fileOf`, `alternates`, `pageRoutes` derive paths, output files and hreflang sets from the same data.
- Every page is a separate prerendered HTML file and navigation is a normal `<a href>` (full page load). The language switch is an `<a>` to `pathOf(withLang(route, otherLang))`. There is no client router and no language context.
- The 404 is a single bilingual page (`notFound` has no `lang`) because nginx serves one `404.html` for any missing URL; hydration therefore never mismatches.
- The client resolves the route from `location.pathname` (`src/main.tsx`) and hydrates; `src/entry-server.tsx` exports `listPages()` and `renderRoute(route)` for `scripts/prerender.mjs`.

### Head, SEO and prerender

- `src/lib/seo.ts`: `getPageMeta(route)` (title, description, canonical, alternates, robots, Open Graph, JSON-LD) and `renderHead(meta)` (escaped head tags). No react-helmet: the head is static per page and never changes at runtime.
- `scripts/prerender.mjs` injects the head at `<!--app-head-->`, the app HTML at `<!--app-html-->`, a font preload tag, and writes `sitemap.xml` (`src/lib/sitemap.ts`) and `robots.txt`. It sets `NODE_ENV=production` so React renders without dev warnings, and removes `dist/server` at the end.
- To add a prerendered route: extend `Route` and `pageRoutes()` in `src/lib/routes.ts`, handle it in `getPageMeta`; the sitemap, files and tests follow from there.

### Content model (`src/content/`)

Typed data per language (`Localized<T> = { es: T; en: T }` from `src/lib/lang.ts`). `cases.ts`, `experience.ts`, `projects.ts`, `stack.ts`, `home.ts`, `ui.ts`. `ui.ts` derives the English type from the Spanish object, so a missing key is a compile error. Components receive `lang` as a prop and read `content[lang]`; there are no string key lookups.

Content rules (checked by `src/content/content.test.ts`): facts only from the CV `.tex` sources; anonymous clients stay anonymous (see README); no hyphens or dashes inside copy; no clichés; each case has role, 2 or 3 decisions with reasons, and a result. Change copy in both languages in the same edit.

### Styling and motion

- `src/styles/global.css`: Tailwind v4 CSS first config. Colors are tokens built with `light-dark()` (`--color-canvas`, `surface`, `raised`, `line`, `ink`, `ink-muted`, `accent`, hero gradient pair). `--color-*: initial` removes the default palette, so only tokens exist. Theme = system by default, `<html data-theme>` overrides (written by `useTheme` and by `public/init.js` before first paint).
- Shared component classes (`.control`, `.card`, `.chip`, `.timeline`, `.burger`, `.menu-overlay`, `.prose-link`) are defined with `@apply` in `@layer components`. One height token for controls: `--control-h`. Interactive elements transition through the `transition-ui` utility (colors, opacity, individual transform properties, 700 ms, fluid curve) and never `transition-all`, so the focus ring is not animated and shows instantly.
- Motion is CSS + `IntersectionObserver` (`useReveal`, `useActiveSection`, `useWordReveal`). Never add a scroll listener or an animation library. Reveal wrappers (`data-reveal`) must not carry their own hover transitions: wrap a card, do not annotate it. Content is hidden only under `html.js`, and all motion sits inside `@media (prefers-reduced-motion: no-preference)`.
- `src/styles/design-rules.test.ts` enforces the visual contract (type scale, spacing steps, flat backgrounds, one gradient, no one sided borders, no raw colors, fluid easing). If it fails, fix the code, not the test.
- CSP forbids inline styles and scripts: do not use the React `style` prop (SSR would emit a `style=` attribute). CSSOM writes (`element.style.x = ...`) are fine. JSON-LD is a `type="application/ld+json"` data block.

### Testing

- Unit (Vitest + Testing Library, `src/**/*.test.ts(x)`): routes, SEO, sitemap, content rules, hooks, Nav, tagline, case pages, prerender HTML (`src/entry-server.test.tsx`), design rules. `src/test/setup.ts` provides `matchMedia`, an in memory `localStorage` (Node 25+ ships a global that breaks jsdom's) and a controllable `IntersectionObserver` double (`src/test/intersection.ts`).
- E2E (`e2e/`): runs against the real build served by `e2e/serve-dist.mjs`, which copies the `add_header` lines from `nginx.conf` (including the CSP) and mimics nginx 404 and trailing slash behavior. Specs: static HTML with JS off, navigation, theme and language, runtime health (no console errors or CSP violations), layout and focus, build output.

### Delivery

- `nginx.conf`: strict CSP, `server_tokens off`, cache policy through a `map` (hashed `/assets/` immutable, everything else `no-cache`), all headers declared once at server level (nginx does not inherit `add_header` into blocks that define their own), `error_page 404 /404.html`. It must keep working as uid 101 with `--read-only` and tmpfs on `/var/cache/nginx`, `/var/run`, `/tmp`.
- `Dockerfile`: `node:22-alpine` builder, `nginx:1.27-alpine` runtime, healthcheck on `127.0.0.1`.
- Workflows: `ci.yml` (PR and `develop`: `checks`, `e2e`) and `deploy.yml` (`main`: `validate`, `build-push` on `arc-portafolio`; `deploy` on `[self-hosted, portfolio-prod]`). Declared in `.github/actionlint.yaml`. Never `ubuntu-latest`.

## Conventions

- TypeScript strict, `import type` for types (ESLint `consistent-type-imports`), named exports for components.
- Phosphor icons only, imported through `src/components/icons.ts` (deep imports).
- Copy: sentence case, no hyphens inside phrases, `text-balance` headings and `text-pretty` body (set globally).
- Do not add personal or client details that the README marks as anonymous.
