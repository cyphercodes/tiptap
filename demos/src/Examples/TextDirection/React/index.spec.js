import { expect,test } from '@playwright/test'

test.describe('/src/Examples/TextDirection/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Examples/TextDirection/React/')
  })

  test('should apply text direction attributes', async ({ page }) => {
    await expect(page.locator('.tiptap p').first()).toHaveAttribute('dir', 'auto')
  })

  test('should change global direction', async ({ page }) => {
    await page.locator('button', { hasText: 'RTL' }).click()
    await expect(page.locator('.tiptap p').first()).toHaveAttribute('dir', 'rtl')
  })

  test('should set direction on selection', async ({ page }) => {
    await page.locator('.tiptap p').first().click()
    await page.locator('button', { hasText: 'Set LTR' }).click()
    await expect(page.locator('.tiptap p').first()).toHaveAttribute('dir', 'ltr')
  })

  test('should unset direction', async ({ page }) => {
    await page.locator('button', { hasText: 'None' }).click()
    await expect(page.locator('.tiptap p').first()).not.toHaveAttribute('dir')
  })
})
