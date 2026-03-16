import { expect,test } from '@playwright/test'

test.describe('/src/Extensions/Selection/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Extensions/Selection/Vue/')
  })

  test('should have class', async ({ page }) => {
    await expect(page.locator('.tiptap span').first()).toHaveClass(/selection/)
  })
})
