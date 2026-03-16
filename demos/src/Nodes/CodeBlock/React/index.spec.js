import { expect,test } from '@playwright/test'

test.describe('/src/Nodes/CodeBlock/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Nodes/CodeBlock/React/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<p>Example Text</p>')
    })
    await page.keyboard.press('Control+a')
  })

  test('should parse code blocks correctly', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.setContent('<pre><code>Example Text</code></pre>')
    })
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<pre><code>Example Text</code></pre>',
    )
  })

  test('should parse code blocks with language correctly', async ({ page }) => {
    await page.evaluate(() => {
      document
        .querySelector('.tiptap')
        .editor.commands.setContent('<pre><code class="language-css">Example Text</code></pre>')
    })
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<pre><code class="language-css">Example Text</code></pre>',
    )
  })

  test('the button should make the selected line a code block', async ({ page }) => {
    await page.locator('button').first().click()

    await expect(page.locator('.tiptap pre')).toContainText('Example Text')
  })

  test('the button should toggle the code block', async ({ page }) => {
    await page.locator('button').first().click()

    await expect(page.locator('.tiptap pre')).toContainText('Example Text')

    await page.keyboard.press('Control+a')

    await page.locator('button').first().click()

    await expect(page.locator('.tiptap pre')).toHaveCount(0)
  })

  test('the keyboard shortcut should make the selected line a code block', async ({ page }) => {
    await page.keyboard.press('Control+Alt+c')
    await expect(page.locator('.tiptap pre')).toContainText('Example Text')
  })

  test('the keyboard shortcut should toggle the code block', async ({ page }) => {
    await page.keyboard.press('Control+Alt+c')
    await expect(page.locator('.tiptap pre')).toContainText('Example Text')

    await page.keyboard.press('Control+a')
    await page.keyboard.press('Control+Alt+c')

    await expect(page.locator('.tiptap pre')).toHaveCount(0)
  })

  test('should parse the language from a HTML code block', async ({ page }) => {
    await page.evaluate(() => {
      document
        .querySelector('.tiptap')
        .editor.commands.setContent('<pre><code class="language-css">body { display: none; }</code></pre>')
    })

    await expect(page.locator('.tiptap pre>code.language-css')).toHaveCount(1)
  })

  test('should make a code block from backtick markdown shortcuts', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })

    await page.locator('.tiptap').pressSequentially('``` Code')
    await expect(page.locator('.tiptap pre>code')).toContainText('Code')
  })

  test('should make a code block from tilde markdown shortcuts', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })

    await page.locator('.tiptap').pressSequentially('~~~ Code')
    await expect(page.locator('.tiptap pre>code')).toContainText('Code')
  })

  test('should make a code block for js with backticks', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })

    await page.locator('.tiptap').pressSequentially('```js Code')
    await expect(page.locator('.tiptap pre>code.language-js')).toContainText('Code')
  })

  test('should make a code block for js with tildes', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })

    await page.locator('.tiptap').pressSequentially('~~~js Code')
    await expect(page.locator('.tiptap pre>code.language-js')).toContainText('Code')
  })

  test('should make a code block from backtick markdown shortcuts followed by enter', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })

    await page.locator('.tiptap').pressSequentially('```')
    await page.keyboard.press('Enter')
    await page.locator('.tiptap').pressSequentially('Code')
    await expect(page.locator('.tiptap pre>code')).toContainText('Code')
  })

  test('reverts the markdown shortcut when pressing backspace', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })

    await page.locator('.tiptap').pressSequentially('``` ')
    await page.keyboard.press('Backspace')

    await expect(page.locator('.tiptap pre')).toHaveCount(0)
  })

  test('removes the code block when pressing backspace', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })

    await expect(page.locator('.tiptap pre')).toHaveCount(0)

    await page.locator('.tiptap').pressSequentially('Paragraph')
    await page.keyboard.press('Enter')
    await page.locator('.tiptap').pressSequentially('``` A')
    await page.keyboard.press('Backspace')
    await page.keyboard.press('Backspace')

    await expect(page.locator('.tiptap pre')).toHaveCount(0)
  })

  test('removes the code block when pressing backspace, even with blank lines', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })

    await expect(page.locator('.tiptap pre')).toHaveCount(0)

    await page.locator('.tiptap').pressSequentially('Paragraph')
    await page.keyboard.press('Enter')
    await page.keyboard.press('Enter')
    await page.locator('.tiptap').pressSequentially('``` A')
    await page.keyboard.press('Backspace')
    await page.keyboard.press('Backspace')

    await expect(page.locator('.tiptap pre')).toHaveCount(0)
  })

  test('removes the code block when pressing backspace, even at start of document', async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector('.tiptap').editor.commands.clearContent()
    })

    await expect(page.locator('.tiptap pre')).toHaveCount(0)

    await page.locator('.tiptap').pressSequentially('``` A')
    await page.keyboard.press('ArrowLeft')
    await page.keyboard.press('Backspace')

    await expect(page.locator('.tiptap pre')).toHaveCount(0)
  })
})
