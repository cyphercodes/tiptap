import { expect,test } from '@playwright/test'

test.describe('/src/Extensions/Mathematics/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Extensions/Mathematics/React/')
  })

  test('should include katex-rendered inline and block nodes', async ({ page }) => {
    await expect(page.locator('.tiptap span[data-type="inline-math"]')).toHaveCount(21)
    await expect(page.locator('.tiptap div[data-type="block-math"]')).toHaveCount(1)

    await expect(page.locator('.tiptap span[data-type="inline-math"] .katex')).toHaveCount(21)
    await expect(page.locator('.tiptap div[data-type="block-math"] .katex')).toHaveCount(1)
  })
})
