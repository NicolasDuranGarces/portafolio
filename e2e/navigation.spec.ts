import { expect, test } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
  })

  test('supports direct deep links to sections in the new layout', async ({ page }) => {
    await page.goto('/#about')

    await expect(page).toHaveURL(/\/#about$/)
    await expect(page.locator('#about')).toBeInViewport()
    await expect(page.locator('#about-title')).toHaveText('Sobre mí')

    await page.goto('/#projects')
    await expect(page).toHaveURL(/\/#projects$/)
    await expect(page.locator('#projects')).toBeInViewport()
    await expect(page.locator('#projects-title')).toHaveText('Proyectos')
  })

  test('opens the featured project modal from the bento grid', async ({ page }) => {
    const featuredCard = page.locator('.project-bento-card.featured')

    await expect(featuredCard).toBeVisible()
    await featuredCard.dispatchEvent('click')

    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('button', { name: 'Cerrar modal' })).toBeVisible()
    await expect(dialog.getByRole('heading')).toBeVisible()
    expect(await dialog.locator('.badge').count()).toBeGreaterThan(0)
  })

  test('keeps external social links explicit and safe', async ({ page }) => {
    const githubLink = page.getByRole('link', { name: 'github.com/NicolasDuranGarces' }).first()
    const linkedInLink = page.getByRole('link', { name: 'LinkedIn Nicolas Duran Garces' }).first()
    const cvLink = page.getByRole('link', { name: 'Descargar mi hoja de vida en formato PDF' }).first()

    await expect(githubLink).toHaveAttribute('href', 'https://github.com/NicolasDuranGarces')
    await expect(githubLink).toHaveAttribute('target', '_blank')
    await expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')

    await expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/in/garcesnicolas/')
    await expect(linkedInLink).toHaveAttribute('target', '_blank')
    await expect(linkedInLink).toHaveAttribute('rel', 'noopener noreferrer')

    await expect(cvLink).toHaveAttribute('href', '/CV_NICOLAS_DURAN.pdf')
    await expect(cvLink).toHaveAttribute('download', '')
  })
})
