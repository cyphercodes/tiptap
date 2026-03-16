import { expect,test } from '@playwright/test'

test.describe('/src/Nodes/Table/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Nodes/Table/React/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })
  })

  test('creates a table (1x1)', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.insertTable({ cols: 1, rows: 1, withHeaderRow: false })
    })

    await expect(page.locator('.tiptap td')).toHaveCount(1)
    await expect(page.locator('.tiptap tr')).toHaveCount(1)
  })

  test('creates a table (3x1)', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.insertTable({ cols: 3, rows: 1, withHeaderRow: false })
    })

    await expect(page.locator('.tiptap td')).toHaveCount(3)
    await expect(page.locator('.tiptap tr')).toHaveCount(1)
  })

  test('creates a table (1x3)', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.insertTable({ cols: 1, rows: 3, withHeaderRow: false })
    })

    await expect(page.locator('.tiptap td')).toHaveCount(3)
    await expect(page.locator('.tiptap tr')).toHaveCount(3)
  })

  test('creates a table with header row (1x3)', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.insertTable({ cols: 1, rows: 3, withHeaderRow: true })
    })

    await expect(page.locator('.tiptap th')).toHaveCount(1)
    await expect(page.locator('.tiptap td')).toHaveCount(2)
    await expect(page.locator('.tiptap tr')).toHaveCount(3)
  })

  test('creates a table with correct defaults (3x3, th)', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.insertTable()
    })

    await expect(page.locator('.tiptap th')).toHaveCount(3)
    await expect(page.locator('.tiptap td')).toHaveCount(6)
    await expect(page.locator('.tiptap tr')).toHaveCount(3)
  })

  test('sets the minimum width on the colgroups by default (3x1)', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.insertTable({ cols: 3, rows: 1, withHeaderRow: false })
    })

    await expect(page.locator('.tiptap col')).toHaveAttribute('style', 'min-width: 25px;')
  })

  test('generates correct markup for a table (1x1)', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.insertTable({ cols: 1, rows: 1, withHeaderRow: false })
    })

    const html = await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())

    expect(html).toBe(
      '<table style="min-width: 25px"><colgroup><col style="min-width: 25px"></colgroup><tbody><tr><td colspan="1" rowspan="1"><p></p></td></tr></tbody></table>',
    )
  })

  test('generates correct markup for a table (1x1, th)', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.insertTable({ cols: 1, rows: 1, withHeaderRow: true })
    })

    const html = await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())

    expect(html).toBe(
      '<table style="min-width: 25px"><colgroup><col style="min-width: 25px"></colgroup><tbody><tr><th colspan="1" rowspan="1"><p></p></th></tr></tbody></table>',
    )
  })
})
