import { expect,test } from '@playwright/test'

test.describe('/src/Marks/Bold/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Marks/Bold/React/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p>Example Text</p>')
    await page.keyboard.press('Control+a')
  })

  test('should transform b tags to strong tags', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p><b>Example Text</b></p>')
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<p><strong>Example Text</strong></p>',
    )
  })

  test('sould omit b tags with normal font weight inline style', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p><b style="font-weight: normal">Example Text</b></p>')
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe('<p>Example Text</p>')
  })

  test('should transform any tag with bold inline style to strong tags', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p><span style="font-weight: bold">Example Text</span></p>')
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<p><strong>Example Text</strong></p>',
    )

    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p><span style="font-weight: bolder">Example Text</span></p>')
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<p><strong>Example Text</strong></p>',
    )

    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p><span style="font-weight: 500">Example Text</span></p>')
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<p><strong>Example Text</strong></p>',
    )

    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p><span style="font-weight: 900">Example Text</span></p>')
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<p><strong>Example Text</strong></p>',
    )
  })

  test('the button should make the selected text bold', async ({ page }) => {
    await page.locator('button').first().click()

    await expect(page.locator('.tiptap strong')).toContainText('Example Text')
  })

  test('the button should toggle the selected text bold', async ({ page }) => {
    await page.locator('button').first().click()
    await page.keyboard.press('Control+a')
    await page.locator('button').first().click()
    await expect(page.locator('.tiptap strong')).toHaveCount(0)
  })

  test('should make the selected text bold when the keyboard shortcut is pressed', async ({ page }) => {
    await page.keyboard.press('Control+b')
    await expect(page.locator('.tiptap strong')).toContainText('Example Text')
  })

  test('should toggle the selected text bold when the keyboard shortcut is pressed', async ({ page }) => {
    await page.keyboard.press('Control+b')
    await expect(page.locator('.tiptap strong')).toContainText('Example Text')

    await page.keyboard.press('Control+b')

    await expect(page.locator('.tiptap strong')).toHaveCount(0)
  })

  test('should make a bold text from the default markdown shortcut', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('**Bold**')
    await expect(page.locator('.tiptap strong')).toContainText('Bold')
  })

  test('should make a bold text from the alternative markdown shortcut', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('__Bold__')
    await expect(page.locator('.tiptap strong')).toContainText('Bold')
  })
})
