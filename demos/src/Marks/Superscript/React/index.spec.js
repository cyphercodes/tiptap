import { expect,test } from '@playwright/test'

test.describe('/src/Marks/Superscript/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Marks/Superscript/React/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p>Example Text</p>')
    await page.keyboard.press('Control+a')
  })

  test('should transform inline style to sup tags', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p><span style="vertical-align: super">Example Text</span></p>')
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<p><sup>Example Text</sup></p>',
    )
  })

  test('sould omit inline style with a different vertical align', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p><span style="vertical-align: middle">Example Text</span></p>')
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe('<p>Example Text</p>')
  })

  test('the button should make the selected text bold', async ({ page }) => {
    await page.locator('button').first().click()

    await expect(page.locator('.tiptap sup')).toContainText('Example Text')
  })

  test('the button should toggle the selected text bold', async ({ page }) => {
    await page.locator('button').first().click()
    await page.keyboard.press('Control+a')
    await page.locator('button').first().click()
    await expect(page.locator('.tiptap sup')).toHaveCount(0)
  })
})
