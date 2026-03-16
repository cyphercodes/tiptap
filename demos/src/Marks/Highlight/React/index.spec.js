import { expect,test } from '@playwright/test'

test.describe('/src/Marks/Highlight/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Marks/Highlight/React/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.chain().setContent('<p>Example Text</p>').selectAll().run()
    })
  })

  test('the button should highlight the selected text', async ({ page }) => {
    await page.locator('button').first().click()

    await expect(page.locator('.tiptap mark')).toContainText('Example Text')
  })

  test('should highlight the text in a specific color', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.toggleHighlight({ color: 'red' })
    })

    await expect(page.locator('.tiptap mark')).toContainText('Example Text')
    await expect(page.locator('.tiptap mark')).toHaveAttribute('data-color', 'red')
  })

  test('should update the attributes of existing marks', async ({ page }) => {
    await page.evaluate(() => {
      document
        .querySelector('.tiptap')
        .editor.chain()
        .setContent('<p><mark style="background-color: blue;">Example Text</mark></p>')
        .selectAll()
        .toggleHighlight({ color: 'rgb(255, 0, 0)' })
        .run()
    })

    await expect(page.locator('.tiptap mark')).toHaveCSS('background-color', 'rgb(255, 0, 0)')
  })

  test('should remove existing marks with the same attributes', async ({ page }) => {
    await page.evaluate(() => {
      document
        .querySelector('.tiptap')
        .editor.chain()
        .setContent('<p><mark style="background-color: rgb(255, 0, 0);">Example Text</mark></p>')
        .selectAll()
        .toggleHighlight({ color: 'rgb(255, 0, 0)' })
        .run()
    })

    await expect(page.locator('.tiptap mark')).toHaveCount(0)
  })

  test('is active for mark with any attributes', async ({ page }) => {
    await page.evaluate(() => {
      document
        .querySelector('.tiptap')
        .editor.chain()
        .setContent('<p><mark data-color="red">Example Text</mark></p>')
        .selectAll()
        .run()
    })

    const isActive = await page.evaluate(() => document.querySelector('.tiptap').editor.isActive('highlight'))
    expect(isActive).toBe(true)
  })

  test('is active for mark with same attributes', async ({ page }) => {
    await page.evaluate(() => {
      document
        .querySelector('.tiptap')
        .editor.chain()
        .setContent('<p><mark style="background-color: rgb(255, 0, 0);">Example Text</mark></p>')
        .selectAll()
        .run()
    })

    const isActive = await page.evaluate(
      (...args) => document.querySelector('.tiptap').editor.isActive(...args),
      'highlight',
      {
        color: 'rgb(255, 0, 0)',
      },
    )

    expect(isActive).toBe(true)
  })

  test("isn't active for mark with other attributes", async ({ page }) => {
    await page.evaluate(() => {
      document
        .querySelector('.tiptap')
        .editor.chain()
        .setContent('<p><mark style="background-color: rgb(255, 0, 0);">Example Text</mark></p>')
        .selectAll()
        .run()
    })

    const isActive = await page.evaluate(
      (...args) => document.querySelector('.tiptap').editor.isActive(...args),
      'highlight',
      {
        color: 'rgb(0, 0, 0)',
      },
    )

    expect(isActive).toBe(false)
  })

  test('the button should toggle the selected text highlighted', async ({ page }) => {
    await page.locator('button').first().click()

    await page.keyboard.press('Control+a')

    await page.locator('button').first().click()

    await expect(page.locator('.tiptap mark')).toHaveCount(0)
  })

  test('should highlight the selected text when the keyboard shortcut is pressed', async ({ page }) => {
    await page.keyboard.press('Control+Shift+h')
    await expect(page.locator('.tiptap mark')).toContainText('Example Text')
  })

  test('should toggle the selected text highlighted when the keyboard shortcut is pressed', async ({ page }) => {
    await page.keyboard.press('Control+Shift+h')
    await page.keyboard.press('Control+Shift+h')
    await expect(page.locator('.tiptap mark')).toHaveCount(0)
  })
})
