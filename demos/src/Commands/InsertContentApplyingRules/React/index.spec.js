import { expect,test } from '@playwright/test'

test.describe('/src/Commands/InsertContentApplyingRules/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Commands/InsertContentApplyingRules/React/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })
  })

  test('should apply list InputRule', async ({ page }) => {
    await page.evaluate(
      val => {
        document.querySelector('.tiptap').editor.commands.insertContent(val[0], val[1])
      },
      [
        '-',
        {
          applyInputRules: true,
        },
      ],
    )

    await page.evaluate(
      val => {
        document.querySelector('.tiptap').editor.commands.insertContent(val[0], val[1])
      },
      [
        ' ',
        {
          applyInputRules: true,
        },
      ],
    )

    expect(await page.locator('.tiptap').innerHTML()).toContain(
      '<ul><li><p><br class="ProseMirror-trailingBreak"></p></li></ul>',
    )
  })

  test('should apply markdown using a PasteRule', async ({ page }) => {
    await page.evaluate(
      val => {
        document.querySelector('.tiptap').editor.commands.insertContentAt(1, val[0], val[1])
      },
      [
        '*This is an italic text*',
        {
          applyPasteRules: true,
        },
      ],
    )

    expect(await page.locator('.tiptap').innerHTML()).toContain('<p><em>This is an italic text</em></p>')
  })
})
