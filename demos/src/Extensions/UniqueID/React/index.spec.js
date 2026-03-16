import { expect,test } from '@playwright/test'

test.describe('/src/Extensions/UniqueID/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Extensions/UniqueID/React/')
  })

  test('has a heading with an unique ID', async ({ page }) => {
    await expect(page.locator('.ProseMirror h1')).toHaveAttribute('data-id')
  })

  test('has a paragraph with an unique ID', async ({ page }) => {
    await expect(page.locator('.ProseMirror p').first()).toHaveAttribute('data-id')
  })
})
