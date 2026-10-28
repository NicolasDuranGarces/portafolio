# niduga.dev

Portfolio of Nicolás Durán Garcés, backend and AI engineer. A static, bilingual site (Spanish at `/`, English at `/en/`) built for recruiters and contract roles: a home page with four case studies, a dated experience timeline, the stack by area, public repositories, and a short about section.

## Stack

- React 18 + TypeScript (strict) + Vite 7, prerendered to static HTML (SSG). nginx serves the result from a Docker image.
- Tailwind CSS v4 (CSS first config in `src/styles/global.css`), Geist (self hosted, `@fontsource-variable/geist`), Phosphor icons.
- No animation library: motion is CSS plus `IntersectionObserver`, and it switches off with `prefers-reduced-motion`.
- Vitest + Testing Library for unit tests, Playwright for end to end tests.

## Pages

| Page | Spanish | English |
| --- | --- | --- |
| Home | `/` | `/en/` |
| Case study | `/casos/<slug>/` | `/en/cases/<slug>/` |
| Privacy | `/privacidad/` | `/en/privacy/` |
| 404 | `/404.html` (one bilingual page, served by nginx with a real 404 status) | |

Case slugs: `bheex`, `price-match-automation`, `quindio-inteligente-iot`, `warehouse-conveyor-backend`.

Navigation between pages is plain `<a href>`: every page is its own prerendered HTML file, so there is no client router. The language switch links to the same page in the other language.

## Commands

```bash
npm install
npm run dev            # Vite dev server (renders on the client; no <head> tags, see below)
npm run build          # tsc, client build, SSR build, prerender to dist/
npm run preview        # vite preview of dist/ (SPA style 404s; use the e2e server for exact nginx behavior)

npx tsc --noEmit                 # type check
npx eslint src --ext .ts,.tsx    # lint (there is no npm lint script)
npm run test:run                 # unit tests
npm run test:coverage            # unit tests with coverage
npm run test:e2e -- --project=chromium   # builds, serves dist/ like nginx, runs Playwright
npm audit --audit-level=high

npm run og             # regenerate public/og-image.png (needs Playwright Chromium)
```

`npm run build` runs four steps: `tsc -noEmit`, `vite build`, `vite build --ssr src/entry-server.tsx --outDir dist/server`, and `node scripts/prerender.mjs`. The prerender step writes one HTML file per page, `sitemap.xml`, `robots.txt`, and then deletes `dist/server`.

## How a page is produced

1. `src/lib/routes.ts` maps a pathname to a `Route` (`home`, `case`, `privacy`, `notFound`) and back. It is the single source for URLs, file names and hreflang alternates.
2. `src/entry-server.tsx` exports `listPages()` and `renderRoute(route)`. `scripts/prerender.mjs` renders each route with `renderToString`.
3. `src/lib/seo.ts` builds the page metadata (`title`, description, canonical, hreflang, Open Graph, JSON-LD) and serializes it as head tags. The prerender script injects them into the Vite built `index.html` at `<!--app-head-->`, the rendered app at `<!--app-html-->`, and sets `<html lang>`.
4. In the browser, `src/main.tsx` resolves the route from `location.pathname` and hydrates. `<head>` is never touched at runtime; `npm run dev` therefore shows the app without SEO tags (the build is the reference).

JSON-LD: `Person` and `WebSite` on the home page, `Article` (author `Person`) on each case, `WebPage` on privacy and 404. Static HTML carries `h1`, content, `title`, canonical, hreflang and JSON-LD without running any script (`e2e/static-html.spec.ts` checks it with JavaScript off).

## Content

All copy lives in `src/content/` as typed data, one object per language, resolved by `lang`:

- `cases.ts`: the case studies (context, problem, role, 2 or 3 decisions with their reason, difficulty, result, stack, confidentiality note).
- `experience.ts`, `projects.ts`, `stack.ts`, `home.ts` (hero, tagline, about, contact), `ui.ts` (labels, privacy page, 404).

