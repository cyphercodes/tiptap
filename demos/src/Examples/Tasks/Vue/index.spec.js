import { expect,test } from '@playwright/test'

test.describe('/src/Examples/Tasks/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Examples/Tasks/Vue/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })
  })

  test('should always use task items', async ({ page }) => {
    await expect(page.locator('.tiptap input[type="checkbox"]')).toHaveCount(1)
  })

  test('should create new tasks', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('Cook food')
    await page.keyboard.press('Enter')
    await page.locator('.tiptap').pressSequentially('Eat food')
    await page.keyboard.press('Enter')
    await page.locator('.tiptap').pressSequentially('Clean dishes')
    await expect(page.locator('.tiptap input[type="checkbox"]')).toHaveCount(3)
  })

  test('should check and uncheck tasks on click', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('Cook food')
    await page.keyboard.press('Enter')
    await page.locator('.tiptap').pressSequentially('Eat food')
    await page.keyboard.press('Enter')
    await page.locator('.tiptap').pressSequentially('Clean dishes')
    await page.locator('.tiptap input[type="checkbox"]').nth(0).click({ force: true })
    await expect(page.locator('.tiptap input[type="checkbox"]:checked')).toHaveCount(1)
    await page.locator('.tiptap input[type="checkbox"]').nth(1).click({ force: true })
    await expect(page.locator('.tiptap input[type="checkbox"]:checked')).toHaveCount(2)
    await page.locator('.tiptap input[type="checkbox"]').nth(0).click({ force: true })
    await expect(page.locator('.tiptap input[type="checkbox"]:checked')).toHaveCount(1)
    await page.locator('.tiptap input[type="checkbox"]').nth(1).click({ force: true })
    await expect(page.locator('.tiptap input[type="checkbox"]:checked')).toHaveCount(0)
  })
})
