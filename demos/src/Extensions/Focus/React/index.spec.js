import { expect,test } from '@playwright/test'

test.describe('/src/Extensions/Focus/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Extensions/Focus/React/')
  })

  test('should have class', async ({ page }) => {
    await expect(page.locator('.tiptap p').first()).toHaveClass(/has-focus/)
  })
})
