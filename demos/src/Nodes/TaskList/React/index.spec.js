import { expect,test } from '@playwright/test'

test.describe('/src/Nodes/TaskList/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Nodes/TaskList/React/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p>Example Text</p>')
    await page.keyboard.press('Control+a')
  })

  test('should parse unordered lists correctly', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<ul data-type="taskList"><li data-checked="true" data-type="taskItem"><p>Example Text</p></li></ul>')
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<ul data-type="taskList"><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p>Example Text</p></div></li></ul>',
    )
  })

  test('should parse unordered lists without paragraphs correctly', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<ul data-type="taskList"><li data-checked="false" data-type="taskItem">Example Text</li></ul>')
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<ul data-type="taskList"><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Example Text</p></div></li></ul>',
    )
  })

  test('the button should make the selected line a task list item', async ({ page }) => {
    await expect(page.locator('.tiptap ul')).toHaveCount(0)

    await expect(page.locator('.tiptap ul li')).toHaveCount(0)

    await page.locator('button:nth-child(1)').click()

    await expect(page.locator('.tiptap ul[data-type="taskList"]')).toContainText('Example Text')

    await expect(page.locator('.tiptap ul[data-type="taskList"] li')).toContainText('Example Text')
  })

  test('the button should toggle the task list', async ({ page }) => {
    await expect(page.locator('.tiptap ul')).toHaveCount(0)

    await page.locator('button:nth-child(1)').click()

    await expect(page.locator('.tiptap ul[data-type="taskList"]')).toContainText('Example Text')

    await page.locator('button:nth-child(1)').click()

    await expect(page.locator('.tiptap ul')).toHaveCount(0)
  })

  test('should make the paragraph a task list when the keyboard shortcut is pressed', async ({ page }) => {
    await page.keyboard.press('Control+Shift+9')
    await expect(page.locator('.tiptap ul li')).toContainText('Example Text')
  })

  test('should leave the list with double enter', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })

    await page.locator('.tiptap').pressSequentially('[ ] List Item 1')
    await page.keyboard.press('Enter')
    await page.keyboard.press('Enter')
    await page.locator('.tiptap').pressSequentially('Paragraph')

    await expect(page.locator('.tiptap li')).toHaveCount(1)

    await expect(page.locator('.tiptap p')).toContainText('Paragraph')
  })

  test('should make a task list from square brackets', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })

    await page.locator('.tiptap').pressSequentially('[ ] List Item 1')
    await page.keyboard.press('Enter')
    await page.locator('.tiptap').pressSequentially('List Item 2')

    await expect(page.locator('.tiptap li:nth-child(1)')).toContainText('List Item 1')
    await expect(page.locator('.tiptap li:nth-child(1)')).toHaveAttribute('data-checked', 'false')

    await expect(page.locator('.tiptap li:nth-child(2)')).toContainText('List Item 2')
    await expect(page.locator('.tiptap li:nth-child(2)')).toHaveAttribute('data-checked', 'false')
  })

  test('should make a task list from checked square brackets', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })

    await page.locator('.tiptap').pressSequentially('[x] List Item 1')
    await page.keyboard.press('Enter')
    await page.locator('.tiptap').pressSequentially('List Item 2')

    await expect(page.locator('.tiptap li:nth-child(1)')).toContainText('List Item 1')
    await expect(page.locator('.tiptap li:nth-child(1)')).toHaveAttribute('data-checked', 'true')

    await expect(page.locator('.tiptap li:nth-child(2)')).toContainText('List Item 2')
    await expect(page.locator('.tiptap li:nth-child(2)')).toHaveAttribute('data-checked', 'false')
  })
})
