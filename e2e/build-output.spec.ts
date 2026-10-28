import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { expect, test } from '@playwright/test'

// Checks the files the Docker image will contain; no browser needed.
const dist = path.resolve('dist')
const cases = ['bheex', 'price-match-automation', 'quindio-inteligente-iot', 'warehouse-conveyor-backend']

test('dist contains every page, the 404, the sitemap and the CV files', () => {
  const expected = [
    'index.html',
    'en/index.html',
    'privacidad/index.html',
    'en/privacy/index.html',
    '404.html',
    'sitemap.xml',
    'robots.txt',
    'init.js',
    'og-image.png',
    'cv/nicolas-duran-garces-cv-es.pdf',
    'cv/nicolas-duran-garces-resume-en.pdf',
    ...cases.map((slug) => `casos/${slug}/index.html`),
    ...cases.map((slug) => `en/cases/${slug}/index.html`),
  ]
  for (const file of expected) expect(existsSync(path.join(dist, file)), file).toBe(true)
})

test('ships no source maps and no server bundle', () => {
  const files = readdirSync(dist, { recursive: true }) as string[]
  expect(files.filter((file) => file.endsWith('.map'))).toEqual([])
  expect(existsSync(path.join(dist, 'server'))).toBe(false)
})

test('does not ship the retired CV file or retired assets', () => {
  expect(existsSync(path.join(dist, 'CV_NICOLAS_DURAN.pdf'))).toBe(false)
  expect(readFileSync(path.join(dist, 'index.html'), 'utf8')).not.toContain('CV_NICOLAS_DURAN')
})

test('keeps the JS and CSS bundles lean', () => {
  const assets = readdirSync(path.join(dist, 'assets'))
  const js = assets.filter((file) => file.endsWith('.js'))
  expect(js).toHaveLength(1)
  const bytes = readFileSync(path.join(dist, 'assets', js[0])).length
  expect(bytes).toBeLessThan(260 * 1024)
})
