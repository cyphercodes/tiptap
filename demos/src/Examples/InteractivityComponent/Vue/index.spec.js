import { expect,test } from '@playwright/test'

test.describe('/src/Examples/InteractivityComponent/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Examples/InteractivityComponent/Vue/')
  })

  test('should have a working tiptap instance', async ({ page }) => {
    const editor = await page.evaluate(() => document.querySelector('.tiptap').editor)
    expect(editor).not.toBeNull()
  })

  test('should render a custom node', async ({ page }) => {
    await expect(page.locator('.tiptap .vue-component')).toHaveCount(1)
  })

  test('should handle count click inside custom node', async ({ page }) => {
    const button = page.locator('.tiptap .vue-component button')
    await expect(button).toHaveText('This button has been clicked 0 times.')
    await button.click()
    await expect(button).toHaveText('This button has been clicked 1 times.')
    await button.click()
    await expect(button).toHaveText('This button has been clicked 2 times.')
    await button.click()
    await expect(button).toHaveText('This button has been clicked 3 times.')
  })
})
