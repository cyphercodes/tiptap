import { expect,test } from '@playwright/test'

test.describe('/src/Nodes/Blockquote/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Nodes/Blockquote/React/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<p>Example Text</p>')
    })
    await page.keyboard.press('Control+a')
  })

  test('should parse blockquote tags correctly', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<blockquote><p>Example Text</p></blockquote>')
    })
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<blockquote><p>Example Text</p></blockquote>',
    )
  })

  test('should parse blockquote tags without paragraphs correctly', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<blockquote>Example Text</blockquote>')
    })
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<blockquote><p>Example Text</p></blockquote>',
    )
  })

  test('the button should make the selected line a blockquote', async ({ page }) => {
    await expect(page.locator('.tiptap blockquote')).toHaveCount(0)

    await page.locator('button').first().click()

    await expect(page.locator('.tiptap blockquote')).toContainText('Example Text')
  })

  test('the button should wrap all nodes in one blockquote', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<p>Example Text</p><p>Example Text</p>')
    })
    await page.keyboard.press('Control+a')

    await page.locator('button').first().click()

    await expect(page.locator('.tiptap blockquote')).toHaveCount(1)
  })

  test('the button should toggle the blockquote', async ({ page }) => {
    await expect(page.locator('.tiptap blockquote')).toHaveCount(0)

    await page.locator('button').first().click()

    await expect(page.locator('.tiptap blockquote')).toContainText('Example Text')

    await page.keyboard.press('Control+a')

    await page.locator('button').first().click()

    await expect(page.locator('.tiptap blockquote')).toHaveCount(0)
  })

  test('should make the selected line a blockquote when the keyboard shortcut is pressed', async ({ page }) => {
    await page.keyboard.press('Control+Shift+b')
    await expect(page.locator('.tiptap blockquote')).toContainText('Example Text')
  })

  test('should toggle the blockquote when the keyboard shortcut is pressed', async ({ page }) => {
    await expect(page.locator('.tiptap blockquote')).toHaveCount(0)

    await page.keyboard.press('Control+Shift+b')
    await expect(page.locator('.tiptap blockquote')).toContainText('Example Text')

    await page.keyboard.press('Control+a')
    await page.keyboard.press('Control+Shift+b')

    await expect(page.locator('.tiptap blockquote')).toHaveCount(0)
  })

  test('should make a blockquote from markdown shortcuts', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('> Quote')
    await expect(page.locator('.tiptap blockquote')).toContainText('Quote')
  })
})
