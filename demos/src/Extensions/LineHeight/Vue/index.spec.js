import { expect,test } from '@playwright/test'

test.describe('/src/Extensions/LineHeight/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Extensions/LineHeight/Vue/')
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<p>Example Text</p>')
    })
    await page.keyboard.press('Control+a')
  })

  test('should set line-height 1.5 for the selected text', async ({ page }) => {
    await expect(page.locator('[data-test-id="1.5"]')).not.toHaveClass(/is-active/)
    await page.locator('[data-test-id="1.5"]').click()
    await expect(page.locator('[data-test-id="1.5"]')).toHaveClass(/is-active/)

    await expect(page.locator('.tiptap span')).toHaveAttribute('style', 'line-height: 1.5')
  })

  test('should set line-height 2.0 for the selected text', async ({ page }) => {
    await expect(page.locator('[data-test-id="2.0"]')).not.toHaveClass(/is-active/)
    await page.locator('[data-test-id="2.0"]').click()
    await expect(page.locator('[data-test-id="2.0"]')).toHaveClass(/is-active/)

    await expect(page.locator('.tiptap span')).toHaveAttribute('style', 'line-height: 2.0')
  })

  test('should set line-height 4.0 for the selected text', async ({ page }) => {
    await expect(page.locator('[data-test-id="4.0"]')).not.toHaveClass(/is-active/)
    await page.locator('[data-test-id="4.0"]').click()
    await expect(page.locator('[data-test-id="4.0"]')).toHaveClass(/is-active/)

    await expect(page.locator('.tiptap span')).toHaveAttribute('style', 'line-height: 4.0')
  })

  test('should remove the line-height of the selected text', async ({ page }) => {
    await page.locator('[data-test-id="1.5"]').click()
    await expect(page.locator('.tiptap span')).toHaveAttribute('style', 'line-height: 1.5')

    await page.locator('[data-test-id="unsetLineHeight"]').click()
    await expect(page.locator('.tiptap span')).toHaveCount(0)
  })
})
