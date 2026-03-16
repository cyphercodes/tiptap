import { expect, test } from '@playwright/test'

async function paste(page, selector, payload, type = 'text/plain') {
  await page.evaluate(
    ({ sel, data, dataType }) => {
      const el = document.querySelector(sel)
      const clipboardData = new DataTransfer()

      clipboardData.setData(dataType, data)
      el.dispatchEvent(new ClipboardEvent('paste', { bubbles: true, cancelable: true, clipboardData }))
    },
    { sel: selector, data: payload, dataType: type },
  )
}

test.describe('/src/Marks/Link/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Marks/Link/React/')
  })

  test.beforeEach(async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p>Example TextDEFAULT</p>')
    await page.keyboard.press('Control+a')
  })

  test('should parse a tags correctly', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p><a href="https://example.com">Example Text1</a></p>')
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<p><a target="_blank" rel="noopener noreferrer nofollow" href="https://example.com">Example Text1</a></p>',
    )
  })

  test('should parse a tags with target attribute correctly', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p><a href="https://example.com" target="_self">Example Text2</a></p>')
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<p><a target="_self" rel="noopener noreferrer nofollow" href="https://example.com">Example Text2</a></p>',
    )
  })

  test('should parse a tags with rel attribute correctly', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p><a href="https://example.com" rel="follow">Example Text3</a></p>')
    expect(await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())).toBe(
      '<p><a target="_blank" rel="follow" href="https://example.com">Example Text3</a></p>',
    )
  })

  test('the button should add a link to the selected text', async ({ page }) => {
    await page.evaluate(() => {
      window.prompt = () => 'https://tiptap.dev'
    })

    await page.locator('button').first().click()

    await expect(page.locator('.tiptap a')).toContainText('Example TextDEFAULT')
    await expect(page.locator('.tiptap a')).toHaveAttribute('href', 'https://tiptap.dev')
  })

  test('should allow exiting the link once set', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p><a href="https://example.com" target="_self">Example Text2</a></p>')
    await page.keyboard.press('ArrowRight')

    await expect(page.locator('button').first()).not.toHaveClass(/is-active/)
  })

  test('detects autolinking', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('https://example.com ')
    await expect(page.locator('.tiptap a')).toContainText('https://example.com')
    await expect(page.locator('.tiptap a')).toHaveAttribute('href', 'https://example.com')
  })

  test('detects autolinking with numbers', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('https://tiptap4u.com ')
    await expect(page.locator('.tiptap a')).toContainText('https://tiptap4u.com')
    await expect(page.locator('.tiptap a')).toHaveAttribute('href', 'https://tiptap4u.com')
  })

  test('uses the default protocol', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('example.com ')
    await expect(page.locator('.tiptap a')).toContainText('example.com')
    await expect(page.locator('.tiptap a')).toHaveAttribute('href', 'https://example.com')
  })

  test('uses a non-default protocol if present', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('http://example.com ')
    await expect(page.locator('.tiptap a')).toContainText('http://example.com')
    await expect(page.locator('.tiptap a')).toHaveAttribute('href', 'http://example.com')
  })

  test('detects a pasted URL within a text', async ({ page }) => {
    await paste(page, '.tiptap', 'some text https://example1.com around an url', 'text/plain')
    await expect(page.locator('.tiptap a')).toContainText('https://example1.com')
    await expect(page.locator('.tiptap a')).toHaveAttribute('href', 'https://example1.com')
  })

  test('detects a pasted URL', async ({ page }) => {
    await page.keyboard.press('Backspace')
    await paste(page, '.tiptap', 'https://example2.com', 'text/plain')
    await expect(page.locator('.tiptap a')).toContainText('https://example2.com')
    await expect(page.locator('.tiptap a')).toHaveAttribute('href', 'https://example2.com')
  })

  test('detects a pasted URL with query params', async ({ page }) => {
    await page.keyboard.press('Backspace')
    await paste(page, '.tiptap', 'https://example.com?paramA=nice&paramB=cool', 'text/plain')
    await expect(page.locator('.tiptap a')).toContainText('https://example.com?paramA=nice&paramB=cool')
    await expect(page.locator('.tiptap a')).toHaveAttribute('href', 'https://example.com?paramA=nice&paramB=cool')
  })

  test('correctly detects multiple pasted URLs', async ({ page }) => {
    await paste(
      page,
      '.tiptap',
      'https://example1.com, https://example2.com/foobar, (http://example3.com/foobar)',
      'text/plain',
    )

    await expect(page.locator('.tiptap a[href="https://example1.com"]')).toContainText('https://example1.com')

    await expect(page.locator('.tiptap a[href="https://example2.com/foobar"]')).toContainText(
      'https://example2.com/foobar',
    )

    await expect(page.locator('.tiptap a[href="http://example3.com/foobar"]')).toContainText(
      'http://example3.com/foobar',
    )
  })

  test('should not allow links with disallowed protocols', async ({ page }) => {
    const disallowedProtocols = ['ftp://example.com', 'file:///example.txt', 'mailto:test@example.com']

    for (const url of disallowedProtocols) {
      await page.evaluate(val => {
        document.querySelector('.tiptap').editor.commands.setContent(`<p><a href="${val}">Example Text</a></p>`)
      }, url)
      const html = await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())
      expect(html).not.toContain(url)
    }
  })

  test('should not allow links with disallowed domains', async ({ page }) => {
    const disallowedDomains = ['https://example-phishing.com', 'https://malicious-site.net']

    for (const url of disallowedDomains) {
      await page.evaluate(val => {
        document.querySelector('.tiptap').editor.commands.setContent(`<p><a href="${val}">Example Text</a></p>`)
      }, url)
      const html = await page.evaluate(() => document.querySelector('.tiptap').editor.getHTML())
      expect(html).not.toContain(url)
    }
  })

  test('should not auto-link a URL from a disallowed domain', async ({ page }) => {
    await page.locator('.tiptap').pressSequentially('https://example-phishing.com ')
    await expect(page.locator('.tiptap a')).toHaveCount(0)
    await expect(page.locator('.tiptap')).toContainText('https://example-phishing.com')
  })
})
