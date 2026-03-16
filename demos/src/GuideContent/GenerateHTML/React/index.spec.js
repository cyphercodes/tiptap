import { expect,test } from '@playwright/test'

test.describe('/src/GuideContent/GenerateHTML/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/GuideContent/GenerateHTML/React/')
  })

  test('should render the content as an HTML string', async ({ page }) => {
    await expect(page.locator('pre code')).toBeVisible()

    await expect(page.locator('pre code')).toContainText(
      '<p xmlns="http://www.w3.org/1999/xhtml">Example <strong>Text</strong></p>',
    )
  })
})
