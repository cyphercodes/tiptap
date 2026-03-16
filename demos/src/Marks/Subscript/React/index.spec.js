import { expect,test } from '@playwright/test'

test.describe('/src/Marks/Subscript/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Marks/Subscript/React/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p>Example Text</p>')
    await page.keyboard.press('Control+a')
  })

  test('should transform inline style to sub tags', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p><span style="vertical-align: sub">Example Text</span></p>')
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<p><sub>Example Text</sub></p>',
    )
  })

  test('sould omit inline style with a different vertical align', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p><b style="vertical-align: middle">Example Text</b></p>')
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe('<p>Example Text</p>')
  })

  test('the button should make the selected text bold', async ({ page }) => {
    await page.locator('button').first().click()

    await expect(page.locator('.tiptap sub')).toContainText('Example Text')
  })

  test('the button should toggle the selected text bold', async ({ page }) => {
    await page.locator('button').first().click()
    await page.keyboard.press('Control+a')
    await page.locator('button').first().click()
    await expect(page.locator('.tiptap sub')).toHaveCount(0)
  })
})
