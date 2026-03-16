import { test } from '@playwright/test'

test.describe('/src/GuideGettingStarted/VModel/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/GuideGettingStarted/VModel/Vue/')
  })

  // TODO: Write tests
})
