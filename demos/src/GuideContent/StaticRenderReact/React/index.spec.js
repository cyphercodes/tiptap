import { expect,test } from '@playwright/test'

test.describe('/src/GuideContent/StaticRenderReact/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/GuideContent/StaticRenderReact/React/')
  })

  test('should render the content as HTML', async ({ page }) => {
    await expect(page.locator('p')).toBeVisible()
    await expect(page.locator('p')).toContainText('Example')

    await expect(page.locator('p strong')).toBeVisible()
    await expect(page.locator('p strong')).toContainText('Text')
  })
})
