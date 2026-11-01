// Renders public/og-image.png (1200x630) with Playwright. Run `npm run og` after changing the name or role.
// The card uses the site tokens: flat #111111 canvas, Helvetica Neue, one green accent and the portrait.
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from '@playwright/test'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const photo = await fs.readFile(path.join(rootDir, 'src/assets/avatar.webp'))

const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      * { box-sizing: border-box; margin: 0; }
      body {
        width: 1200px;
        height: 630px;
        padding: 64px;
        display: flex;
        justify-content: space-between;
        gap: 48px;
        background: #111111;
        color: #f2f2f2;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      }
      .text { display: flex; flex-direction: column; justify-content: space-between; width: 640px; }
      .domain { font-size: 28px; color: #a3a3a3; }
      h1 {
        font-size: 88px;
        font-weight: 700;
        letter-spacing: -0.05em;
        line-height: 1;
      }
      .role { margin-top: 24px; font-size: 40px; font-weight: 700; line-height: 1.1; color: #4cc782; }
      .role-en { margin-top: 8px; font-size: 40px; font-weight: 700; line-height: 1.1; color: #a3a3a3; }
      .stack { font-size: 28px; color: #a3a3a3; }
      img { width: 402px; height: 502px; object-fit: cover; }
    </style>
  </head>
  <body>
    <div class="text">
      <p class="domain">niduga.dev</p>
      <div>
        <h1>Nicolás Durán Garcés</h1>
        <p class="role">Ingeniero backend e IA</p>
        <p class="role-en">Backend and AI engineer</p>
      </div>
      <p class="stack">Python · Java · TypeScript · AWS</p>
    </div>
    <img src="data:image/webp;base64,${photo.toString('base64')}" alt="" />
  </body>
</html>`

const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
  await page.setContent(html)
  await page.screenshot({ path: path.join(rootDir, 'public/og-image.png'), type: 'png' })
} finally {
  await browser.close()
}
