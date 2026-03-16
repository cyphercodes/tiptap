import { test } from '@playwright/test'

test.describe('/src/Nodes/TaskItem/Vue/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Nodes/TaskItem/Vue/')
  })

  // TODO: Write tests
})
