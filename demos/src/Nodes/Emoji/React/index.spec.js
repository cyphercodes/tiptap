import { expect,test } from '@playwright/test'

test.describe('/src/Nodes/Emoji/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Nodes/Emoji/React/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<p></p>')
    })
    await page.locator('.tiptap').click()
  })

  test('insert :smile: via typing', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially(':smile:')
    // after typing the shortcode the emoji should be rendered as a node
    await expect(page.locator('.tiptap [data-type="emoji"][data-name="smile"]')).toBeVisible()
  })

  test('insert button inserts an emoji node', async ({ page }) => {
    await page.locator('button', { hasText: 'Insert ⚡' }).click()
    await expect(page.locator('.tiptap [data-type="emoji"][data-name="zap"]')).toBeVisible()
  })

  test('pasting a URL containing :x: does not convert the shortcode', async ({ page }) => {
    const url = 'https://example-url.com/:x:/sub'
    await page.evaluate(val => {
      const clipboardData = new DataTransfer()
      clipboardData.setData('text/plain', val)
      const pasteEvent = new ClipboardEvent('paste', { clipboardData, bubbles: true, cancelable: true })
      document.querySelector('.tiptap').dispatchEvent(pasteEvent)
    }, url)

    await expect(page.locator('.tiptap')).toContainText(url)
    await expect(page.locator('.tiptap [data-type="emoji"]')).toHaveCount(0)
  })

  test('pasting a standalone shortcode converts to an emoji node', async ({ page }) => {
    await page.evaluate(() => {
      const clipboardData = new DataTransfer()
      clipboardData.setData('text/plain', ':smile:')
      const pasteEvent = new ClipboardEvent('paste', { clipboardData, bubbles: true, cancelable: true })
      document.querySelector('.tiptap').dispatchEvent(pasteEvent)
    })
    await expect(page.locator('.tiptap [data-type="emoji"]')).toBeVisible()
  })
})
