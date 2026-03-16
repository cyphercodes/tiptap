import { expect,test } from '@playwright/test'

test.describe('/src/Extensions/InvisibleCharacters/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Extensions/InvisibleCharacters/React/')
  })

  test('should have invisible characters', async ({ page }) => {
    await expect(page.locator('[class*="tiptap-invisible-character"]').first()).toBeVisible()
  })
})
