import { expect,test } from '@playwright/test'

test.describe('/src/Marks/Underline/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Marks/Underline/React/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p>Example Text</p>')
    await page.keyboard.press('Control+a')
  })

  test('should parse u tags correctly', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p><u>Example Text</u></p>')
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<p><u>Example Text</u></p>',
    )
  })

  test('should transform any tag with text decoration underline to u tags', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p><span style="text-decoration: underline">Example Text</span></p>')
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<p><u>Example Text</u></p>',
    )
  })

  test('the button should underline the selected text', async ({ page }) => {
    await page.locator('button').first().click()

    await expect(page.locator('.tiptap u')).toContainText('Example Text')
  })

  test('the button should toggle the selected text underline', async ({ page }) => {
    await page.locator('button').first().click()

    await page.keyboard.press('Control+a')

    await page.locator('button').first().click()

    await expect(page.locator('.tiptap u')).toHaveCount(0)
  })

  test('should underline the selected text when the keyboard shortcut is pressed', async ({ page }) => {
    await page.keyboard.press('Control+u')
    await expect(page.locator('.tiptap u')).toContainText('Example Text')
  })

  test('should toggle the selected text underline when the keyboard shortcut is pressed', async ({ page }) => {
    await page.keyboard.press('Control+u')
    await page.keyboard.press('Control+u')
    await expect(page.locator('.tiptap u')).toHaveCount(0)
  })
})
