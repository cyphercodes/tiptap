import { expect,test } from '@playwright/test'

test.describe('/src/Examples/AutolinkValidation/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Examples/AutolinkValidation/React/')
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

  test('should not relink unset links after entering second link', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('https://tiptap.dev ')
    await page.keyboard.press('Home')
    await expect(page.locator('.tiptap')).toHaveText('https://tiptap.dev ')
    await page.locator('[data-testid=unsetLink]').click()
    await expect(page.locator('.tiptap a')).toHaveCount(0)
    await page.keyboard.press('End')
    await page.locator('.tiptap').pressSequentially('http://www.example.com/ ')
    await expect(page.locator('.tiptap a')).toHaveCount(1)
    await expect(page.locator('.tiptap a')).toHaveAttribute('href', 'http://www.example.com/')
  })

  test('should not relink unset links after hitting next paragraph', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('https://tiptap.dev ')
    await page.keyboard.press('Home')
    await expect(page.locator('.tiptap')).toHaveText('https://tiptap.dev ')
    await page.locator('[data-testid=unsetLink]').click()
    await expect(page.locator('.tiptap a')).toHaveCount(0)
    await page.keyboard.press('End')
    await page
      .locator('.tiptap')
      .pressSequentially('typing other text should prevent the link from relinking when hitting enter')
    await page.keyboard.press('Enter')
    await expect(page.locator('.tiptap a')).toHaveCount(0)
  })

  test('should not relink unset links after modifying', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('https://tiptap.dev ')
    await page.keyboard.press('Home')
    await expect(page.locator('.tiptap')).toHaveText('https://tiptap.dev ')
    await page.locator('[data-testid=unsetLink]').click()
    await expect(page.locator('.tiptap a')).toHaveCount(0)
    await page.keyboard.press('Home')
    for (let i = 0; i < 'https://'.length; i++) {
      await page.keyboard.press('ArrowRight')
    }
    await page.locator('.tiptap').pressSequentially('blah')
    await expect(page.locator('.tiptap')).toHaveText('https://blahtiptap.dev ')
    await expect(page.locator('.tiptap a')).toHaveCount(0)
  })

  test('should autolink after hitting enter (new paragraph)', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('https://tiptap.dev')
    await page.keyboard.press('Enter')
    await expect(page.locator('.tiptap')).toHaveText('https://tiptap.dev')
    await expect(page.locator('.tiptap a')).toHaveCount(1)
    await expect(page.locator('.tiptap a')).toHaveAttribute('href', 'https://tiptap.dev')
  })

  test('should autolink after hitting shift-enter (hardbreak)', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('https://tiptap.dev')
    await page.keyboard.press('Shift+Enter')
    await expect(page.locator('.tiptap')).toHaveText('https://tiptap.dev')
    await expect(page.locator('.tiptap a')).toHaveCount(1)
    await expect(page.locator('.tiptap a')).toHaveAttribute('href', 'https://tiptap.dev')
  })
})
