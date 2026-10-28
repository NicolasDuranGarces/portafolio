// Serves dist/ the way nginx.conf does, so e2e runs against the real build and the real security headers:
// directory index with trailing slash redirect, a real 404 status with 404.html (also for directories without an
// index.html, which nginx reports as 403 and nginx.conf maps to 404), cache policy,
// and every `add_header ... always` line copied from nginx.conf (including the CSP).
import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(rootDir, 'dist')
const port = Number(process.env.PORT ?? 4173)

const headers = Object.fromEntries(
  [...fs.readFileSync(path.join(rootDir, 'nginx.conf'), 'utf8').matchAll(/add_header\s+([\w-]+)\s+"([^"]*)"\s+always;/g)].map(
    (match) => [match[1], match[2]],
  ),
)
if (!headers['Content-Security-Policy']) throw new Error('nginx.conf defines no Content-Security-Policy header')

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
}

function statOf(file) {
  try {
    return fs.statSync(file)
  } catch {
    return null
  }
}

function send(res, status, file, pathname) {
  const cache = pathname.startsWith('/assets/')
    ? 'public, max-age=31536000, immutable'
    : pathname === '/init.js'
      ? 'public, max-age=3600'
      : 'no-cache'
  res.writeHead(status, {
    ...headers,
    'Cache-Control': cache,
    'Content-Type': types[path.extname(file)] ?? 'application/octet-stream',
  })
  fs.createReadStream(file).pipe(res)
}

http
  .createServer((req, res) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405, headers)
      return res.end()
    }

    const { pathname } = new URL(req.url ?? '/', 'http://localhost')
    const requested = path.join(distDir, decodeURIComponent(pathname))
    const notFound = () => send(res, 404, path.join(distDir, '404.html'), '/404.html')
    // 404.html is `internal` in nginx: it is only ever served as an error page.
    if (!requested.startsWith(distDir) || pathname === '/404.html') return notFound()

    let file = requested
    let stat = statOf(file)
    if (stat?.isDirectory()) {
      if (!pathname.endsWith('/')) {
        res.writeHead(301, { ...headers, Location: `${pathname}/` })
        return res.end()
      }
      file = path.join(file, 'index.html')
      stat = statOf(file)
    }
    if (!stat?.isFile()) return notFound()
    send(res, 200, file, pathname)
  })
  .listen(port, '127.0.0.1', () => console.log(`Serving dist on http://127.0.0.1:${port}`))
