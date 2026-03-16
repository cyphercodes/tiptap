import { expect,test } from '@playwright/test'

test.describe('/src/Marks/Strike/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Marks/Strike/React/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p>Example Text</p>')
    await page.keyboard.press('Control+a')
  })

  test('should parse s tags correctly', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p><s>Example Text</s></p>')
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<p><s>Example Text</s></p>',
    )
  })

  test('should transform del tags to s tags', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p><del>Example Text</del></p>')
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<p><s>Example Text</s></p>',
    )
  })

  test('should transform strike tags to s tags', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p><strike>Example Text</strike></p>')
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<p><s>Example Text</s></p>',
    )
  })

  test('should transform any tag with text decoration line through to s tags', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p><span style="text-decoration: line-through">Example Text</span></p>')
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<p><s>Example Text</s></p>',
    )
  })

  test('the button should strike the selected text', async ({ page }) => {
    await page.locator('button').first().click()

    await expect(page.locator('.tiptap s')).toContainText('Example Text')
  })

  test('the button should toggle the selected text striked', async ({ page }) => {
    await page.locator('button').first().click()

    await page.keyboard.press('Control+a')

    await page.locator('button').first().click()

    await expect(page.locator('.tiptap s')).toHaveCount(0)
  })

  test('should strike the selected text when the keyboard shortcut is pressed', async ({ page }) => {
    await page.keyboard.press('Control+Shift+s')
    await expect(page.locator('.tiptap s')).toContainText('Example Text')
  })

  test('should toggle the selected text striked when the keyboard shortcut is pressed', async ({ page }) => {
    await page.keyboard.press('Control+Shift+s')
    await page.keyboard.press('Control+Shift+s')
    await expect(page.locator('.tiptap s')).toHaveCount(0)
  })

  test('should make a striked text from the markdown shortcut', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('~~Strike~~')
    await expect(page.locator('.tiptap s')).toContainText('Strike')
  })
})
