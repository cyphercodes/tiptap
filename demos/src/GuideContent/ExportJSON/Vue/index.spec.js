import { expect,test } from '@playwright/test'

test.describe('/src/GuideContent/ExportJSON/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/GuideContent/ExportJSON/Vue/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p>Example Text</p>')
  })

  test('should return json', async ({ page }) => {
    const json = await page.evaluate(() => document.querySelector('.tiptap').editor.getJSON())

    expect(json).toEqual({
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Example Text',
            },
          ],
        },
      ],
    })
  })
})
