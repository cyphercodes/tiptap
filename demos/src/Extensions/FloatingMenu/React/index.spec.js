import { expect,test } from '@playwright/test'

test.describe('/src/Extensions/FloatingMenu/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Extensions/FloatingMenu/React/')
  })

  test('should not render a floating menu on non-empty nodes', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.chain().setContent('<p>Example Text</p>').focus().run()
    })

    await expect(page.locator('[data-testID="floating-menu"]')).toHaveCount(0)
  })

  test('should render a floating menu on empty nodes', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.chain().setContent('<p></p>').focus().run()
    })

    await expect(page.locator('[data-testID="floating-menu"]')).toBeVisible()
  })
})
