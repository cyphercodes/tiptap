import { expect,test } from '@playwright/test'

test.describe('/src/Examples/InteractivityComponentProvideInject/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Examples/InteractivityComponentProvideInject/Vue/')
  })

  test('should have a working tiptap instance', async ({ page }) => {
    const editor = await page.evaluate(() => document.querySelector('.tiptap').editor)
    expect(editor).not.toBeNull()
  })

  test('should render a custom node', async ({ page }) => {
    await expect(page.locator('.tiptap .vue-component')).toHaveCount(1)
  })

  test('should have global and all injected values', async ({ page }) => {
    const expectedTexts = ['globalValue', 'appValue', 'indexValue', 'editorValue']

    const paragraphs = page.locator('.tiptap .vue-component p')
    for (let index = 0; index < expectedTexts.length; index++) {
      await expect(paragraphs.nth(index)).toHaveText(expectedTexts[index])
    }
  })
})
