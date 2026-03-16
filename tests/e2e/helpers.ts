import type { Page } from '@playwright/test'

/**
 * Set the editor content via the editor instance attached to the .tiptap DOM element.
 */
export async function setContent(page: Page, html: string) {
  await page.evaluate(h => {
    ;(document.querySelector('.tiptap') as any).editor.commands.setContent(h)
  }, html)
}

/**
 * Get the editor HTML via the editor instance.
 */
export async function getHTML(page: Page): Promise<string> {
  return page.evaluate(() => (document.querySelector('.tiptap') as any).editor.getHTML())
}

/**
 * Paste content into the element matching the selector.
 * Replaces the Cypress custom `paste` command.
 */
export async function paste(page: Page, selector: string, payload: string, type = 'text/plain') {
  await page.evaluate(
    ({ sel, data, dataType }) => {
      const el = document.querySelector(sel)!
      const clipboardData = new DataTransfer()

      clipboardData.setData(dataType, data)
      const pasteEvent = new ClipboardEvent('paste', {
        bubbles: true,
        cancelable: true,
        clipboardData,
      })

      el.dispatchEvent(pasteEvent)
    },
    { sel: selector, data: payload, dataType: type },
  )
}
