import { expect,test } from '@playwright/test'

test.describe('/src/Extensions/Typography/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Extensions/Typography/Vue/')
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })
  })

  test('should make an em dash from two dashes', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('-- emDash')
    await expect(page.locator('.tiptap')).toContainText('\u2014 emDash')
  })

  test('should make an ellipsis from three dots', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('... ellipsis')
    await expect(page.locator('.tiptap')).toContainText('\u2026 ellipsis')
  })

  test('should make a correct open double quote', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('"openDoubleQuote"')
    await expect(page.locator('.tiptap')).toContainText('\u201copenDoubleQuote')
  })

  test('should make a correct close double quote', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('"closeDoubleQuote"')
    await expect(page.locator('.tiptap')).toContainText('closeDoubleQuote\u201d')
  })

  test('should make a correct open single quote', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially("'openSingleQuote'")
    await expect(page.locator('.tiptap')).toContainText('\u2018openSingleQuote\u2019')
  })

  test('should make a correct close single quote', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially("'closeSingleQuote'")
    await expect(page.locator('.tiptap')).toContainText('closeSingleQuote\u2019')
  })

  test('should make a left arrow', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('<- leftArrow')
    await expect(page.locator('.tiptap')).toContainText('\u2190 leftArrow')
  })

  test('should make a right arrow', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('-> rightArrow')
    await expect(page.locator('.tiptap')).toContainText('\u2192 rightArrow')
  })

  test('should make a copyright sign', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('(c) copyright')
    await expect(page.locator('.tiptap')).toContainText('\u00a9 copyright')
  })

  test('should make a registered trademark sign', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('(r) registeredTrademark')
    await expect(page.locator('.tiptap')).toContainText('\u00ae registeredTrademark')
  })

  test('should make a trademark sign', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('(tm) trademark')
    await expect(page.locator('.tiptap')).toContainText('\u2122 trademark')
  })

  test('should make a one half', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('1/2 oneHalf')
    await expect(page.locator('.tiptap')).toContainText('\u00bd oneHalf')
  })

  test('should make a plus/minus sign', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('+/- plusMinus')
    await expect(page.locator('.tiptap')).toContainText('\u00b1 plusMinus')
  })

  test('should make a not equal sign', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('!= notEqual')
    await expect(page.locator('.tiptap')).toContainText('\u2260 notEqual')
  })

  test('should make a laquo', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('<< laquorow')
    await expect(page.locator('.tiptap')).toContainText('\u00ab laquo')
  })

  test('should make a raquo', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('>> raquorow')
    await expect(page.locator('.tiptap')).toContainText('\u00bb raquo')
  })

  test('should make a multiplication sign from an asterisk', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('1*1 multiplication')
    await expect(page.locator('.tiptap')).toContainText('1\u00d71 multiplication')
  })

  test('should make a multiplication sign from an x', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('1x1 multiplication')
    await expect(page.locator('.tiptap')).toContainText('1\u00d71 multiplication')
  })

  test('should make a multiplication sign from an asterisk with spaces', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('1 * 1 multiplication')
    await expect(page.locator('.tiptap')).toContainText('1 \u00d7 1 multiplication')
  })

  test('should make a multiplication sign from an x with spaces', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('1 x 1 multiplication')
    await expect(page.locator('.tiptap')).toContainText('1 \u00d7 1 multiplication')
  })
})
