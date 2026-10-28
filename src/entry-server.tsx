import { renderToString } from 'react-dom/server'
import { App } from './App'
import type { Lang } from './lib/lang'
import { fileOf, pageRoutes, type Route } from './lib/routes'
import { getPageMeta, renderHead } from './lib/seo'

export { buildRobots, buildSitemap } from './lib/sitemap'

const notFound: Route = { page: 'notFound' }

/** Every file the build must emit: all pages in both languages plus the bilingual 404. */
export function listPages(): { route: Route; file: string }[] {
  return [...pageRoutes(), notFound].map((route) => ({ route, file: fileOf(route) }))
}

export function renderRoute(route: Route): { lang: Lang; head: string; html: string } {
  const meta = getPageMeta(route)
  return { lang: meta.lang, head: renderHead(meta), html: renderToString(<App route={route} />) }
}
