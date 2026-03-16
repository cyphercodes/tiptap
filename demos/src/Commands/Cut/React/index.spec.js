import { expect,test } from '@playwright/test'

test.describe('/src/Commands/Cut/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Commands/Cut/React/')
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<h1>Example Text</h1>')
    await page.keyboard.press('Control+a')
  })

  test('should apply the paragraph style when the keyboard shortcut is pressed', async ({ page }) => {
    await expect(page.locator('.tiptap h1')).toBeVisible()

    await page.keyboard.press('Control+Alt+0')
    await expect(page.locator('.tiptap p')).toContainText('Example Text')
  })
})
