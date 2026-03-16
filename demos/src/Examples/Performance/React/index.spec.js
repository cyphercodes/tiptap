import { expect,test } from '@playwright/test'

test.describe('/src/Examples/Performance/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Examples/Performance/React/')
  })

  test('should have a working tiptap instance', async ({ page }) => {
    const editor = await page.evaluate(() => document.querySelector('.tiptap').editor)
    expect(editor).not.toBeNull()
  })
})
