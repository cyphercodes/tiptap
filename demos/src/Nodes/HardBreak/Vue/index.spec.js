import { expect,test } from '@playwright/test'

test.describe('/src/Nodes/HardBreak/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Nodes/HardBreak/Vue/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<p>Example Text</p>')
    })
  })

  test('should parse hard breaks correctly', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<p>Example<br>Text</p>')
    })
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe('<p>Example<br>Text</p>')
  })

  test('should parse hard breaks with self-closing tag correctly', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<p>Example<br />Text</p>')
    })
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe('<p>Example<br>Text</p>')
  })

  test('the button should add a line break', async ({ page }) => {
    await expect(page.locator('.tiptap br')).toHaveCount(0)

    await page.locator('button').first().click()

    await expect(page.locator('.tiptap br')).toBeVisible()
  })

  test('the default keyboard shortcut should add a line break', async ({ page }) => {
    await expect(page.locator('.tiptap br')).toHaveCount(0)

    await page.keyboard.press('Shift+Enter')

    await expect(page.locator('.tiptap br')).toBeVisible()
  })

  test('the alternative keyboard shortcut should add a line break', async ({ page }) => {
    await expect(page.locator('.tiptap br')).toHaveCount(0)

    await page.keyboard.press('Control+Enter')

    await expect(page.locator('.tiptap br')).toBeVisible()
  })
})
