import { expect,test } from '@playwright/test'

test.describe('/src/Nodes/Details/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Nodes/Details/Vue/')
    await page.evaluate(() => {
      document.querySelector('.ProseMirror').editor.commands.setContent('<p>Example Text</p>')
    })
    await page.keyboard.press('Control+a')
  })

  test('should parse details tags correctly', async ({ page }) => {
    await page.evaluate(() => {
      document
        .querySelector('.ProseMirror')
        .editor.commands.setContent('<details><summary>Summary</summary><p>Content</p></details>')
    })
    expect(await page.evaluate(() => document.querySelector('.ProseMirror').editor.getHTML())).toBe(
      '<details class="details"><summary>Summary</summary><div data-type="detailsContent"><p>Content</p></div></details><p></p>',
    )
  })

  test('should parse details tags without paragraphs correctly', async ({ page }) => {
    await page.evaluate(() => {
      document
        .querySelector('.ProseMirror')
        .editor.commands.setContent('<details><summary>Summary</summary>Content</details>')
    })
    expect(await page.evaluate(() => document.querySelector('.ProseMirror').editor.getHTML())).toBe(
      '<details class="details"><summary>Summary</summary><div data-type="detailsContent"><p>Content</p></div></details><p></p>',
    )
  })

  test('setDetails should make the selected line a details node', async ({ page }) => {
    await expect(page.locator('.ProseMirror [data-type="details"]')).toHaveCount(0)

    await page.locator('button').first().click()

    await expect(page.locator('.ProseMirror [data-type="details"] [data-type="detailsContent"]')).toContainText(
      'Example Text',
    )
  })

  test('unsetDetails should make the selected line a paragraph node', async ({ page }) => {
    await page.locator('button').first().click()

    await expect(page.locator('.ProseMirror [data-type="details"]')).toBeVisible()

    await page.locator('button:nth-child(2)').click()

    await expect(page.locator('.ProseMirror [data-type="details"]')).toHaveCount(0)
  })
})
