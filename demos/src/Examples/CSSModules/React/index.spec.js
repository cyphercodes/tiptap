import { expect,test } from '@playwright/test'

test.describe('/src/Examples/CSSModules/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Examples/CSSModules/React/')
  })

  test('should apply a randomly generated class that adds padding and background color to the toolbar', async ({
    page,
  }) => {
    await expect(page.locator('.toolbar')).toBeVisible()
    await expect(page.locator('.toolbar')).toHaveCSS('background-color', 'rgb(255, 0, 0)')
    await expect(page.locator('.toolbar')).toHaveCSS('padding', '16px')
  })
})
