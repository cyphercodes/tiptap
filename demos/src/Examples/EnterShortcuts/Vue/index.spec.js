import { expect,test } from '@playwright/test'

test.describe('/src/Examples/EnterShortcuts/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Examples/EnterShortcuts/Vue/')
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<p>Example Text</p>')
    })
  })

  test('should update the hint html when the keyboard shortcut is pressed', async ({ page }) => {
    await page.locator('.tiptap').press('Meta+Enter')
    await expect(page.locator('.hint')).toContainText('Meta-Enter was the last shortcut')
  })

  test('should update the hint html when the keyboard shortcut is pressed', async ({ page }) => {
    await page.locator('.tiptap').press('Shift+Enter')
    await expect(page.locator('.hint')).toContainText('Shift-Enter was the last shortcut')
  })

  test('should update the hint html when the keyboard shortcut is pressed', async ({ page }) => {
    await page.locator('.tiptap').press('Control+Enter')
    await expect(page.locator('.hint')).toContainText('Ctrl-Enter was the last shortcut')
  })
})
