import { expect, test, type Locator, type Page } from '@playwright/test'

async function clickByHref(page: Page, href: string) {
  await page.evaluate((targetHref) => {
    const element = document.querySelector<HTMLAnchorElement>(`a[href="${targetHref}"]`)
    if (!element) throw new Error(`Missing anchor for ${targetHref}`)
    element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
  }, href)
}

async function expectHashNavigation(page: Page, href: string, expectedHash: string, target: Locator) {
  await clickByHref(page, href)

  await expect(page).toHaveURL(new RegExp(`${expectedHash.replace('#', '\\#')}$`))
  await expect(target).toBeInViewport()

  await expect
    .poll(async () => {
      const box = await target.boundingBox()
      return box?.y ?? Number.POSITIVE_INFINITY
    })
    .toBeLessThan(220)
}

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
  })

  test('uses the hero CTA to navigate to the projects section', async ({ page }) => {
    await expectHashNavigation(
      page,
      '#projects',
      '#projects',
      page.locator('#projects'),
    )

    await expect(page.locator('#projects-title')).toHaveText('Proyectos')
    await expect(page.locator('.project-bento-card.featured')).toBeVisible()
  })

  test('uses the hero CTA to navigate to the contact section', async ({ page }) => {
    await expectHashNavigation(
      page,
      '#contact',
      '#contact',
      page.locator('#contact'),
    )

    await expect(page.locator('#contact-title')).toHaveText('Contacto')
    await expect(page.getByRole('heading', { name: 'También en redes' })).toBeVisible()
  })

  test('supports direct deep links to sections in the new layout', async ({ page }) => {
    await page.goto('/#about')

    await expect(page).toHaveURL(/\/#about$/)
    await expect(page.locator('#about')).toBeInViewport()
    await expect(page.locator('#about-title')).toHaveText('Sobre mí')
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
    const githubLink = page.getByRole('link', { name: 'GitHub' }).first()
    const linkedInLink = page.getByRole('link', { name: 'LinkedIn' }).first()
    const emailLink = page.getByRole('link', { name: 'Email' }).first()

    await expect(githubLink).toHaveAttribute('href', 'https://github.com/NicolasDuranGarces')
    await expect(githubLink).toHaveAttribute('target', '_blank')
    await expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')

    await expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/in/garcesnicolas/')
    await expect(linkedInLink).toHaveAttribute('target', '_blank')
    await expect(linkedInLink).toHaveAttribute('rel', 'noopener noreferrer')

    await expect(emailLink).toHaveAttribute('href', 'mailto:niduga@outlook.es')
  })
})
