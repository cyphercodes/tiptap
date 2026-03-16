import { expect,test } from '@playwright/test'

test.describe('/src/Marks/Italic/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Marks/Italic/Vue/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p>Example Text</p>')
    await page.keyboard.press('Control+a')
  })

  test('i tags should be transformed to em tags', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p><i>Example Text</i></p>')
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<p><em>Example Text</em></p>',
    )
  })

  test('i tags with normal font style should be omitted', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p><i style="font-style: normal">Example Text</i></p>')
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe('<p>Example Text</p>')
  })

  test('generic tags with italic style should be transformed to strong tags', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p><span style="font-style: italic">Example Text</span></p>')
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<p><em>Example Text</em></p>',
    )
  })

  test('the button should make the selected text italic', async ({ page }) => {
    await page.locator('button').first().click()

    await expect(page.locator('.tiptap em')).toContainText('Example Text')
  })

  test('the button should toggle the selected text italic', async ({ page }) => {
    await page.locator('button').first().click()

    await page.keyboard.press('Control+a')

    await page.locator('button').first().click()

    await expect(page.locator('.tiptap em')).toHaveCount(0)
  })

  test('the keyboard shortcut should make the selected text italic', async ({ page }) => {
    await page.keyboard.press('Control+i')
    await expect(page.locator('.tiptap em')).toContainText('Example Text')
  })

  test('the keyboard shortcut should toggle the selected text italic', async ({ page }) => {
    await page.keyboard.press('Control+i')
    await page.keyboard.press('Control+i')
    await expect(page.locator('.tiptap em')).toHaveCount(0)
  })
})
