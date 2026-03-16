import { expect,test } from '@playwright/test'

test.describe('/src/Extensions/FontSize/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Extensions/FontSize/React/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<p>Example Text</p>')
    })
    await page.keyboard.press('Control+a')
  })

  test('should set the font-size of the selected text', async ({ page }) => {
    await expect(page.locator('[data-test-id="28px"]')).not.toHaveClass(/is-active/)
    await page.locator('[data-test-id="28px"]').click()
    await expect(page.locator('[data-test-id="28px"]')).toHaveClass(/is-active/)

    await expect(page.locator('.tiptap span')).toHaveAttribute('style', 'font-size: 28px')
  })

  test('should remove the font-size of the selected text', async ({ page }) => {
    await page.locator('[data-test-id="28px"]').click()
    await expect(page.locator('.tiptap span')).toHaveAttribute('style', 'font-size: 28px')
    await page.locator('[data-test-id="unsetFontSize"]').click()
    await expect(page.locator('span')).toHaveCount(0)
  })
})