Rules for editing content (enforced by `src/content/content.test.ts`):

- Facts come only from the CV sources (`ai-job-search/cv/*.tex`). Do not invent metrics, clients or dates; when there is no number, write a concrete qualitative result.
- Anonymous on purpose: the software company and the lottery and payments platforms behind it, clients of BetterWay Devs and Atlanticsoft, and any Bheex customer. No IPs, hostnames, keys or phone number.
- No hyphens or dashes inside copy (rewrite the phrase), sentence case, no marketing clichés.
- Case pages should read between 300 and 600 words.

To add a case: add the slug to `caseSlugs`, add its entry to `cases` (both languages) and, if it matches a job, set `caseSlug` on that entry in `experience.ts`. Routes, sitemap and prerender pick it up.

## Design system

`src/styles/global.css` holds the tokens; components use Tailwind utilities that resolve to them. `src/styles/design-rules.test.ts` enforces the rules: Tailwind type scale only, spacing 0/2/4/8/12/16/24/32/40/48/64/80/96 px, no gradients except the hero heading text, no single sided borders, no raw colors, one fluid easing `cubic-bezier(0.32, 0.72, 0, 1)`, no scroll listeners.

- Colors are CSS variables built with `light-dark()`. The system theme applies by default; `<html data-theme="light|dark">` is an explicit choice saved in `localStorage` and applied by `public/init.js` before first paint.
- `--control-h` (40 px) is the one height for buttons, the language switch and the theme toggle.
- Scroll reveals use `[data-reveal]` + `data-in-view`; the tagline uses one observer per word. Both hide content only when `<html class="js">` is set (by `init.js`), so no JavaScript means everything is visible. The hero animates with CSS only.

## Docker and nginx

```bash
docker build -t portfolio .
docker run -d --rm --name portfolio --user 101:101 --read-only \
  --tmpfs /var/cache/nginx:mode=1777 --tmpfs /var/run:mode=1777 --tmpfs /tmp:mode=1777 \
  --cap-drop ALL --cap-add NET_BIND_SERVICE -p 127.0.0.1:8080:80 portfolio
```

`nginx.conf` sets a strict CSP (`script-src 'self'`, no `unsafe-inline` anywhere; JSON-LD is a data block), `server_tokens off`, `X-Frame-Options: DENY`, `Cache-Control: public, max-age=31536000, immutable` for `/assets/` (hashed), `no-cache` for everything else, gzip, and `error_page 404 /404.html`. HSTS is set at the edge (Cloudflare), not here. `e2e/serve-dist.mjs` reads the same `add_header` lines, so e2e runs under the real CSP.

## CI/CD

- `.github/workflows/ci.yml`: pull requests and pushes to `develop`. Job `checks` (tsc, eslint, unit tests, build, `npm audit --audit-level=high`) then job `e2e` (Playwright, Chromium). Runner label `arc-portafolio`; jobs from forks are skipped.
- `.github/workflows/deploy.yml`: push to `main`. `validate` and `build-push` on `arc-portafolio` (image to GHCR, cache `scope=portafolio`), then `deploy` on the fixed runner `[self-hosted, portfolio-prod]`, which pulls the image and runs it with the hardened flags above.
- `.github/actionlint.yaml` declares both runner labels. Node 22 everywhere.
- Host and TLS provisioning notes: `infra/README.md`.

## Assets

- `public/cv/`: the two CV PDFs linked from the hero and contact sections (Spanish and English).
- `public/og-image.png` (1200x630) is generated by `scripts/og-image.mjs`; `public/favicon.svg` is the favicon source.
- `src/assets/avatar.webp`: 576x720 portrait, imported through Vite so it gets a content hash.

## Privacy

The site uses no cookies, analytics or forms. It stores one value in `localStorage` (the theme) and nginx keeps technical access logs. `/privacidad/` and `/en/privacy/` say so.
