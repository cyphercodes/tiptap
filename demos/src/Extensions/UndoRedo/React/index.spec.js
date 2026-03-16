import { expect,test } from '@playwright/test'

test.describe('/src/Extensions/UndoRedo/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Extensions/UndoRedo/React/')
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<p>Mistake</p>')
    })
  })

  test('should make the last change undone', async ({ page }) => {
    await expect(page.locator('.tiptap')).toContainText('Mistake')

    await expect(page.locator('button').first()).not.toHaveAttribute('disabled')

    await page.locator('button').first().click()

    await expect(page.locator('.tiptap')).not.toContainText('Mistake')
  })

  test('should make the last change undone with the keyboard shortcut', async ({ page }) => {
    await page.locator('.tiptap').click()
    await page.keyboard.press('Control+z')

    await expect(page.locator('.tiptap')).not.toContainText('Mistake')
  })

  test('should make the last change undone with the keyboard shortcut (russian)', async ({ page }) => {
    await expect(page.locator('.tiptap')).toContainText('Mistake')

    await page.locator('.tiptap').click()
    await page.keyboard.press('Control+\u044f')

    await expect(page.locator('.tiptap')).not.toContainText('Mistake')
  })

  test('should apply the last undone change again with the keyboard shortcut', async ({ page }) => {
    await page.locator('.tiptap').click()
    await page.keyboard.press('Control+z')

    await expect(page.locator('.tiptap')).not.toContainText('Mistake')

    await page.keyboard.press('Control+Shift+z')

    await expect(page.locator('.tiptap')).toContainText('Mistake')
  })

  test('should apply the last undone change again with the keyboard shortcut (russian)', async ({ page }) => {
    await page.locator('.tiptap').click()
    await page.keyboard.press('Control+\u044f')

    await expect(page.locator('.tiptap')).not.toContainText('Mistake')

    await page.keyboard.press('Control+Shift+\u044f')

    await expect(page.locator('.tiptap')).toContainText('Mistake')
  })

  test('should apply the last undone change again', async ({ page }) => {
    await expect(page.locator('.tiptap')).toContainText('Mistake')

    await expect(page.locator('button').first()).not.toHaveAttribute('disabled')

    await page.locator('button').first().click()

    await expect(page.locator('.tiptap')).not.toContainText('Mistake')

    await expect(page.locator('button').first()).toHaveAttribute('disabled')

    await page.locator('button:nth-child(2)').click()

    await expect(page.locator('.tiptap')).toContainText('Mistake')
  })

  test('should disable undo button when there are no more changes to undo', async ({ page }) => {
    await expect(page.locator('.tiptap')).toContainText('Mistake')

    await expect(page.locator('button').first()).not.toHaveAttribute('disabled')

    await page.locator('button').first().click()

    await expect(page.locator('button').first()).toHaveAttribute('disabled')
  })

  test('should disable redo button when there are no more changes to redo', async ({ page }) => {
    await expect(page.locator('.tiptap')).toContainText('Mistake')

    await expect(page.locator('button:nth-child(2)')).toHaveAttribute('disabled')

    await expect(page.locator('button').first()).not.toHaveAttribute('disabled')

    await page.locator('button').first().click()

    await expect(page.locator('button:nth-child(2)')).not.toHaveAttribute('disabled')
  })
})
