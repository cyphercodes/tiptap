import { expect,test } from '@playwright/test'

test.describe('/src/Nodes/HorizontalRule/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Nodes/HorizontalRule/Vue/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<p>Example Text</p>')
    })
  })

  test('should parse horizontal rules correctly', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<p>Example Text</p><hr>')
    })
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<p>Example Text</p><hr>',
    )
  })

  test('should parse horizontal rules with self-closing tag correctly', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<p>Example Text</p><hr />')
    })
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<p>Example Text</p><hr>',
    )
  })

  test('the button should add a horizontal rule', async ({ page }) => {
    await expect(page.locator('.tiptap hr')).toHaveCount(0)

    await page.locator('button').first().click()

    await expect(page.locator('.tiptap hr')).toBeVisible()
  })

  test('the default markdown shortcut should add a horizontal rule', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })

    await expect(page.locator('.tiptap hr')).toHaveCount(0)

    await page.locator('.tiptap').pressSequentially('---')

    await expect(page.locator('.tiptap hr')).toBeVisible()
  })

  test('the alternative markdown shortcut should add a horizontal rule', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })

    await expect(page.locator('.tiptap hr')).toHaveCount(0)

    await page.locator('.tiptap').pressSequentially('___ ')

    await expect(page.locator('.tiptap hr')).toBeVisible()
  })

  test('should replace selection correctly', async ({ page }) => {
    await page.evaluate(() => {
      const editor = document.querySelector('.tiptap').editor
      editor.commands.setContent('<p>Example Text</p><p>Example Text</p>')

      // From the start of the document to the start of the second textblock.
      editor.commands.setTextSelection({ from: 0, to: 15 })
      editor.commands.setHorizontalRule()
    })

    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<hr><p>Example Text</p>',
    )

    await page.evaluate(() => {
      const editor = document.querySelector('.tiptap').editor
      editor.commands.setContent('<p>Example Text</p><p>Example Text</p>')

      // From the end of the first textblock to the start of the second textblock.
      editor.commands.setTextSelection({ from: 13, to: 15 })
      editor.commands.setHorizontalRule()
    })

    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<p>Example Text</p><hr><p>Example Text</p>',
    )
  })
})
