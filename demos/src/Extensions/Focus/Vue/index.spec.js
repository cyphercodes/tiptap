import { expect,test } from '@playwright/test'

test.describe('/src/Extensions/Focus/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Extensions/Focus/Vue/')
  })

  test('should have class', async ({ page }) => {
    await expect(page.locator('.tiptap p').first()).toHaveClass(/has-focus/)
  })
})
