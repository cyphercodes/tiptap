import { expect,test } from '@playwright/test'

test.describe('/src/Nodes/Heading/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Nodes/Heading/Vue/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<p>Example Text</p>')
    })
    await page.keyboard.press('Control+a')
  })

  const headings = ['<h1>Example Text</h1>', '<h2>Example Text</h2>', '<h3>Example Text</h3>']

  headings.forEach(html => {
    test(`should parse headings correctly (${html})`, async ({ page }) => {
      await page.evaluate(val => {
        document.querySelector('.tiptap').editor.commands.setContent(val)
      }, html)
      expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(html)
    })
  })

  test('should omit disabled heading levels', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<h4>Example Text</h4>')
    })
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe('<p>Example Text</p>')
  })

  test('the button should make the selected line a h1', async ({ page }) => {
    await expect(page.locator('.tiptap h1')).toHaveCount(0)

    await page.locator('button:nth-child(1)').click()

    await expect(page.locator('.tiptap h1')).toContainText('Example Text')
  })

  test('the button should make the selected line a h2', async ({ page }) => {
    await expect(page.locator('.tiptap h2')).toHaveCount(0)

    await page.locator('button:nth-child(2)').click()

    await expect(page.locator('.tiptap h2')).toContainText('Example Text')
  })

  test('the button should make the selected line a h3', async ({ page }) => {
    await expect(page.locator('.tiptap h3')).toHaveCount(0)

    await page.locator('button:nth-child(3)').click()

    await expect(page.locator('.tiptap h3')).toContainText('Example Text')
  })

  test('the button should toggle the heading', async ({ page }) => {
    await expect(page.locator('.tiptap h1')).toHaveCount(0)

    await page.locator('button:nth-child(1)').click()

    await expect(page.locator('.tiptap h1')).toContainText('Example Text')

    await page.locator('button:nth-child(1)').click()

    await expect(page.locator('.tiptap h1')).toHaveCount(0)
  })

  test('should make the paragraph a h1 keyboard shortcut is pressed', async ({ page }) => {
    await page.keyboard.press('Control+Alt+1')
    await expect(page.locator('.tiptap h1')).toContainText('Example Text')
  })

  test('should make the paragraph a h2 keyboard shortcut is pressed', async ({ page }) => {
    await page.keyboard.press('Control+Alt+2')
    await expect(page.locator('.tiptap h2')).toContainText('Example Text')
  })

  test('should make the paragraph a h3 keyboard shortcut is pressed', async ({ page }) => {
    await page.keyboard.press('Control+Alt+3')
    await expect(page.locator('.tiptap h3')).toContainText('Example Text')
  })

  test('should make a h1 from the default markdown shortcut', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })

    await page.locator('.tiptap').pressSequentially('# Headline')
    await expect(page.locator('.tiptap h1')).toContainText('Headline')
  })

  test('should make a h2 from the default markdown shortcut', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })

    await page.locator('.tiptap').pressSequentially('## Headline')
    await expect(page.locator('.tiptap h2')).toContainText('Headline')
  })

  test('should make a h3 from the default markdown shortcut', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })

    await page.locator('.tiptap').pressSequentially('### Headline')
    await expect(page.locator('.tiptap h3')).toContainText('Headline')
  })
})
