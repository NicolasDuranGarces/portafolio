import { alternates, pageRoutes, pathOf } from './routes'
import { absoluteUrl } from './site'

/** XML sitemap with hreflang alternates for every page. The 404 page is not listed. */
export function buildSitemap(lastmod: string): string {
  const urls = pageRoutes().map((route) => {
    const links = alternates(route)
      .map((alt) => `    <xhtml:link rel="alternate" hreflang="${alt.hrefLang}" href="${alt.href}"/>`)
      .join('\n')
    return `  <url>\n    <loc>${absoluteUrl(pathOf(route))}</loc>\n    <lastmod>${lastmod}</lastmod>\n${links}\n  </url>`
  })

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`
}

export function buildRobots(): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`
}
