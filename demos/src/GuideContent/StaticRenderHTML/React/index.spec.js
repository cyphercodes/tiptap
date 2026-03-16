import { expect,test } from '@playwright/test'

test.describe('/src/GuideContent/StaticRenderHTML/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/GuideContent/StaticRenderHTML/React/')
  })

  test('should render the content as an HTML string', async ({ page }) => {
    await expect(page.locator('pre code')).toBeVisible()

    await expect(page.locator('pre code')).toContainText('<p>Example <strong>Text</strong></p>')
  })
})
