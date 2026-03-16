import { expect,test } from '@playwright/test'

test.describe('/src/Examples/CodeBlockLanguage/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Examples/CodeBlockLanguage/React/')
  })

  test('should have hljs classes for syntax highlighting', async ({ page }) => {
    const count = await page.locator('[class^=hljs]').count()
    expect(count).toBeGreaterThan(0)
  })

  test('should have different count of hljs classes after switching language', async ({ page }) => {
    const initialCount = await page.locator('[class^=hljs]').count()
    expect(initialCount).toBeGreaterThan(0)

    await page.waitForTimeout(100)
    await page.locator('.tiptap select').selectOption('java')
    await page.waitForTimeout(500)

    const newCount = await page.locator('[class^=hljs]').count()
    expect(newCount).not.toBe(initialCount)
  })
})
