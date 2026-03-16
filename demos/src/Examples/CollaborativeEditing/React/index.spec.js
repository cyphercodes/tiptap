import { test } from '@playwright/test'

test.describe('/src/Examples/CollaborativeEditing/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Examples/CollaborativeEditing/React/')
  })

  /* test('should show the current room with participants', async ({ page }) => {
    await page.waitForTimeout(6000)
    await expect(page.locator('.editor__status')).toContainText('rooms.')
    await expect(page.locator('.editor__status')).toContainText('users online')
  })

  test('should allow user to change name', async ({ page }) => {
    await page.evaluate(() => {
      window.prompt = () => 'John Doe'
    })
    await page.locator('.editor__name > button').click()
    await page.waitForTimeout(6000)
    await expect(page.locator('.editor__name')).toContainText('John Doe')
  }) */
})
