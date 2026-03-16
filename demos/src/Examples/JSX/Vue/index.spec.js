import { expect,test } from '@playwright/test'

test.describe('/src/Examples/JSX/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Examples/JSX/Vue/')
  })

  test('should have a working tiptap instance', async ({ page }) => {
    const editor = await page.evaluate(() => document.querySelector('.tiptap').editor)
    expect(editor).not.toBeNull()
  })

  test('should have paragraphs colored as red', async ({ page }) => {
    await expect(page.locator('.tiptap p')).toHaveCSS('color', 'rgb(255, 0, 0)')
  })
})
