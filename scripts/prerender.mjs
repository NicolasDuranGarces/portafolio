import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

// react-dom/server reads NODE_ENV at load time: production build means faster rendering and no dev warnings.
process.env.NODE_ENV = 'production'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(rootDir, 'dist')
const serverDir = path.join(distDir, 'server')

const { listPages, renderRoute, buildSitemap, buildRobots } = await import(
  pathToFileURL(path.join(serverDir, 'entry-server.js')).href
)

const template = await fs.readFile(path.join(distDir, 'index.html'), 'utf8')
for (const marker of ['<!--app-head-->', '<!--app-html-->']) {
  if (!template.includes(marker)) throw new Error(`dist/index.html lost its ${marker} placeholder`)
}

// The font file name carries a content hash, so the preload tag is built from what the client build emitted.
const assets = await fs.readdir(path.join(distDir, 'assets'))
const preloads = assets
  .filter((name) => /^geist-latin-wght-normal-.+\.woff2$/.test(name))
  .map((name) => `<link rel="preload" href="/assets/${name}" as="font" type="font/woff2" crossorigin>`)

for (const { route, file } of listPages()) {
  const page = renderRoute(route)
  const html = template
    .replace(/<html lang="[^"]*"/, `<html lang="${page.lang}"`)
    .replace('<!--app-head-->', () => [...preloads, page.head].join('\n    '))
    .replace('<!--app-html-->', () => page.html)

  const target = path.join(distDir, file)
  await fs.mkdir(path.dirname(target), { recursive: true })
  await fs.writeFile(target, html, 'utf8')
}

const lastmod = new Date().toISOString().slice(0, 10)
await Promise.all([
  fs.writeFile(path.join(distDir, 'sitemap.xml'), buildSitemap(lastmod), 'utf8'),
  fs.writeFile(path.join(distDir, 'robots.txt'), buildRobots(), 'utf8'),
])

// The SSR bundle is a build tool, not something nginx should serve.
await fs.rm(serverDir, { recursive: true, force: true })
