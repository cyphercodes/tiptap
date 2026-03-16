import { expect,test } from '@playwright/test'

test.describe('/src/GuideContent/ReadOnly/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/GuideContent/ReadOnly/Vue/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })
  })

  test('should be read-only', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.setEditable(false)
    })
    await page.locator('.tiptap').pressSequentially('Edited: ')

    await expect(page.locator('.tiptap p').first()).not.toContainText('Edited: ')
  })

  test('should be editable', async ({ page }) => {
    await page.locator('#editable').click()
    await page.locator('.tiptap').pressSequentially('Edited: ')

    await expect(page.locator('.tiptap p').first()).toContainText('Edited: ')
  })
})
