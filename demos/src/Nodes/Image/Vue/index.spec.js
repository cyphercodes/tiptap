import { expect,test } from '@playwright/test'

test.describe('/src/Nodes/Image/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Nodes/Image/Vue/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p>Example Text</p>')
    await page.keyboard.press('Control+a')
  })

  test('should add an img tag with the correct URL', async ({ page }) => {
    await page.evaluate(() => {
      window.prompt = () => 'foobar.png'
    })

    await page.locator('button').first().click()

    await expect(page.locator('.tiptap img')).toHaveAttribute('src', 'foobar.png')
  })
})
