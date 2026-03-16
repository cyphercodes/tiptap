import { expect,test } from '@playwright/test'

test.describe('/src/GuideMarkViews/VueComponent/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/GuideMarkViews/VueComponent/Vue/')
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p>Example Text</p><vue-component>Mark View Text</vue-component>')
    await page.keyboard.press('Control+a')
  })

  test('should show the markview', async ({ page }) => {
    await expect(page.locator('.tiptap [data-test-id="mark-view"]')).toBeVisible()
  })

  test('should allow clicking the button', async ({ page }) => {
    await expect(page.locator('.tiptap [data-test-id="count-button"]')).toContainText(
      'This button has been clicked 0 times.',
    )
    await page.locator('.tiptap [data-test-id="count-button"]').click()
    await expect(page.locator('.tiptap [data-test-id="count-button"]')).toContainText(
      'This button has been clicked 1 times.',
    )
  })

  test('should update the attributes of the mark on button click', async ({ page }) => {
    await expect(page.locator('.tiptap [data-test-id="mark-view"]')).toHaveAttribute('data-count', '0')

    // click on the button
    await page.locator('.tiptap [data-test-id="update-attributes-button"]').click()
    await expect(page.locator('.tiptap [data-test-id="mark-view"]')).toHaveAttribute('data-count', '1')
  })
})
