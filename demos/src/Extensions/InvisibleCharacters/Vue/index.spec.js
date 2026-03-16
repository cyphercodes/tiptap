import { expect,test } from '@playwright/test'

test.describe('/src/Extensions/InvisibleCharacters/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Extensions/InvisibleCharacters/Vue/')
  })

  test('should have invisible characters', async ({ page }) => {
    await expect(page.locator('[class*="tiptap-invisible-character"]').first()).toBeVisible()
  })
})
