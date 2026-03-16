import { expect,test } from '@playwright/test'

test.describe('/src/Examples/InteractivityComponentContent/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Examples/InteractivityComponentContent/Vue/')
  })

  test('should have a working tiptap instance', async ({ page }) => {
    const editor = await page.evaluate(() => document.querySelector('.tiptap').editor)
    expect(editor).not.toBeNull()
  })

  test('should render a custom node', async ({ page }) => {
    await expect(page.locator('.tiptap .vue-component')).toHaveCount(1)
  })

  test('should allow text editing inside component', async ({ page }) => {
    const content = page.locator('.tiptap .vue-component .content')
    await content.evaluate(el => {
      el.setAttribute('contentEditable', 'true')
      el.textContent = ''
    })
    await content.pressSequentially('Hello World!')
    await expect(content).toHaveText('Hello World!')
  })

  test('should allow text editing inside component with markdown text', async ({ page }) => {
    const content = page.locator('.tiptap .vue-component .content')
    await content.evaluate(el => {
      el.setAttribute('contentEditable', 'true')
      el.textContent = ''
    })
    await content.pressSequentially('Hello World! This is **bold**.')
    await expect(content).toHaveText('Hello World! This is bold.')

    await expect(page.locator('.tiptap .vue-component .content strong')).toBeVisible()
  })

  test('should remove node via selectall', async ({ page }) => {
    await expect(page.locator('.tiptap .vue-component')).toHaveCount(1)

    await page.locator('.tiptap').click()
    await page.keyboard.press('Control+a')
    await page.keyboard.press('Backspace')

    await expect(page.locator('.tiptap .vue-component')).toHaveCount(0)
  })
})
