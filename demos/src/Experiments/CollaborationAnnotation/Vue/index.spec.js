import { test } from '@playwright/test'

test.describe('/src/Experiments/CollaborationAnnotation/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Experiments/CollaborationAnnotation/Vue/')
  })

  /* test('renders two editors', async ({ page }) => {
    await expect(page.locator('.tiptap')).toHaveCount(2)
  }) */

  // TODO: Fix those tests in the future
  // Current problem is that tiptap seems to mismatch a transformation somewhere inside those tests
  // So to fix this, we should look for a different way to simulate the annotation process

  /* test('sets an annotation in editor 1 and shows annotations in both editors', async ({ page }) => {
    page.on('dialog', async dialog => {
      await dialog.accept('This is a test comment')
    })
    await page.keyboard.press('Control+a')
    await page.keyboard.press('Backspace')
    await page.locator('.editor-1 .tiptap').pressSequentially('Hello world')
    await page.keyboard.press('Control+a')
    await page.locator('button', { hasText: 'Comment' }).first().click()
    await page.keyboard.press('End')
    await expect(page.locator('.tiptap .annotation')).toHaveCount(2)
    await expect(page.locator('.comment')).toBeVisible()
    await expect(page.locator('.comment')).toContainText('This is a test comment')
  }) */

  /* test('updates an existing annotation', async ({ page }) => {
    let commentIndex = 0

    page.on('dialog', async dialog => {
      switch (commentIndex) {
        case 0:
          commentIndex += 1
          await dialog.accept('This is a test comment')
          break
        case 1:
          commentIndex += 1
          await dialog.accept('This is the new comment')
          break
        default:
          await dialog.accept('')
          break
      }
    })

    await page.keyboard.press('Control+a')
    await page.keyboard.press('Backspace')
    await page.locator('.editor-1 .tiptap').pressSequentially('Hello world')
    await page.keyboard.press('Control+a')
    await page.locator('button', { hasText: 'Comment' }).first().click()
    await page.waitForTimeout(1000)
    await page.locator('.editor-1 .tiptap .annotation').click()
    await expect(page.locator('.comment')).toBeVisible()
    await expect(page.locator('.comment')).toContainText('This is a test comment')
    await page.locator('button', { hasText: 'Update' }).click()
    await page.waitForTimeout(1000)
    await expect(page.locator('.comment')).toBeVisible()
    await expect(page.locator('.comment')).toContainText('This is the new comment')
  }) */

  /* test('deletes an existing annotation', async ({ page }) => {
    page.on('dialog', async dialog => {
      await dialog.accept('This is a test comment')
    })

    await page.keyboard.press('Control+a')
    await page.keyboard.press('Backspace')
    await page.locator('.editor-1 .tiptap').pressSequentially('Hello world')
    await page.keyboard.press('Control+a')
    await page.locator('button', { hasText: 'Comment' }).first().click()
    await page.waitForTimeout(1000)
    await page.locator('.editor-1 .tiptap .annotation').click()
    await expect(page.locator('.comment')).toBeVisible()
    await expect(page.locator('.comment')).toContainText('This is a test comment')
    await page.locator('button', { hasText: 'Remove' }).click()
    await expect(page.locator('.tiptap .annotation')).toHaveCount(0)
    await page.waitForTimeout(1000)
    await expect(page.locator('.comment')).toHaveCount(0)
  }) */
})
