import { expect,test } from '@playwright/test'

test.describe('/src/Examples/Default/Svelte/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Examples/Default/Svelte/')

    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<h1>Example Text</h1>')
    })
    await page.locator('.tiptap').click()
    await page.keyboard.press('Control+a')
  })

  test('should apply the paragraph style when the keyboard shortcut is pressed', async ({ page }) => {
    await expect(page.locator('.tiptap h1')).toBeVisible()

    await page.keyboard.press('Control+Alt+0')
    await expect(page.locator('.tiptap p')).toContainText('Example Text')
  })

  const buttonMarks = [
    { label: 'Bold', tag: 'strong' },
    { label: 'Italic', tag: 'em' },
    { label: 'Strike', tag: 's' },
  ]

  test(`should disable bold, italic, strike when the code tag is enabled for cursor`, async ({ page }) => {
    for (const m of buttonMarks) {
      await page.locator('.tiptap').click()
      await page.keyboard.press('Control+a')
      await page.locator('.tiptap').pressSequentially('Hello world')
      await page.locator('button', { hasText: 'Code' }).click()
      await expect(page.locator('button', { hasText: m.label })).toBeDisabled()
    }
  })

  test(`should enable bold, italic, strike when the code tag is disabled for cursor`, async ({ page }) => {
    for (const m of buttonMarks) {
      await page.locator('.tiptap').click()
      await page.keyboard.press('Control+a')
      await page.locator('.tiptap').pressSequentially('Hello world')
      await page.locator('button', { hasText: 'Code' }).click()
      await page.locator('button', { hasText: 'Code' }).click()
      await expect(page.locator('button', { hasText: m.label })).toBeEnabled()
    }
  })

  test(`should disable bold, italic, strike when the code tag is enabled for selection`, async ({ page }) => {
    for (const m of buttonMarks) {
      await page.locator('.tiptap').click()
      await page.keyboard.press('Control+a')
      await page.keyboard.press('Backspace')
      await page.locator('.tiptap').click()
      await page.keyboard.press('Control+a')
      await page.locator('.tiptap').pressSequentially('Hello world')
      await page.keyboard.press('Control+a')
      await page.locator('button', { hasText: 'Code' }).click()
      await expect(page.locator('button', { hasText: m.label })).toBeDisabled()
    }
  })

  test(`should enable bold, italic, strike when the code tag is disabled for selection`, async ({ page }) => {
    for (const m of buttonMarks) {
      await page.locator('.tiptap').click()
      await page.keyboard.press('Control+a')
      await page.locator('.tiptap').pressSequentially('Hello world')
      await page.keyboard.press('Control+a')
      await page.locator('button', { hasText: 'Code' }).click()
      await page.locator('button', { hasText: 'Code' }).click()
      await expect(page.locator('button', { hasText: m.label })).toBeEnabled()
    }
  })

  test(`should apply bold, italic, strike when the button is pressed`, async ({ page }) => {
    for (const m of buttonMarks) {
      await page.locator('.tiptap').click()
      await page.keyboard.press('Control+a')
      await page.keyboard.press('Backspace')
      await page.locator('.tiptap').click()
      await page.keyboard.press('Control+a')
      await page.locator('.tiptap').pressSequentially('Hello world')
      await page.keyboard.press('Control+a')
      await page.locator('button', { hasText: 'Paragraph' }).click()
      await page.locator('button', { hasText: m.label }).click()
      await expect(page.locator(`.tiptap ${m.tag}`)).toBeVisible()
      await expect(page.locator(`.tiptap ${m.tag}`)).toHaveText('Hello world')
    }
  })

  test('should clear marks when the button is pressed', async ({ page }) => {
    await page.locator('.tiptap').click()
    await page.keyboard.press('Control+a')
    await page.locator('.tiptap').pressSequentially('Hello world')
    await page.locator('button', { hasText: 'Paragraph' }).click()
    await page.locator('.tiptap').click()
    await page.keyboard.press('Control+a')
    await page.locator('button', { hasText: 'Bold' }).click()
    await expect(page.locator('.tiptap strong')).toBeVisible()
    await expect(page.locator('.tiptap strong')).toHaveText('Hello world')
    await page.locator('button', { hasText: 'Clear marks' }).click()
    await expect(page.locator('.tiptap strong')).toHaveCount(0)
  })

  test('should clear nodes when the button is pressed', async ({ page }) => {
    await page.locator('.tiptap').click()
    await page.keyboard.press('Control+a')
    await page.locator('.tiptap').pressSequentially('Hello world')
    await page.locator('button', { hasText: 'Bullet list' }).click()
    await expect(page.locator('.tiptap ul')).toBeVisible()
    await expect(page.locator('.tiptap ul')).toHaveText('Hello world')
    await page.locator('.tiptap').click()
    await page.keyboard.press('Enter')
    await page.locator('.tiptap').pressSequentially('A second item')
    await page.keyboard.press('Enter')
    await page.locator('.tiptap').pressSequentially('A third item')
    await page.keyboard.press('Control+a')
    await page.locator('button', { hasText: 'Clear nodes' }).click()
    await expect(page.locator('.tiptap ul')).toHaveCount(0)
    await expect(page.locator('.tiptap p')).toHaveCount(4)
  })

  const buttonNodes = [
    { label: 'H1', tag: 'h1' },
    { label: 'H2', tag: 'h2' },
    { label: 'H3', tag: 'h3' },
    { label: 'H4', tag: 'h4' },
    { label: 'H5', tag: 'h5' },
    { label: 'H6', tag: 'h6' },
    { label: 'Bullet list', tag: 'ul' },
    { label: 'Ordered list', tag: 'ol' },
    { label: 'Code block', tag: 'pre code' },
    { label: 'Blockquote', tag: 'blockquote' },
  ]

  test(`should set the correct type when the button is pressed`, async ({ page }) => {
    for (const n of buttonNodes) {
      await page.locator('button', { hasText: 'Paragraph' }).click()
      await page.locator('.tiptap').click()
      await page.keyboard.press('Control+a')
      await page.locator('.tiptap').pressSequentially('Hello world')
      await page.keyboard.press('Control+a')

      await page.locator('button', { hasText: n.label }).click()
      await expect(page.locator(`.tiptap ${n.tag}`)).toBeVisible()
      await expect(page.locator(`.tiptap ${n.tag}`)).toHaveText('Hello world')
      await page.locator('button', { hasText: n.label }).click()
      await expect(page.locator(`.tiptap ${n.tag}`)).toHaveCount(0)
    }
  })

  test('should add a hr when on the same line as a node', async ({ page }) => {
    await page.keyboard.press('ArrowRight')
    await page.locator('button', { hasText: 'Horizontal rule' }).click()
    await expect(page.locator('.tiptap hr')).toBeVisible()
    await expect(page.locator('.tiptap h1')).toBeVisible()
  })

  test('should add a hr when on a new line', async ({ page }) => {
    await page.keyboard.press('ArrowRight')
    await page.keyboard.press('Enter')
    await page.locator('button', { hasText: 'Horizontal rule' }).click()
    await expect(page.locator('.tiptap hr')).toBeVisible()
    await expect(page.locator('.tiptap h1')).toBeVisible()
  })

  test('should add a br', async ({ page }) => {
    await page.keyboard.press('ArrowRight')
    await page.locator('button', { hasText: 'Hard break' }).click()
    await expect(page.locator('.tiptap br')).toBeVisible()
  })

  test('should undo', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<h1>Example Text</h1>')
    })

    await page.locator('.tiptap').click()
    await page.keyboard.press('Control+a')
    await page.keyboard.press('Backspace')
    await page.waitForTimeout(500)

    await page.locator('button', { hasText: 'Undo' }).click()
    await expect(page.locator('.tiptap')).toContainText('Example Text')
  })

  test('should redo', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<h1>Example Text</h1>')
    })

    await page.waitForTimeout(500)

    await page.locator('.tiptap').click()
    await page.keyboard.press('Control+a')
    await page.keyboard.press('Backspace')
    await page.locator('button', { hasText: 'Undo' }).click()
    await expect(page.locator('.tiptap')).toContainText('Example Text')
    await page.locator('button', { hasText: 'Redo' }).click()
    await expect(page.locator('.tiptap')).not.toContainText('Example Text')
  })
})
