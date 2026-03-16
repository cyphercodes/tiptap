import { expect,test } from '@playwright/test'

test.describe('/src/Extensions/BackgroundColor/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Extensions/BackgroundColor/Vue/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<p>Example Text</p>')
    })
    await page.keyboard.press('Control+a')
  })

  test('should set the background color of the selected text', async ({ page }) => {
    await expect(page.locator('[data-testid="setPurple"]')).not.toHaveClass(/is-active/)
    await page.locator('[data-testid="setPurple"]').click()
    await expect(page.locator('[data-testid="setPurple"]')).toHaveClass(/is-active/)

    await expect(page.locator('.tiptap span')).toHaveAttribute('style', 'background-color: #958DF1')
  })

  test('should remove the background color of the selected text', async ({ page }) => {
    await page.locator('[data-testid="setPurple"]').click()

    await expect(page.locator('.tiptap span')).toBeVisible()

    await page.locator('[data-testid="unsetBackgroundColor"]').click()

    await expect(page.locator('.tiptap span')).toHaveCount(0)
  })

  test('should change background color with color picker', async ({ page }) => {
    await page.locator('input[type=color]').evaluate(el => {
      el.value = '#ff0000'
      el.dispatchEvent(new Event('input', { bubbles: true }))
    })

    await expect(page.locator('.tiptap span')).toHaveAttribute('style', 'background-color: #ff0000')
  })

  test('should match background color and color picker color values', async ({ page }) => {
    await page.locator('[data-testid="setPurple"]').click()

    await expect(page.locator('input[type=color]')).toHaveValue('#958df1')
  })

  test('should preserve background color on new lines', async ({ page }) => {
    await page.locator('[data-testid="setPurple"]').click()
    await page.locator('.ProseMirror').pressSequentially('Example Text')
    await page.keyboard.press('Enter')

    await expect(page.locator('[data-testid="setPurple"]')).toHaveClass(/is-active/)
  })

  test('should unset background color on new lines after unset clicked', async ({ page }) => {
    await page.locator('[data-testid="setPurple"]').click()
    await page.locator('.ProseMirror').pressSequentially('Example Text')
    await page.keyboard.press('Enter')
    await page.locator('[data-testid="unsetBackgroundColor"]').click()
    await page.locator('.ProseMirror').pressSequentially('Example Text')

    await expect(page.locator('[data-testid="setPurple"]')).not.toHaveClass(/is-active/)
  })
})
