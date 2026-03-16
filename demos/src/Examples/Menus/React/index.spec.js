import { expect,test } from '@playwright/test'

test.describe('/src/Examples/Menus/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Examples/Menus/React/')
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.chain().focus().clearContent().run()
    })
  })

  test('should show menu when the editor is empty', async ({ page }) => {
    await expect(page.locator('body .floating-menu')).toBeVisible()
  })

  test('should show menu when text is selected', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('Test')
    await page.keyboard.press('Control+a')

    await expect(page.locator('body .bubble-menu')).toBeVisible()
  })

  const marks = [
    {
      button: 'Bold',
      tag: 'strong',
    },
    {
      button: 'Italic',
      tag: 'em',
    },
    {
      button: 'Strike',
      tag: 's',
    },
  ]

  marks.forEach(mark => {
    test(`should apply ${mark.button} correctly`, async ({ page }) => {
      await page.locator('.tiptap').pressSequentially('Test')
      await page.keyboard.press('Control+a')

      await page.locator('body .bubble-menu').locator('button', { hasText: mark.button }).click()

      await expect(page.locator(`.tiptap p ${mark.tag}`)).toBeVisible()
    })
  })
})
