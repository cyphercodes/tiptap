import { expect,test } from '@playwright/test'

test.describe('/src/Examples/CustomParagraph/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Examples/CustomParagraph/React/')
  })

  test('should have a working tiptap instance', async ({ page }) => {
    const editor = await page.evaluate(() => document.querySelector('.tiptap').editor)
    expect(editor).not.toBeNull()
  })

  test('should have a paragraph and text length', async ({ page }) => {
    await expect(page.locator('.tiptap p')).toBeVisible()
    await expect(page.locator('.tiptap p')).toHaveText('Each line shows the number of characters in the paragraph.')
    await expect(page.locator('.tiptap .label')).toBeVisible()
    await expect(page.locator('.tiptap .label')).toHaveText('58')
  })

  test('should have new paragraph', async ({ page }) => {
    await page.locator('.tiptap').click()
    await page.keyboard.press('Control+a')
    await page.keyboard.press('End')
    await page.keyboard.press('Enter')
    await expect(page.locator('.tiptap p').nth(1)).toBeVisible()
    await expect(page.locator('.tiptap p').nth(1)).toHaveText('')
    await expect(page.locator('.tiptap .label').nth(1)).toBeVisible()
    await expect(page.locator('.tiptap .label').nth(1)).toHaveText('0')
  })
})
