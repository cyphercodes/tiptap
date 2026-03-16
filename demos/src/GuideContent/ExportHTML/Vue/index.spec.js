import { expect,test } from '@playwright/test'

test.describe('/src/GuideContent/ExportHTML/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/GuideContent/ExportHTML/Vue/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p>Example Text</p>')
  })

  test('should return html', async ({ page }) => {
    const html = await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())

    expect(html).toBe('<p>Example Text</p>')
  })
})
