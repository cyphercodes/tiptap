import { expect,test } from '@playwright/test'

test.describe('/src/Extensions/TextAlign/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Extensions/TextAlign/React/')
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<p>Example Text</p>')
    })
  })

  test('should parse a null alignment correctly', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<p>Example Text</p>')
    })
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe('<p>Example Text</p>')
  })

  test('should parse left align text correctly', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<p style="text-align: left">Example Text</p>')
    })
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<p style="text-align: left">Example Text</p>',
    )
  })

  test('should parse center align text correctly', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<p style="text-align: center">Example Text</p>')
    })
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<p style="text-align: center">Example Text</p>',
    )
  })

  test('should parse right align text correctly', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<p style="text-align: right">Example Text</p>')
    })
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<p style="text-align: right">Example Text</p>',
    )
  })

  test('should parse left justify text correctly', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<p style="text-align: justify">Example Text</p>')
    })
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<p style="text-align: justify">Example Text</p>',
    )
  })

  test('should keep the text aligned when toggling headings', async ({ page }) => {
    const alignments = ['center', 'right', 'justify']
    const headings = [1, 2]

    for (const alignment of alignments) {
      for (const level of headings) {
        await page.evaluate(
          ({ alignment, level }) => {
            const editor = document.querySelector('.tiptap').editor
            editor.commands.setContent(`<p style="text-align: ${alignment}">Example Text</p>`)
            editor.commands.toggleHeading({ level })
          },
          { alignment, level },
        )
        expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
          `<h${level} style="text-align: ${alignment}">Example Text</h${level}>`,
        )
      }
    }
  })

  test('aligns the text left on the 1st button', async ({ page }) => {
    await page.locator('button:nth-child(1)').click()

    await expect(page.locator('.tiptap p')).toHaveCSS('text-align', 'left')
  })

  test('aligns the text center on the 2nd button', async ({ page }) => {
    await page.locator('button:nth-child(2)').click()

    await expect(page.locator('.tiptap p')).toHaveCSS('text-align', 'center')
  })

  test('aligns the text right on the 3rd button', async ({ page }) => {
    await page.locator('button:nth-child(3)').click()

    await expect(page.locator('.tiptap p')).toHaveCSS('text-align', 'right')
  })

  test('aligns the text justified on the 4th button', async ({ page }) => {
    await page.locator('button:nth-child(4)').click()

    await expect(page.locator('.tiptap p')).toHaveCSS('text-align', 'justify')
  })

  test('aligns the text default on the 5th button', async ({ page }) => {
    await page.locator('button:nth-child(5)').click()

    await expect(page.locator('.tiptap p')).not.toHaveCSS('text-align', 'left')
  })

  test('toggle the text to right on the 6th button', async ({ page }) => {
    await page.locator('button:nth-child(6)').click()
    await expect(page.locator('.tiptap p')).toHaveCSS('text-align', 'right')

    await page.locator('button:nth-child(6)').click()
    await expect(page.locator('.tiptap p')).not.toHaveCSS('text-align', 'right')
  })

  test('aligns the text left when pressing the keyboard shortcut', async ({ page }) => {
    await page.locator('.tiptap').click()
    await page.keyboard.press('Control+Shift+l')
    await expect(page.locator('.tiptap p')).toHaveCSS('text-align', 'left')
  })

  test('aligns the text center when pressing the keyboard shortcut', async ({ page }) => {
    await page.locator('.tiptap').click()
    await page.keyboard.press('Control+Shift+e')
    await expect(page.locator('.tiptap p')).toHaveCSS('text-align', 'center')
  })

  test('aligns the text right when pressing the keyboard shortcut', async ({ page }) => {
    await page.locator('.tiptap').click()
    await page.keyboard.press('Control+Shift+r')
    await expect(page.locator('.tiptap p')).toHaveCSS('text-align', 'right')
  })

  test('aligns the text justified when pressing the keyboard shortcut', async ({ page }) => {
    await page.locator('.tiptap').click()
    await page.keyboard.press('Control+Shift+j')
    await expect(page.locator('.tiptap p')).toHaveCSS('text-align', 'justify')
  })
})
