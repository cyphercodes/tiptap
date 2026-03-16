import { expect,test } from '@playwright/test'

test.describe('/src/Examples/CustomDocument/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Examples/CustomDocument/React/')
  })

  test('should have a working tiptap instance', async ({ page }) => {
    const editor = await page.evaluate(() => document.querySelector('.tiptap').editor)
    expect(editor).not.toBeNull()
  })

  test('should have a headline and a paragraph', async ({ page }) => {
    await expect(page.locator('.tiptap h1')).toBeVisible()
    await expect(page.locator('.tiptap h1')).toHaveText('It\u2019ll always have a heading \u2026')
    await expect(page.locator('.tiptap p')).toBeVisible()
    await expect(page.locator('.tiptap p')).toHaveText(
      '\u2026 if you pass a custom document. That\u2019s the beauty of having full control over the schema.',
    )
  })

  test('should have a tooltip for a paragraph on a new line', async ({ page }) => {
    await page.locator('.tiptap').click()
    await page.keyboard.press('Enter')
    await expect(page.locator('.tiptap p[data-placeholder]')).toBeVisible()
    await expect(page.locator('.tiptap p[data-placeholder]')).toHaveAttribute(
      'data-placeholder',
      'Can you add some further context?',
    )
  })

  test('should have a headline after clearing the document', async ({ page }) => {
    await page.locator('.tiptap').click()
    await page.keyboard.press('Control+a')
    await page.keyboard.press('Backspace')
    await page.locator('.tiptap').focus()
    await expect(page.locator('.tiptap h1[data-placeholder]')).toBeVisible()
    await expect(page.locator('.tiptap h1[data-placeholder]')).toHaveAttribute('class', 'is-empty is-editor-empty')
    await expect(page.locator('.tiptap h1[data-placeholder]')).toHaveAttribute(
      'data-placeholder',
      'What\u2019s the title?',
    )
  })

  test('should have a headline after clearing the document & enter paragraph automatically after adding a headline', async ({
    page,
  }) => {
    await page.locator('.tiptap').click()
    await page.keyboard.press('Control+a')
    await page.keyboard.press('Backspace')
    await page.locator('.tiptap').pressSequentially('Hello world')
    await page.keyboard.press('Enter')
    await expect(page.locator('.tiptap h1')).toBeVisible()
    await expect(page.locator('.tiptap h1')).toHaveText('Hello world')
    await expect(page.locator('.tiptap p[data-placeholder]')).toBeVisible()
    await expect(page.locator('.tiptap p[data-placeholder]')).toHaveAttribute(
      'data-placeholder',
      'Can you add some further context?',
    )

    await page.locator('.tiptap').pressSequentially('This is a paragraph for this test document')
    await expect(page.locator('.tiptap p')).toBeVisible()
    await expect(page.locator('.tiptap p')).toHaveText('This is a paragraph for this test document')
  })
})
