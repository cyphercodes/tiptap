import { expect,test } from '@playwright/test'

test.describe('/src/Nodes/Text/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Nodes/Text/React/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })
  })

  test('text should be wrapped in a paragraph by default', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('Example Text')
    await expect(page.locator('.tiptap p')).toContainText('Example Text')
  })
})
