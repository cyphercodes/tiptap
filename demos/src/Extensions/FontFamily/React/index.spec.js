import { expect,test } from '@playwright/test'

test.describe('/src/Extensions/FontFamily/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Extensions/FontFamily/React/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<p>Example Text</p>')
    })
    await page.keyboard.press('Control+a')
  })

  test('should set the font-family of the selected text', async ({ page }) => {
    await expect(page.locator('[data-test-id="monospace"]')).not.toHaveClass(/is-active/)
    await page.locator('[data-test-id="monospace"]').click()
    await expect(page.locator('[data-test-id="monospace"]')).toHaveClass(/is-active/)

    await expect(page.locator('.tiptap span')).toHaveAttribute('style', 'font-family: monospace')
  })

  test('should remove the font-family of the selected text', async ({ page }) => {
    await page.locator('[data-test-id="monospace"]').click()

    await expect(page.locator('.tiptap span')).toBeVisible()

    await page.locator('[data-test-id="unsetFontFamily"]').click()

    await expect(page.locator('.tiptap span')).toHaveCount(0)
  })

  test('should allow CSS variables as a font-family', async ({ page }) => {
    await expect(page.locator('[data-test-id="css-variable"]')).not.toHaveClass(/is-active/)
    await page.locator('[data-test-id="css-variable"]').click()
    await expect(page.locator('[data-test-id="css-variable"]')).toHaveClass(/is-active/)

    await expect(page.locator('.tiptap span')).toHaveAttribute('style', 'font-family: var(--title-font-family)')
  })

  test('should allow fonts containing multiple font families', async ({ page }) => {
    await expect(page.locator('[data-test-id="comic-sans"]')).not.toHaveClass(/is-active/)
    await page.locator('[data-test-id="comic-sans"]').click()
    await expect(page.locator('[data-test-id="comic-sans"]')).toHaveClass(/is-active/)

    await expect(page.locator('.tiptap span')).toHaveAttribute('style', 'font-family: "Comic Sans MS", "Comic Sans"')
  })

  test('should allow fonts containing a space and number as a font-family', async ({ page }) => {
    await expect(page.locator('[data-test-id="exo2"]')).not.toHaveClass(/is-active/)
    await page.locator('[data-test-id="exo2"]').click()
    await expect(page.locator('[data-test-id="exo2"]')).toHaveClass(/is-active/)

    await expect(page.locator('.tiptap span')).toHaveAttribute('style', 'font-family: "Exo 2"')
  })
})
