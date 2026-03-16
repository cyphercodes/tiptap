import { test } from '@playwright/test'

test.describe('/src/Examples/MultipleEditors/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Examples/MultipleEditors/Vue/')
  })

  // TODO: Write tests
})
