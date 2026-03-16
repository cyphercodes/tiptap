import { expect,test } from '@playwright/test'

test.describe('/src/Demos/CollaborationSplitPane/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Demos/CollaborationSplitPane/React/')
  })

  test('should have a working tiptap instance', async ({ page }) => {
    const editorExists = await page.evaluate(() => {
      const editor = document.querySelector('.tiptap').editor
      return editor !== null && editor !== undefined
    })
    expect(editorExists).toBe(true)
  })

  test('should have a ydoc', async ({ page }) => {
    const yDocExists = await page.evaluate(() => {
      /**
       * @type {import('yjs').Doc}
       */
      const editor = document.querySelector('.tiptap').editor
      const yDoc = editor.extensionManager.extensions.find(a => a.name === 'collaboration').options.document
      return yDoc !== null && yDoc !== undefined
    })
    expect(yDocExists).toBe(true)
  })
})
