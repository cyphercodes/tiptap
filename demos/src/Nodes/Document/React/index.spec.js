import { expect,test } from '@playwright/test'

test.describe('/src/Nodes/Document/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Nodes/Document/React/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<p></p>')
    })
  })

  test('should return the document in as json', async ({ page }) => {
    const json = await page.evaluate(() => {
      return document.querySelector('.tiptap').editor.getJSON()
    })

    expect(json).toEqual({
      type: 'doc',
      content: [
        {
          type: 'paragraph',
        },
      ],
    })
  })
})
