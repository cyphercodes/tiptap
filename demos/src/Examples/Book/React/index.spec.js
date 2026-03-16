import { expect,test } from '@playwright/test'

test.describe('/src/Examples/Book/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Examples/Book/React/')
  })

  test('should have a working tiptap instance', async ({ page }) => {
    const editor = await page.evaluate(() => document.querySelector('.tiptap').editor)
    expect(editor).not.toBeNull()
  })
})
