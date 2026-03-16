import { expect,test } from '@playwright/test'

test.describe('/src/Nodes/BulletList/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Nodes/BulletList/React/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<p>Example Text</p>')
    })
    await page.keyboard.press('Control+a')
  })

  test('should parse unordered lists correctly', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<ul><li><p>Example Text</p></li></ul>')
    })
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<ul><li><p>Example Text</p></li></ul>',
    )
  })

  test('should parse unordered lists without paragraphs correctly', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<ul><li>Example Text</li></ul>')
    })
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<ul><li><p>Example Text</p></li></ul>',
    )
  })

  test('the button should make the selected line a bullet list item', async ({ page }) => {
    await expect(page.locator('.tiptap ul')).toHaveCount(0)

    await expect(page.locator('.tiptap ul li')).toHaveCount(0)

    await page.locator('button:nth-child(1)').click()

    await expect(page.locator('.tiptap ul')).toContainText('Example Text')

    await expect(page.locator('.tiptap ul li')).toContainText('Example Text')
  })

  test('the button should toggle the bullet list', async ({ page }) => {
    await expect(page.locator('.tiptap ul')).toHaveCount(0)

    await page.locator('button:nth-child(1)').click()

    await expect(page.locator('.tiptap ul')).toContainText('Example Text')

    await page.locator('button:nth-child(1)').click()

    await expect(page.locator('.tiptap ul')).toHaveCount(0)
  })

  test('should leave the list with double enter', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })

    await page.locator('.tiptap').pressSequentially('- List Item 1')
    await page.keyboard.press('Enter')
    await page.keyboard.press('Enter')
    await page.locator('.tiptap').pressSequentially('Paragraph')

    await expect(page.locator('.tiptap li')).toHaveCount(1)

    await expect(page.locator('.tiptap p')).toContainText('Paragraph')
  })

  test('should make the paragraph a bullet list keyboard shortcut is pressed', async ({ page }) => {
    await page.keyboard.press('Control+Shift+8')
    await expect(page.locator('.tiptap ul li')).toContainText('Example Text')
  })

  test('should make a bullet list from an asterisk', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })

    await page.locator('.tiptap').pressSequentially('* List Item 1')
    await page.keyboard.press('Enter')
    await page.locator('.tiptap').pressSequentially('List Item 2')

    await expect(page.locator('.tiptap li:nth-child(1)')).toContainText('List Item 1')

    await expect(page.locator('.tiptap li:nth-child(2)')).toContainText('List Item 2')
  })

  test('should make a bullet list from a dash', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })

    await page.locator('.tiptap').pressSequentially('- List Item 1')
    await page.keyboard.press('Enter')
    await page.locator('.tiptap').pressSequentially('List Item 2')

    await expect(page.locator('.tiptap li:nth-child(1)')).toContainText('List Item 1')

    await expect(page.locator('.tiptap li:nth-child(2)')).toContainText('List Item 2')
  })

  test('should make a bullet list from a plus', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })

    await page.locator('.tiptap').pressSequentially('+ List Item 1')
    await page.keyboard.press('Enter')
    await page.locator('.tiptap').pressSequentially('List Item 2')

    await expect(page.locator('.tiptap li:nth-child(1)')).toContainText('List Item 1')

    await expect(page.locator('.tiptap li:nth-child(2)')).toContainText('List Item 2')
  })

  test('should remove the bullet list after pressing backspace', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })

    await page.locator('.tiptap').pressSequentially('* ')
    await page.keyboard.press('Backspace')
    await page.locator('.tiptap').pressSequentially('Example')

    await expect(page.locator('.tiptap p')).toContainText('* Example')
  })
})
