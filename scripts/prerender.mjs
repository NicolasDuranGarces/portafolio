import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const serverDir = path.join(distDir, 'server')
const serverEntryPath = path.join(serverDir, 'entry-server.js')

const siteUrl = 'https://niduga.dev'
const today = new Date().toISOString().slice(0, 10)

const routes = [
  { pathname: '/', filePath: path.join(distDir, 'index.html') },
  { pathname: '/en/', filePath: path.join(distDir, 'en', 'index.html') },
]

const robotsTxt = `User-agent: *
Allow: /
Disallow: /node_modules/
Disallow: /dist/

Sitemap: ${siteUrl}/sitemap.xml
Host: niduga.dev
`

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="es-CO" href="${siteUrl}/"/>
    <xhtml:link rel="alternate" hreflang="en-US" href="${siteUrl}/en/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/"/>
  </url>
  <url>
    <loc>${siteUrl}/en/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="es-CO" href="${siteUrl}/"/>
    <xhtml:link rel="alternate" hreflang="en-US" href="${siteUrl}/en/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/"/>
  </url>
</urlset>
`

function injectDocument(template, helmet, appHtml, locale) {
  const htmlAttrs = helmet.htmlAttributes?.toString() ?? `lang="${locale}"`
  const bodyAttrs = helmet.bodyAttributes?.toString() ?? ''
  const title = helmet.title?.toString() ?? ''
  const meta = helmet.meta?.toString() ?? ''
  const link = helmet.link?.toString() ?? ''
  const script = helmet.script?.toString() ?? ''

  return template
    .replace(/<html[^>]*>/, `<html ${htmlAttrs}>`)
    .replace(/<body[^>]*>/, bodyAttrs ? `<body ${bodyAttrs}>` : '<body>')
    .replace('</head>', `${title}${meta}${link}${script}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
}

async function main() {
  const [{ renderPage }, template] = await Promise.all([
    import(pathToFileURL(serverEntryPath).href),
    fs.readFile(path.join(distDir, 'index.html'), 'utf8'),
  ])

  for (const route of routes) {
    const { appHtml, helmetContext, locale } = renderPage(route.pathname)
    const helmet = helmetContext.helmet
    const documentHtml = injectDocument(template, helmet, appHtml, locale)

    await fs.mkdir(path.dirname(route.filePath), { recursive: true })
    await fs.writeFile(route.filePath, documentHtml, 'utf8')
  }

  await Promise.all([
    fs.writeFile(path.join(distDir, 'robots.txt'), robotsTxt, 'utf8'),
    fs.writeFile(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8'),
  ])
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
