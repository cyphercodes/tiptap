import { expect,test } from '@playwright/test'

test.describe('/src/Marks/Code/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Marks/Code/Vue/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p>Example Text</p>')
    await page.keyboard.press('Control+a')
  })

  test('should parse code tags correctly', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p><code>Example Text</code></p>')
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<p><code>Example Text</code></p>',
    )

    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<code>Example Text</code>')
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<p><code>Example Text</code></p>',
    )
  })

  test('should mark the selected text as inline code', async ({ page }) => {
    await page.locator('button').first().click()

    await expect(page.locator('.tiptap code')).toContainText('Example Text')
  })

  test('should toggle the selected text as inline code', async ({ page }) => {
    await page.locator('button').first().click()

    await page.keyboard.press('Control+a')

    await page.locator('button').first().click()

    await expect(page.locator('.tiptap code')).toHaveCount(0)
  })

  test('should make the selected text bold when the keyboard shortcut is pressed', async ({ page }) => {
    await page.keyboard.press('Control+e')
    await expect(page.locator('.tiptap code')).toContainText('Example Text')
  })

  test('should toggle the selected text bold when the keyboard shortcut is pressed', async ({ page }) => {
    await page.keyboard.press('Control+e')
    await expect(page.locator('.tiptap code')).toContainText('Example Text')

    await page.keyboard.press('Control+e')

    await expect(page.locator('.tiptap code')).toHaveCount(0)
  })

  test('should make inline code from the markdown shortcut', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('`Example`')
    await expect(page.locator('.tiptap code')).toContainText('Example')
  })
})
