import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should navigate to About section', async ({ page }) => {
    // Click on About link (could be in navigation)
    const aboutLink = page.locator('a[href*="#about"]').first()
    if (await aboutLink.count() > 0) {
      await aboutLink.click()
      await page.waitForTimeout(500)

      // Check if we're near the about section
      const aboutSection = page.locator('#about')
      await expect(aboutSection).toBeVisible()
    }
  })

  test('should navigate to Projects section', async ({ page }) => {
    const projectsLink = page.locator('a[href*="#projects"]').first()
    if (await projectsLink.count() > 0) {
      await projectsLink.click()
      await page.waitForTimeout(500)

      const projectsSection = page.locator('#projects')
      await expect(projectsSection).toBeVisible()
    }
  })

  test('should navigate to Contact section', async ({ page }) => {
    const contactLink = page.locator('a[href*="#contact"]').first()
    if (await contactLink.count() > 0) {
      await contactLink.click()
      await page.waitForTimeout(500)

      const contactSection = page.locator('#contact')
      await expect(contactSection).toBeVisible()
    }
  })

  test('should scroll smoothly between sections', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // Get initial scroll position
    const initialY = await page.evaluate(() => window.scrollY)

    // Navigate to contact (bottom of page)
    await page.locator('a[href*="#contact"]').first().click()
    await page.waitForTimeout(1000)

    const afterScrollY = await page.evaluate(() => window.scrollY)

    // Should have scrolled down
    expect(afterScrollY).toBeGreaterThan(initialY)
  })

  test('should display project cards', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // Navigate to projects section
    await page.goto('/#projects')
    await page.waitForTimeout(500)

    // Check if project cards are visible
    const projectCards = page.locator('.project-card')
    const count = await projectCards.count()

    expect(count).toBeGreaterThan(0)
  })

  test('should have working GitHub link', async ({ page }) => {
    const githubLink = page.locator('a[href*="github.com/NicolasDuranGarces"]').first()

    if (await githubLink.count() > 0) {
      await expect(githubLink).toHaveAttribute('target', '_blank')
      await expect(githubLink).toHaveAttribute('rel', /noopener/)
    }
  })

  test('should have working LinkedIn link', async ({ page }) => {
    const linkedinLink = page.locator('a[href*="linkedin.com"]').first()

    if (await linkedinLink.count() > 0) {
      await expect(linkedinLink).toHaveAttribute('target', '_blank')
      await expect(linkedinLink).toHaveAttribute('rel', /noopener/)
    }
  })
})
