import { expect,test } from '@playwright/test'

test.describe('/src/Examples/AutolinkValidation/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Examples/AutolinkValidation/Vue/')
  })

  test.beforeEach(async ({ page }) => {
    await page.locator('.tiptap').click()
    await page.keyboard.press('Control+a')
    await page.keyboard.press('Backspace')
  })

  const validLinks = [
    // [rawTextInput, textThatShouldBeLinked]
    ['https://tiptap.dev ', 'https://tiptap.dev'],
    ['http://tiptap.dev ', 'http://tiptap.dev'],
    ['https://www.tiptap.dev/ ', 'https://www.tiptap.dev/'],
    ['http://www.tiptap.dev/ ', 'http://www.tiptap.dev/'],
    ['[http://www.example.com/] ', 'http://www.example.com/'],
    ['(http://www.example.com/) ', 'http://www.example.com/'],
  ]

  const invalidLinks = [
    'tiptap.dev',
    'www.tiptap.dev',
    // If you don't type a space, don't autolink
    'https://tiptap.dev',
  ]

  validLinks.forEach(([rawTextInput, textThatShouldBeLinked]) => {
    test(`should autolink ${rawTextInput}`, async ({ page }) => {
      await page.locator('.tiptap').pressSequentially(rawTextInput)
      await expect(page.locator('.tiptap a')).toContainText(textThatShouldBeLinked)
    })
  })

  invalidLinks.forEach(rawTextInput => {
    test(`should not autolink ${rawTextInput}`, async ({ page }) => {
      await page.locator('.tiptap').click()
      await page.keyboard.press('Control+a')
      await page.keyboard.press('Backspace')
      await page.locator('.tiptap').pressSequentially(rawTextInput)
      await expect(page.locator('.tiptap a')).toHaveCount(0)
    })
  })
})
