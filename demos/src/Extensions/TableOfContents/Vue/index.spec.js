import { test } from '@playwright/test'

test.describe('/src/Extensions/TableOfContents/Vue', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Extensions/TableOfContents/Vue')
  })

  // TODO: Write tests
})
