import { expect,test } from '@playwright/test'

test.describe('/src/Extensions/CollaborationWithMenus/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Extensions/CollaborationWithMenus/Vue/')
  })

  test('should have a working tiptap instance', async ({ page }) => {
    const editor = await page.evaluate(() => document.querySelector('.tiptap').editor)

    expect(editor).not.toBeNull()
  })

  test('should have menu plugins initiated', async ({ page }) => {
    const hasBothMenuPluginsLoaded = await page.evaluate(() => {
      const editor = document.querySelector('.tiptap').editor
      const bubbleMenuPlugin = editor.view.state.plugins.find(plugin => plugin.spec.key?.key === 'bubbleMenu$')
      const floatingMenuPlugin = editor.view.state.plugins.find(plugin => plugin.spec.key?.key === 'floatingMenu$')

      return !!bubbleMenuPlugin && !!floatingMenuPlugin
    })

    expect(hasBothMenuPluginsLoaded).toBe(true)
  })

  test('should have a ydoc', async ({ page }) => {
    const hasYDoc = await page.evaluate(() => {
      const editor = document.querySelector('.tiptap').editor
      const yDoc = editor.extensionManager.extensions.find(a => a.name === 'collaboration').options.document

      return yDoc !== null
    })

    expect(hasYDoc).toBe(true)
  })
})
