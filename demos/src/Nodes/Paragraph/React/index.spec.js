import { expect,test } from '@playwright/test'

test.describe('/src/Nodes/Paragraph/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Nodes/Paragraph/React/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })
  })

  test('should parse paragraphs correctly', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p>Example Text</p>')
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe('<p>Example Text</p>')

    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p><x-unknown>Example Text</x-unknown></p>')
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe('<p>Example Text</p>')

    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p style="display: block;">Example Text</p>')
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe('<p>Example Text</p>')
  })

  test('text should be wrapped in a paragraph by default', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('Example Text')
    await expect(page.locator('.tiptap p')).toContainText('Example Text')
  })

  test('enter should make a new paragraph', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('First Paragraph')
    await page.keyboard.press('Enter')
    await page.locator('.tiptap').pressSequentially('Second Paragraph')
    await expect(page.locator('.tiptap p')).toHaveCount(2)

    await expect(page.locator('.tiptap p').first()).toContainText('First Paragraph')

    await expect(page.locator('.tiptap p:nth-child(2)')).toContainText('Second Paragraph')
  })

  test('backspace should remove the second paragraph', async ({ page }) => {
    await page.keyboard.press('Enter')
    await expect(page.locator('.tiptap p')).toHaveCount(2)

    await page.keyboard.press('Backspace')
    await expect(page.locator('.tiptap p')).toHaveCount(1)
  })
})
