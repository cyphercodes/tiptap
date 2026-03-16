import { expect,test } from '@playwright/test'

test.describe('/src/Examples/Community/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Examples/Community/React/')
  })

  test('should count the characters correctly', async ({ page }) => {
    // check if count text is "44 / 280 characters"
    await expect(page.locator('.character-count')).toContainText('44 / 280 characters')

    // type in .tiptap
    await page.locator('.tiptap').pressSequentially(' Hello World')
    await expect(page.locator('.character-count')).toContainText('56 / 280 characters')

    // remove content from .tiptap and enter text
    await page.locator('.tiptap').click()
    await page.keyboard.press('Control+a')
    await page.keyboard.press('Backspace')
    await page.locator('.tiptap').pressSequentially('Hello World')
    await expect(page.locator('.character-count')).toContainText('11 / 280 characters')
  })

  test('should mention a user', async ({ page }) => {
    await page.locator('.tiptap').click()
    await page.keyboard.press('Control+a')
    await page.keyboard.press('Backspace')
    await page.locator('.tiptap').pressSequentially('@')

    // check if the mention autocomplete is visible
    await expect(page.locator('.dropdown-menu')).toBeVisible()

    // select the first user
    const firstButton = page.locator('.dropdown-menu button').first()
    const name = await firstButton.textContent()

    await firstButton.click()

    // check if the user is mentioned
    await expect(page.locator('.tiptap')).toHaveText(`@${name} `)
    await expect(page.locator('.character-count')).toContainText('2 / 280 characters')
  })
})
