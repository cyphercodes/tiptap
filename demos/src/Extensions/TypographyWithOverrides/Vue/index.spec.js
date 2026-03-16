import { expect,test } from '@playwright/test'

test.describe('/src/Extensions/TypographyWithOverrides/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Extensions/TypographyWithOverrides/Vue/')
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })
  })

  test('should use correct override for rightArrow', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('-> Hello!')
    await expect(page.locator('.tiptap')).toContainText('=====> Hello!')
  })
})
