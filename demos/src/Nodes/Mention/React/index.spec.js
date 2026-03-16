import { expect,test } from '@playwright/test'

test.describe('/src/Nodes/Mention/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Nodes/Mention/React/')
  })

  test('should insert a mention', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p><span data-type="mention" data-id="1" data-label="John Doe">@John Doe</span></p>')
    expect(await page.locator('.tiptap').innerHTML()).toContain(
      '<span class="mention" data-type="mention" data-id="1" data-label="John Doe" data-mention-suggestion-char="@" contenteditable="false">@John Doe</span>',
    )
  })

  test('should insert multiple mentions', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p><span data-type="mention" data-id="1" data-label="John Doe">@John Doe</span> and <span data-type="mention" data-id="2" data-label="Jane Smith">@Jane Smith</span></p>')
    expect(await page.locator('.tiptap').innerHTML()).toContain(
      '<span class="mention" data-type="mention" data-id="1" data-label="John Doe" data-mention-suggestion-char="@" contenteditable="false">@John Doe</span> and <span class="mention" data-type="mention" data-id="2" data-label="Jane Smith" data-mention-suggestion-char="@" contenteditable="false">@Jane Smith</span>',
    )
  })

  test("should open a dropdown menu when I type '@'", async ({ page }) => {
    await page.keyboard.press('Control+a')
    await page.keyboard.press('Backspace')
    await page.locator('.tiptap').pressSequentially('@')
    await expect(page.locator('.dropdown-menu')).toBeVisible()
  })

  test('should display the correct options in the dropdown menu', async ({ page }) => {
    await page.keyboard.press('Control+a')
    await page.keyboard.press('Backspace')
    await page.locator('.tiptap').pressSequentially('@')
    await expect(page.locator('.dropdown-menu')).toBeVisible()
    await expect(page.locator('.dropdown-menu button')).toHaveCount(5)
    await expect(page.locator('.dropdown-menu button:nth-child(1)')).toContainText('Lea Thompson')
    await expect(page.locator('.dropdown-menu button:nth-child(1)')).toHaveClass(/is-selected/)
    await expect(page.locator('.dropdown-menu button:nth-child(2)')).toContainText('Cyndi Lauper')
    await expect(page.locator('.dropdown-menu button:nth-child(3)')).toContainText('Tom Cruise')
    await expect(page.locator('.dropdown-menu button:nth-child(4)')).toContainText('Madonna')
    await expect(page.locator('.dropdown-menu button:nth-child(5)')).toContainText('Jerry Hall')
  })

  test('should insert Cyndi Lauper mention when clicking on her option', async ({ page }) => {
    await page.keyboard.press('Control+a')
    await page.keyboard.press('Backspace')
    await page.locator('.tiptap').pressSequentially('@')
    await expect(page.locator('.dropdown-menu')).toBeVisible()
    await page.locator('.dropdown-menu button:nth-child(2)', { hasText: 'Cyndi Lauper' }).click()

    expect(await page.locator('.tiptap').innerHTML()).toContain(
      '<span class="mention" data-type="mention" data-id="Cyndi Lauper" data-mention-suggestion-char="@" contenteditable="false">@Cyndi Lauper</span>',
    )
  })

  test('should close the dropdown menu when I move the cursor outside the editor', async ({ page }) => {
    await page.keyboard.press('Control+a')
    await page.keyboard.press('Backspace')
    await page.locator('.tiptap').pressSequentially('@')
    await expect(page.locator('.dropdown-menu')).toBeVisible()
    await page.keyboard.press('Home')
    await expect(page.locator('.dropdown-menu')).toHaveCount(0)
  })

  test('should close the dropdown menu when I press the exit key', async ({ page }) => {
    await page.keyboard.press('Control+a')
    await page.keyboard.press('Backspace')
    await page.locator('.tiptap').pressSequentially('@')
    await expect(page.locator('.dropdown-menu')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.locator('.dropdown-menu')).toHaveCount(0)
  })

  test('should insert Tom Cruise when selecting his option with the arrow keys and pressing the enter key', async ({
    page,
  }) => {
    await page.keyboard.press('Control+a')
    await page.keyboard.press('Backspace')
    await page.locator('.tiptap').pressSequentially('@')
    await expect(page.locator('.dropdown-menu')).toBeVisible()
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')
    await expect(page.locator('.dropdown-menu button:nth-child(3)')).toHaveClass(/is-selected/)
    await page.keyboard.press('Enter')

    expect(await page.locator('.tiptap').innerHTML()).toContain(
      '<span class="mention" data-type="mention" data-id="Tom Cruise" data-mention-suggestion-char="@" contenteditable="false">@Tom Cruise</span>',
    )
  })

  test('should show a "No result" message when I search for an option that is not in the list', async ({ page }) => {
    await page.keyboard.press('Control+a')
    await page.keyboard.press('Backspace')
    await page.locator('.tiptap').pressSequentially('@nonexistent')
    await expect(page.locator('.dropdown-menu')).toBeVisible()
    await expect(page.locator('.dropdown-menu')).toContainText('No result')
  })

  test('should not hide the dropdown or insert any mention if I search for an option that is not in the list and hit enter', async ({
    page,
  }) => {
    await page.keyboard.press('Control+a')
    await page.keyboard.press('Backspace')
    await page.locator('.tiptap').pressSequentially('@nonexistent')
    await expect(page.locator('.dropdown-menu')).toBeVisible()
    await expect(page.locator('.dropdown-menu')).toContainText('No result')
    await page.keyboard.press('Enter')
    await expect(page.locator('.dropdown-menu')).toBeVisible()
    await expect(page.locator('.tiptap')).toHaveText('@nonexistent')
    await expect(page.locator('.tiptap span.mention')).toHaveCount(0)
  })

  test('should only show the Madonna option in the dropdown when I type "@mado"', async ({ page }) => {
    await page.keyboard.press('Control+a')
    await page.keyboard.press('Backspace')
    await page.locator('.tiptap').pressSequentially('@mado')
    await expect(page.locator('.dropdown-menu')).toBeVisible()
    await expect(page.locator('.dropdown-menu button')).toHaveCount(1)
    await expect(page.locator('.dropdown-menu button:nth-child(1)')).toContainText('Madonna')
  })

  test('should insert Madonna when I type "@mado" and hit enter', async ({ page }) => {
    await page.keyboard.press('Control+a')
    await page.keyboard.press('Backspace')
    await page.locator('.tiptap').pressSequentially('@mado')
    await page.keyboard.press('Enter')
    expect(await page.locator('.tiptap').innerHTML()).toContain(
      '<span class="mention" data-type="mention" data-id="Madonna" data-mention-suggestion-char="@" contenteditable="false">@Madonna</span>',
    )
  })
})
