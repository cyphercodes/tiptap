import { expect,test } from '@playwright/test'

test.describe('/src/Examples/Transition/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Examples/Transition/Vue/')
  })

  test('should have two buttons and no active tiptap instance', async ({ page }) => {
    await expect(page.locator('.tiptap')).toHaveCount(0)

    await expect(page.locator('#toggle-direct-editor')).toBeVisible()
    await expect(page.locator('#toggle-nested-editor')).toBeVisible()
  })

  test('clicking the buttons should show two editors', async ({ page }) => {
    await page.locator('#toggle-direct-editor').click()
    await page.locator('#toggle-nested-editor').click()

    await expect(page.locator('.tiptap')).toBeVisible()
  })

  test('clicking the buttons again should hide the editors', async ({ page }) => {
    await page.locator('#toggle-direct-editor').click()
    await page.locator('#toggle-nested-editor').click()

    await expect(page.locator('.tiptap')).toBeVisible()

    await page.locator('#toggle-direct-editor').click()
    await page.locator('#toggle-nested-editor').click()

    await expect(page.locator('.tiptap')).toHaveCount(0)
  })
})
