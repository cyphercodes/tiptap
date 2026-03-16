import { expect,test } from '@playwright/test'

test.describe('/src/Experiments/Commands/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Experiments/Commands/Vue/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })
  })

  test('should open a popup after typing a slash', async ({ page }) => {
    const items = [{ tag: 'h1' }, { tag: 'h2' }, { tag: 'strong' }, { tag: 'em' }]

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      await page.keyboard.press('Control+a')
      await page.keyboard.press('Backspace')
      await page.locator('.tiptap').pressSequentially('/')
      await expect(page.locator('.dropdown-menu')).toBeVisible()
      await page.locator('.dropdown-menu button').nth(i).click()
      await page.locator('.tiptap').pressSequentially(`I am a ${item.tag}`)
      await expect(page.locator(`.tiptap ${item.tag}`)).toBeVisible()
      await expect(page.locator(`.tiptap ${item.tag}`)).toHaveText(`I am a ${item.tag}`)
    }
  })

  test('should close the popup without any command via esc', async ({ page }) => {
    await page.keyboard.press('Control+a')
    await page.keyboard.press('Backspace')
    await page.locator('.tiptap').pressSequentially('/')
    await expect(page.locator('.dropdown-menu')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.locator('.dropdown-menu')).toHaveCount(0)
  })

  test('should open the popup when the cursor is after a slash', async ({ page }) => {
    await page.keyboard.press('Control+a')
    await page.keyboard.press('Backspace')
    await page.locator('.tiptap').pressSequentially('/')
    await expect(page.locator('.dropdown-menu')).toBeVisible()
    await page.keyboard.press('ArrowLeft')
    await expect(page.locator('.dropdown-menu')).toHaveCount(0)
    await page.keyboard.press('ArrowRight')
    await expect(page.locator('.dropdown-menu')).toBeVisible()
  })
})
