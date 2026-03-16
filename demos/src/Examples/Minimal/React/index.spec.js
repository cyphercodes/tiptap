import { expect,test } from '@playwright/test'

test.describe('/src/Examples/Minimal/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Examples/Minimal/React/')
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })
  })

  test('text should be wrapped in a paragraph by default', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('Example Text')
    await expect(page.locator('.tiptap p')).toContainText('Example Text')
  })

  test('should parse paragraphs correctly', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<p>Example Text</p>')
    })
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe('<p>Example Text</p>')

    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p style="color:DodgerBlue;">Example Text</p>')
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe('<p>Example Text</p>')
  })

  test('enter should make a new paragraph', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('First Paragraph')
    await page.keyboard.press('Enter')
    await page.locator('.tiptap').pressSequentially('Second Paragraph')
    await expect(page.locator('.tiptap p')).toHaveCount(2)
  })

  test('backspace should remove the last paragraph', async ({ page }) => {
    await page.locator('.tiptap').click()
    await page.keyboard.press('Enter')
    await expect(page.locator('.tiptap p')).toHaveCount(2)

    await page.keyboard.press('Backspace')
    await expect(page.locator('.tiptap p')).toHaveCount(1)
  })
})
