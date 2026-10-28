// Renders public/og-image.png (1200x630) with Playwright. Run `npm run og` after changing the name or role.
// The card uses the site tokens: flat #000000 canvas, Geist, the hero text gradient and the portrait.
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from '@playwright/test'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const [font, photo] = await Promise.all([
  fs.readFile(path.join(rootDir, 'node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2')),
  fs.readFile(path.join(rootDir, 'src/assets/avatar.webp')),
])

const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      @font-face {
        font-family: 'Geist';
        font-weight: 100 900;
        src: url(data:font/woff2;base64,${font.toString('base64')}) format('woff2-variations');
      }
      * { box-sizing: border-box; margin: 0; }
      body {
        width: 1200px;
        height: 630px;
        padding: 64px;
        display: flex;
        justify-content: space-between;
        gap: 48px;
        background: #000000;
        color: #ededed;
        font-family: 'Geist', sans-serif;
      }
      .text { display: flex; flex-direction: column; justify-content: space-between; width: 640px; }
      .domain { font-size: 28px; color: #a1a1a1; }
      h1 {
        font-size: 88px;
        font-weight: 600;
        letter-spacing: -0.025em;
        line-height: 1;
        background: linear-gradient(to right, #ffffff, #9b9b9b);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
      .role { margin-top: 24px; font-size: 40px; font-weight: 500; line-height: 1.1; }
      .role-en { margin-top: 8px; font-size: 40px; font-weight: 500; line-height: 1.1; color: #a1a1a1; }
      .stack { font-size: 28px; color: #a1a1a1; }
      img { width: 402px; height: 502px; object-fit: cover; border-radius: 24px; border: 1px solid #272727; }
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
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: path.join(rootDir, 'public/og-image.png'), type: 'png' })
} finally {
  await browser.close()
}
