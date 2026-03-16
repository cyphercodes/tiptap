import { expect,test } from '@playwright/test'

test.describe('/src/Examples/StaticRenderingAdvanced/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Examples/StaticRenderingAdvanced/React/')
  })

  test('should render the content as HTML', async ({ page }) => {
    await expect(page.locator('p')).toBeVisible()
  })
})
