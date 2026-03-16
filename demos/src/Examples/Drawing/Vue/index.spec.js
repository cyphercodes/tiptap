import { expect,test } from '@playwright/test'

test.describe('/src/Examples/Drawing/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Examples/Drawing/Vue/')
  })

  test('should have a working tiptap instance', async ({ page }) => {
    const editor = await page.evaluate(() => document.querySelector('.tiptap').editor)
    expect(editor).not.toBeNull()
  })

  test('should have a svg canvas', async ({ page }) => {
    await expect(page.locator('.tiptap svg')).toBeVisible()
  })

  test('should draw on the svg canvas', async ({ page }) => {
    await expect(page.locator('.tiptap svg')).toBeVisible()

    await page.waitForTimeout(500)

    const color = await page.locator('input').first().inputValue()
    const size = await page.locator('input').nth(1).inputValue()

    const svg = page.locator('.tiptap svg')
    await svg.click()
    const box = await svg.boundingBox()
    await page.mouse.move(box.x + 100, box.y + 100)
    await page.mouse.down()
    await page.mouse.move(box.x + 200, box.y + 200)
    await page.mouse.up()

    await expect(page.locator('.tiptap svg path')).toBeVisible()
    await expect(page.locator('.tiptap svg path')).toHaveAttribute('stroke-width', size)
    await expect(page.locator('.tiptap svg path')).toHaveAttribute('stroke', color.toUpperCase())
  })
})
