import { expect,test } from '@playwright/test'

test.describe('/src/Nodes/OrderedList/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Nodes/OrderedList/Vue/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p>Example Text</p>')
    await page.keyboard.press('Control+a')
  })

  test('should parse ordered lists correctly', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<ol><li><p>Example Text</p></li></ol>')
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<ol><li><p>Example Text</p></li></ol>',
    )
  })

  test('should parse ordered lists without paragraphs correctly', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<ol><li>Example Text</li></ol>')
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<ol><li><p>Example Text</p></li></ol>',
    )
  })

  test('the button should make the selected line a ordered list item', async ({ page }) => {
    await expect(page.locator('.tiptap ol')).toHaveCount(0)

    await expect(page.locator('.tiptap ol li')).toHaveCount(0)

    await page.locator('button:nth-child(1)').click()

    await expect(page.locator('.tiptap ol')).toContainText('Example Text')

    await expect(page.locator('.tiptap ol li')).toContainText('Example Text')
  })

  test('the button should toggle the ordered list', async ({ page }) => {
    await expect(page.locator('.tiptap ol')).toHaveCount(0)

    await page.locator('button:nth-child(1)').click()

    await expect(page.locator('.tiptap ol')).toContainText('Example Text')

    await page.locator('button:nth-child(1)').click()

    await expect(page.locator('.tiptap ol')).toHaveCount(0)
  })

  test('should make the paragraph an ordered list keyboard shortcut is pressed', async ({ page }) => {
    await page.keyboard.press('Control+Shift+7')
    await expect(page.locator('.tiptap ol li')).toContainText('Example Text')
  })

  test('should leave the list with double enter', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })

    await page.locator('.tiptap').pressSequentially('1. List Item 1')
    await page.keyboard.press('Enter')
    await page.keyboard.press('Enter')
    await page.locator('.tiptap').pressSequentially('Paragraph')

    await expect(page.locator('.tiptap li')).toHaveCount(1)

    await expect(page.locator('.tiptap p')).toContainText('Paragraph')
  })

  test('should make a ordered list from a number', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })

    await page.locator('.tiptap').pressSequentially('1. List Item 1')
    await page.keyboard.press('Enter')
    await page.locator('.tiptap').pressSequentially('List Item 2')

    await expect(page.locator('.tiptap li:nth-child(1)')).toContainText('List Item 1')

    await expect(page.locator('.tiptap li:nth-child(2)')).toContainText('List Item 2')
  })

  test('should make a ordered list from a number other than number one', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })

    await page.locator('.tiptap').pressSequentially('2. List Item 1')
    await page.keyboard.press('Enter')
    await page.locator('.tiptap').pressSequentially('List Item 2')

    await expect(page.locator('.tiptap li:nth-child(1)')).toContainText('List Item 1')
    await expect(page.locator('.tiptap li:nth-child(2)')).toContainText('List Item 2')
  })

  test('should remove the ordered list after pressing backspace', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })

    await page.locator('.tiptap').pressSequentially('1. ')
    await page.keyboard.press('Backspace')
    await page.locator('.tiptap').pressSequentially('Example')

    await expect(page.locator('.tiptap p')).toContainText('1. Example')
  })
})
