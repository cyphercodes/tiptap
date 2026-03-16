import { expect,test } from '@playwright/test'

test.describe('/src/Examples/MarkdownShortcuts/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Examples/MarkdownShortcuts/React/')
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })
  })

  test('should make a h1', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('# Headline')
    await expect(page.locator('.tiptap h1')).toContainText('Headline')
  })

  test('should make a h2', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('## Headline')
    await expect(page.locator('.tiptap h2')).toContainText('Headline')
  })

  test('should make a h3', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('### Headline')
    await expect(page.locator('.tiptap h3')).toContainText('Headline')
  })

  test('should make a h4', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('#### Headline')
    await expect(page.locator('.tiptap h4')).toContainText('Headline')
  })

  test('should make a h5', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('##### Headline')
    await expect(page.locator('.tiptap h5')).toContainText('Headline')
  })

  test('should make a h6', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('###### Headline')
    await expect(page.locator('.tiptap h6')).toContainText('Headline')
  })

  test('should create inline code', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('`$foobar`')
    await expect(page.locator('.tiptap code')).toContainText('$foobar')
  })

  test('should create a code block without language', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('``` ')
    await page.keyboard.press('Enter')
    await page.locator('.tiptap').pressSequentially('const foo = bar')
    await page.keyboard.press('Enter')
    await page.locator('.tiptap').pressSequentially('```')
    await expect(page.locator('.tiptap pre')).toContainText('const foo = bar')
  })

  test('should create a bullet list from asteriks', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('* foobar')
    await expect(page.locator('.tiptap ul')).toContainText('foobar')
  })

  test('should create a bullet list from dashes', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('- foobar')
    await expect(page.locator('.tiptap ul')).toContainText('foobar')
  })

  test('should create a bullet list from pluses', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('+ foobar')
    await expect(page.locator('.tiptap ul')).toContainText('foobar')
  })

  test('should create a ordered list', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('1. foobar')
    await expect(page.locator('.tiptap ol')).toContainText('foobar')
  })

  test('should create a blockquote', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('> foobar')
    await expect(page.locator('.tiptap blockquote')).toContainText('foobar')
  })
})
