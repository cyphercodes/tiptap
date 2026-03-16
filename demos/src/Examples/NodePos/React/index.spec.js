import { expect,test } from '@playwright/test'

test.describe('/src/Examples/NodePos/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Examples/NodePos/React/')
  })

  test('should get paragraphs', async ({ page }) => {
    await page.locator('button[data-testid="find-paragraphs"]').click()
    await expect(page.locator('div[data-testid="found-nodes"]')).toBeVisible()
    await expect(page.locator('div[data-testid="found-node"]')).toHaveCount(16)
  })

  test('should get list items', async ({ page }) => {
    await page.locator('button[data-testid="find-listitems"]').click()
    await expect(page.locator('div[data-testid="found-nodes"]')).toBeVisible()
    await expect(page.locator('div[data-testid="found-node"]')).toHaveCount(12)
  })

  test('should get bullet lists', async ({ page }) => {
    await page.locator('button[data-testid="find-bulletlists"]').click()
    await expect(page.locator('div[data-testid="found-nodes"]')).toBeVisible()
    await expect(page.locator('div[data-testid="found-node"]')).toHaveCount(3)
  })

  test('should get ordered lists', async ({ page }) => {
    await page.locator('button[data-testid="find-orderedlists"]').click()
    await expect(page.locator('div[data-testid="found-nodes"]')).toBeVisible()
    await expect(page.locator('div[data-testid="found-node"]')).toHaveCount(1)
  })

  test('should get blockquotes', async ({ page }) => {
    await page.locator('button[data-testid="find-blockquotes"]').click()
    await expect(page.locator('div[data-testid="found-nodes"]')).toBeVisible()
    await expect(page.locator('div[data-testid="found-node"]')).toHaveCount(3)
  })

  test('should get images', async ({ page }) => {
    await page.locator('button[data-testid="find-images"]').click()
    await expect(page.locator('div[data-testid="found-nodes"]')).toBeVisible()
    await expect(page.locator('div[data-testid="found-node"]')).toHaveCount(4)
  })

  test('should get first blockquote', async ({ page }) => {
    await page.locator('button[data-testid="find-first-blockquote"]').click()
    await expect(page.locator('div[data-testid="found-nodes"]')).toBeVisible()
    await expect(page.locator('div[data-testid="found-node"]')).toHaveCount(1)
    await expect(page.locator('div[data-testid="found-node"]')).toContainText(
      'Here we have a paragraph inside a blockquote.',
    )
    await expect(page.locator('div[data-testid="found-node"]')).not.toContainText(
      'Here we have another paragraph inside a blockquote.',
    )
  })

  test.describe('when querying by attribute', () => {
    test('should get square image', async ({ page }) => {
      await page.locator('button[data-testid="find-squared-image"]').click()
      await expect(page.locator('div[data-testid="found-nodes"]')).toBeVisible()
      await expect(page.locator('div[data-testid="found-node"]')).toHaveCount(1)
      await expect(page.locator('div[data-testid="found-node"]')).toContainText('https://placehold.co/200x200')
    })

    test('should get landsape image', async ({ page }) => {
      await page.locator('button[data-testid="find-landscape-image"]').click()
      await expect(page.locator('div[data-testid="found-nodes"]')).toBeVisible()
      await expect(page.locator('div[data-testid="found-node"]')).toHaveCount(1)
      await expect(page.locator('div[data-testid="found-node"]')).toContainText('https://placehold.co/260x200')
    })

    test('should get all landscape images', async ({ page }) => {
      await page.locator('button[data-testid="find-all-landscape-images"]').click()
      await expect(page.locator('div[data-testid="found-nodes"]')).toBeVisible()
      await expect(page.locator('div[data-testid="found-node"]')).toHaveCount(2)
      await expect(page.locator('div[data-testid="found-node"]').nth(0)).toContainText('https://placehold.co/260x200')
      await expect(page.locator('div[data-testid="found-node"]').nth(1)).toContainText('https://placehold.co/260x200')
    })

    test('should get first landscape image with querySelectorAll', async ({ page }) => {
      await page.locator('button[data-testid="find-first-landscape-image-with-all-query"]').click()
      await expect(page.locator('div[data-testid="found-nodes"]')).toBeVisible()
      await expect(page.locator('div[data-testid="found-node"]')).toHaveCount(1)
      await expect(page.locator('div[data-testid="found-node"]')).toContainText('https://placehold.co/260x200')
    })

    test('should get portrait image inside blockquote', async ({ page }) => {
      await page.locator('button[data-testid="find-portrait-image-inside-blockquote"]').click()
      await expect(page.locator('div[data-testid="found-nodes"]')).toBeVisible()
      await expect(page.locator('div[data-testid="found-node"]')).toHaveCount(1)
      await expect(page.locator('div[data-testid="found-node"]')).toContainText('https://placehold.co/100x200')
    })
  })

  test('should find complex nodes', async ({ page }) => {
    await page.locator('button[data-testid="find-first-node"]').click()
    await expect(page.locator('div[data-testid="found-nodes"]')).toBeVisible()
    await expect(page.locator('div[data-testid="found-node"]')).toHaveCount(1)
    await expect(page.locator('div[data-testid="found-node"]')).toContainText('heading')
    await expect(page.locator('div[data-testid="found-node"]')).toContainText('{"level":1}')

    await page.locator('button[data-testid="find-last-node"]').click()
    await expect(page.locator('div[data-testid="found-nodes"]')).toBeVisible()
    await expect(page.locator('div[data-testid="found-node"]')).toHaveCount(1)
    await expect(page.locator('div[data-testid="found-node"]')).toContainText('image')

    await page.locator('button[data-testid="find-last-node-of-first-bullet-list"]').click()
    await expect(page.locator('div[data-testid="found-nodes"]')).toBeVisible()
    await expect(page.locator('div[data-testid="found-node"]')).toHaveCount(1)
    await expect(page.locator('div[data-testid="found-node"]')).toContainText('listItem')
    await expect(page.locator('div[data-testid="found-node"]')).toContainText('Unsorted 3')
  })

  test('should not find nodes that do not exist in document', async ({ page }) => {
    await page.locator('button[data-testid="find-nonexistent-node"]').click()
    await expect(page.locator('div[data-testid="found-nodes"]')).toHaveCount(0)
    await expect(page.locator('div[data-testid="found-node"]')).toHaveCount(0)
  })
})
