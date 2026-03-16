import { expect,test } from '@playwright/test'

test.describe('/src/Examples/Tables/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Examples/Tables/React/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })
    await page.locator('button', { hasText: 'Insert table' }).click()
  })

  test('adds a table with three columns and three rows', async ({ page }) => {
    await expect(page.locator('.tiptap table')).toBeVisible()
    await expect(page.locator('.tiptap table tr')).toHaveCount(3)
    await expect(page.locator('.tiptap table th')).toHaveCount(3)
    await expect(page.locator('.tiptap table td')).toHaveCount(6)
  })

  test('adds & delete columns', async ({ page }) => {
    await page.locator('button', { hasText: 'Add column before' }).click()
    await expect(page.locator('.tiptap table th')).toHaveCount(4)

    await page.locator('button', { hasText: 'Add column after' }).click()
    await expect(page.locator('.tiptap table th')).toHaveCount(5)

    await page.locator('button', { hasText: 'Delete column' }).click()
    await page.locator('button', { hasText: 'Delete column' }).click()
    await expect(page.locator('.tiptap table th')).toHaveCount(3)
  })

  test('adds & delete rows', async ({ page }) => {
    await page.locator('button', { hasText: 'Add row before' }).click()
    await expect(page.locator('.tiptap table tr')).toHaveCount(4)

    await page.locator('button', { hasText: 'Add row after' }).click()
    await expect(page.locator('.tiptap table tr')).toHaveCount(5)

    await page.locator('button', { hasText: 'Delete row' }).click()
    await page.locator('button', { hasText: 'Delete row' }).click()
    await expect(page.locator('.tiptap table tr')).toHaveCount(3)
  })

  test('should delete table', async ({ page }) => {
    await page.locator('button', { hasText: 'Delete table' }).click()
    await expect(page.locator('.tiptap table')).toHaveCount(0)
  })

  test('should merge cells', async ({ page }) => {
    await page.keyboard.down('Shift')
    await page.keyboard.press('ArrowRight')
    await page.keyboard.up('Shift')
    await page.locator('button', { hasText: 'Merge cells' }).click()
    await expect(page.locator('.tiptap table th')).toHaveCount(2)
  })

  test('should split cells', async ({ page }) => {
    await page.keyboard.down('Shift')
    await page.keyboard.press('ArrowRight')
    await page.keyboard.up('Shift')
    await page.locator('button', { hasText: 'Merge cells' }).click()
    await expect(page.locator('.tiptap table th')).toHaveCount(2)
    await page.locator('button', { hasText: 'Split cell' }).click()
    await expect(page.locator('.tiptap table th')).toHaveCount(3)
  })

  test('should toggle header columns', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.toggleHeaderColumn()
    })
    await expect(page.locator('.tiptap table th')).toHaveCount(5)
  })

  test('should toggle header row', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.toggleHeaderRow()
    })
    await expect(page.locator('.tiptap table th')).toHaveCount(0)
  })

  test('should merge split', async ({ page }) => {
    await page.keyboard.down('Shift')
    await page.keyboard.press('ArrowRight')
    await page.keyboard.up('Shift')
    await page.locator('button', { hasText: 'Merge cells' }).click()
    await expect(page.locator('.tiptap th[colspan="2"]')).toBeVisible()
    await page.locator('button', { hasText: 'Merge or split' }).click()
    await expect(page.locator('.tiptap th[colspan="2"]')).toHaveCount(0)
  })

  test('should set cell attribute', async ({ page }) => {
    await page.keyboard.press('ArrowDown')
    await page.locator('button', { hasText: 'Set cell attribute' }).click()
    await expect(page.locator('.tiptap table td[style]')).toHaveAttribute('style', 'background-color: #FAF594')
  })

  test('should move focus to next or prev cell', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('Column 1')
    await page.locator('button', { hasText: 'Go to next cell' }).click()
    await page.locator('.tiptap').pressSequentially('Column 2')
    await page.locator('button', { hasText: 'Go to previous cell' }).click()

    const texts = await page.evaluate(() => {
      const elements = document.querySelectorAll('.tiptap th')
      return [elements[0].innerText, elements[1].innerText]
    })
    expect(texts[0]).toBe('Column 1')
    expect(texts[1]).toBe('Column 2')
  })
})
