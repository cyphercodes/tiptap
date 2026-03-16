import { expect,test } from '@playwright/test'

test.describe('/src/Examples/Formatting/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Examples/Formatting/Vue/')
    await page.keyboard.press('Control+a')
    await page.keyboard.press('Backspace')
  })

  const marks = [{ label: 'Highlight', mark: 'mark' }]

  marks.forEach(m => {
    test(`sets ${m.label}`, async ({ page }) => {
      await page.locator('.tiptap').pressSequentially('Hello world.')
      await page.keyboard.press('Control+a')
      await page.locator('button', { hasText: m.label }).click()
      await expect(page.locator('.tiptap mark')).toBeVisible()
    })
  })

  const alignments = [
    { label: 'Left', alignment: 'left' },
    { label: 'Center', alignment: 'center' },
    { label: 'Right', alignment: 'right' },
    { label: 'Justify', alignment: 'justify' },
  ]

  alignments.forEach(a => {
    test(`sets ${a.label}`, async ({ page }) => {
      await page.locator('.tiptap').pressSequentially('Hello world.')
      await page.keyboard.press('Control+a')
      await page.locator('button', { hasText: a.label }).click()
      if (a.alignment !== 'left') {
        await expect(page.locator('.tiptap p')).toHaveCSS('text-align', a.alignment)
      }
    })
  })
})
