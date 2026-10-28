import { describe, expect, it } from 'vitest'
import { pageRoutes, pathOf } from './routes'
import { buildRobots, buildSitemap } from './sitemap'

describe('sitemap', () => {
  const xml = buildSitemap('2026-10-28')

  it('lists every page once, and not the 404', () => {
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
    expect(locs).toEqual(pageRoutes().map((route) => `https://niduga.dev${pathOf(route)}`))
    expect(xml).not.toContain('404')
  })

  it('gives each URL the full set of language alternates', () => {
    const blocks = xml.split('<url>').slice(1)
    expect(blocks).toHaveLength(pageRoutes().length)
    for (const block of blocks) {
      expect(block.match(/hreflang="es-CO"/g)).toHaveLength(1)
      expect(block.match(/hreflang="en-US"/g)).toHaveLength(1)
      expect(block.match(/hreflang="x-default"/g)).toHaveLength(1)
    }
  })

  it('points robots.txt at the sitemap and blocks nothing', () => {
    const robots = buildRobots()
    expect(robots).toContain('Sitemap: https://niduga.dev/sitemap.xml')
    expect(robots).not.toMatch(/Disallow:\s*\//)
  })
})
