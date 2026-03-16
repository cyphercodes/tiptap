import { expect,test } from '@playwright/test'

test.describe('/src/Marks/TextStyle/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Marks/TextStyle/Vue/')
  })

  test.describe('mergeNestedSpanStyles', () => {
    test('should merge styles of a span with one child span', async ({ page }) => {
      const span = page.locator('.tiptap > p:nth-child(4) > span')
      await expect(span).toHaveCount(1)
      await expect(span).toHaveText('red serif')
      await expect(span).toHaveAttribute('style', 'color: #FF0000; font-family: serif')
    })
    test('should merge styles of a span with one nested child span into the descendant span', async ({ page }) => {
      const span = page.locator('.tiptap > p:nth-child(5) > span')
      await expect(span).toHaveCount(1)
      await expect(span).toHaveText('blue serif')
      await expect(span).toHaveAttribute('style', 'color: #0000FF; font-family: serif')
    })
    test('should merge styles of a span with multiple child spans into all child spans', async ({ page }) => {
      await expect(page.locator('.tiptap > p:nth-child(6) > span')).toHaveCount(2)
      const span1 = page.locator('.tiptap > p:nth-child(6) > span:nth-child(1)')
      await expect(span1).toHaveText('green serif ')
      await expect(span1).toHaveAttribute('style', 'color: #00FF00; font-family: serif')
      const span2 = page.locator('.tiptap > p:nth-child(6) > span:nth-child(2)')
      await expect(span2).toHaveText('red serif')
      await expect(span2).toHaveAttribute('style', 'color: #FF0000; font-family: serif')
    })
    test('should merge styles of descendant spans into each descendant span when the parent span has no style', async ({
      page,
    }) => {
      await expect(page.locator('.tiptap > p:nth-child(7) > span')).toHaveCount(4)
      const span1 = page.locator('.tiptap > p:nth-child(7) > span:nth-child(1)')
      await expect(span1).toHaveText('blue')
      await expect(span1).toHaveAttribute('style', 'color: #0000FF')
      const span2 = page.locator('.tiptap > p:nth-child(7) > span:nth-child(2)')
      await expect(span2).toHaveText('green ')
      await expect(span2).toHaveAttribute('style', 'color: #00FF00')
      const span3 = page.locator('.tiptap > p:nth-child(7) > span:nth-child(3)')
      await expect(span3).toHaveText('green serif')
      await expect(span3).toHaveAttribute('style', 'color: #00FF00; font-family: serif')
    })
    test('should merge styles of a span with nested root text and descendant spans into each descendant span', async ({
      page,
    }) => {
      await expect(page.locator('.tiptap > p:nth-child(8) > span')).toHaveCount(4)
      const span1 = page.locator('.tiptap > p:nth-child(8) > span:nth-child(1)')
      await expect(span1).toHaveText('blue ')
      await expect(span1).toHaveAttribute('style', 'color: #0000FF')
      const span2 = page.locator('.tiptap > p:nth-child(8) > span:nth-child(2)')
      await expect(span2).toHaveText('green ')
      await expect(span2).toHaveAttribute('style', 'color: #00FF00')
      const span3 = page.locator('.tiptap > p:nth-child(8) > span:nth-child(3)')
      await expect(span3).toHaveText('green serif ')
      await expect(span3).toHaveAttribute('style', 'color: #00FF00; font-family: serif')
      const span4 = page.locator('.tiptap > p:nth-child(8) > span:nth-child(4)')
      await expect(span4).toHaveText('blue serif')
      await expect(span4).toHaveAttribute('style', 'color: #0000FF; font-family: serif')
    })
    test('should merge styles of descendant spans into each descendant span when the parent span has other tags', async ({
      page,
    }) => {
      await expect(page.locator('.tiptap > p:nth-child(9) > span')).toHaveCount(4)
      const el1 = page.locator('.tiptap > p:nth-child(9) > :nth-child(1)')
      await expect(el1).toHaveText('strong ')
      expect(await el1.evaluate(el => el.tagName)).toBe('STRONG')
      const span2 = page.locator('.tiptap > p:nth-child(9) > span:nth-child(2)')
      await expect(span2).toHaveText('strong blue ')
      await expect(span2).toHaveAttribute('style', 'color: #0000FF')
      await expect(span2.locator('strong')).toBeVisible()
      const span3 = page.locator('.tiptap > p:nth-child(9) > span:nth-child(3)')
      await expect(span3).toHaveText('strong blue serif ')
      await expect(span3).toHaveAttribute('style', 'color: #0000FF; font-family: serif; font-size: 24px')
      await expect(span3.locator('strong')).toBeVisible()
      const span4 = page.locator('.tiptap > p:nth-child(9) > span:nth-child(4)')
      await expect(span4).toHaveText('strong green ')
      await expect(span4).toHaveAttribute('style', 'color: #00FF00')
      await expect(span4.locator('strong')).toBeVisible()
      const span5 = page.locator('.tiptap > p:nth-child(9) > span:nth-child(5)')
      await expect(span5).toHaveText('strong green serif')
      await expect(span5).toHaveAttribute('style', 'color: #00FF00; font-family: serif')
      await expect(span5.locator('strong')).toBeVisible()
    })
  })
})
