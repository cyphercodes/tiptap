import { expect,test } from '@playwright/test'

test.describe('/src/Examples/Savvy/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Examples/Savvy/Vue/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })
  })

  const tests = [
    ['(c)', '\u00a9'],
    ['->', '\u2192'],
    ['>>', '\u00bb'],
    ['1/2', '\u00bd'],
    ['!=', '\u2260'],
    ['--', '\u2014'],
    ['1x1', '1\u00d71'],
    [':-) ', '\ud83d\ude42'],
    ['<3 ', '\u2764\ufe0f'],
    ['>:P ', '\ud83d\ude1c'],
  ]

  for (const [input, expected] of tests) {
    test(`should parse ${input} correctly`, async ({ page }) => {
      await page.locator('.tiptap').pressSequentially(`${input} `)
      await expect(page.locator('.tiptap')).toContainText(expected)
    })
  }

  test('should parse hex colors correctly', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('#FD9170')
    await expect(page.locator('.tiptap .color')).toBeVisible()
  })
})
