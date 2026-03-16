import { expect,test } from '@playwright/test'

test.describe('/src/Examples/Images/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Examples/Images/Vue/')
  })

  // TODO: Write tests
  test('finds image elements inside editor', async ({ page }) => {
    await expect(page.locator('.tiptap img')).toHaveCount(2)
  })

  test('allows removing images', async ({ page }) => {
    await expect(page.locator('.tiptap')).toBeVisible()
    await expect(page.locator('.tiptap img')).toHaveCount(2)
    await page.locator('.tiptap img').first().click()
    await expect(page.locator('.tiptap img.ProseMirror-selectednode')).toBeVisible()
    await page.keyboard.press('Backspace')
    await expect(page.locator('.tiptap img')).toHaveCount(1)
  })

  test('allows images to be added via URL', async ({ page }) => {
    await page.evaluate(() => {
      window.prompt = () => 'https://placehold.co/400x400'
    })

    await page.waitForTimeout(1000)
    await page.locator('button', { hasText: 'Add image from URL' }).click()
    await page.waitForTimeout(1000)
    await expect(page.locator('.tiptap img')).toHaveCount(3)
  })
})
