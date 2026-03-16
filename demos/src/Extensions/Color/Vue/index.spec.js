import { expect,test } from '@playwright/test'

test.describe('/src/Extensions/Color/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Extensions/Color/Vue/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<p>Example Text</p>')
    })
    await page.keyboard.press('Control+a')
  })

  test('should set the color of the selected text', async ({ page }) => {
    await expect(page.locator('button').first()).not.toHaveClass(/is-active/)
    await page.locator('button').first().click()
    await expect(page.locator('button').first()).toHaveClass(/is-active/)

    await expect(page.locator('.tiptap span')).toHaveAttribute('style', 'color: #958DF1')
  })

  test('should remove the color of the selected text', async ({ page }) => {
    await page.locator('button').first().click()

    await expect(page.locator('.tiptap span')).toBeVisible()

    await page.locator('button').last().click()

    await expect(page.locator('.tiptap span')).toHaveCount(0)
  })

  test('should change text color with color picker', async ({ page }) => {
    await page.locator('input[type=color]').evaluate(el => {
      el.value = '#ff0000'
      el.dispatchEvent(new Event('input', { bubbles: true }))
    })

    await expect(page.locator('.tiptap span')).toHaveAttribute('style', 'color: #ff0000')
  })

  test('should match text and color picker color values', async ({ page }) => {
    await page.locator('button').first().click()

    await expect(page.locator('input[type=color]')).toHaveValue('#958df1')
  })
})
