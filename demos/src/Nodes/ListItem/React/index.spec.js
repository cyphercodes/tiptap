import { expect,test } from '@playwright/test'

test.describe('/src/Nodes/ListItem/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Nodes/ListItem/React/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<ul><li>Example Text</li></ul>')
  })

  test('should add a new list item on Enter', async ({ page }) => {
    await page.keyboard.press('Enter')
    await page.locator('.tiptap').pressSequentially('2nd Item')

    await expect(page.locator('.tiptap li:nth-child(1)')).toContainText('Example Text')

    await expect(page.locator('.tiptap li:nth-child(2)')).toContainText('2nd Item')
  })

  test('should sink the list item on Tab', async ({ page }) => {
    await page.keyboard.press('Enter')
    await page.keyboard.press('Tab')

    await page.locator('.tiptap').pressSequentially('2nd Level')

    await expect(page.locator('.tiptap li:nth-child(1) li')).toContainText('2nd Level')
  })

  test('should lift the list item on Shift+Tab', async ({ page }) => {
    await page.keyboard.press('Enter')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Shift+Tab')

    await page.locator('.tiptap').pressSequentially('1st Level')

    await expect(page.locator('.tiptap li:nth-child(2)')).toContainText('1st Level')
  })
})
