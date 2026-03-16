import { expect, test } from '@playwright/test'

test.describe('/src/Commands/InsertContent/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Commands/InsertContent/React/')
    await page.keyboard.press('Control+a')
    await page.keyboard.press('Backspace')
  })

  test('should insert html content correctly', async ({ page }) => {
    await page.locator('button[data-test-id="html-content"]').click()

    // check if the content html is correct
    expect(await page.locator('.tiptap').innerHTML()).toContain(
      '<h1><a target="_blank" rel="noopener noreferrer nofollow" href="https://tiptap.dev/">Tiptap</a></h1><p><strong>Hello World</strong></p><p>This is a paragraph<br>with a break.</p><p>And this is some additional string content.</p>',
    )
  })

  test('should keep spaces inbetween tags in html content', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.insertContent(val)
    }, '<p><b>Hello</b> <i>World</i></p>')
    expect(await page.locator('.tiptap').innerHTML()).toContain('<p><strong>Hello</strong> <em>World</em></p>')
  })

  test('should keep empty spaces', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.insertContent(val)
    }, '  ')
    expect(await page.locator('.tiptap').innerHTML()).toContain('<p>  </p>')
  })

  test('should insert text content correctly', async ({ page }) => {
    await page.locator('button[data-test-id="text-content"]').click()

    // check if the content html is correct
    expect(await page.locator('.tiptap').innerHTML()).toContain(
      'Hello World\nThis is content with a new line. Is this working?\n\nLets see if multiple new lines are inserted correctly',
    )
  })

  test('should keep newlines in pre tag', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.insertContent(val)
    }, '<pre><code>foo\nbar</code></pre>')
    expect(await page.locator('.tiptap').innerHTML()).toContain('<pre><code>foo\nbar</code></pre>')
  })

  test('should keep newlines and tabs', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.insertContent(val)
    }, '<p>Hello\n\tworld\n\t\thow\n\t\t\tnice.\ntest\tOK</p>')
    expect(await page.locator('.tiptap').innerHTML()).toContain('<p>Hello\n\tworld\n\t\thow\n\t\t\tnice.\ntest\tOK</p>')
  })

  test('should keep newlines and tabs between tags', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.insertContent(val)
    }, '<h1>Tiptap</h1>\n<p><strong>Hello World</strong></p>')
    expect(await page.locator('.tiptap').innerHTML()).toContain('<h1>Tiptap</h1><p><strong>Hello World</strong></p>')
  })

  test('should allow inserting nothing', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.insertContent(val)
    }, '')
    expect(await page.locator('.tiptap').innerHTML()).toContain('')
  })

  test('should allow inserting a partial HTML tag', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.insertContent(val)
    }, '<p>foo')
    expect(await page.locator('.tiptap').innerHTML()).toContain('<p>foo</p>')
  })

  test('should allow inserting an incomplete HTML tag', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.insertContent(val)
    }, 'foo<p')
    expect(await page.locator('.tiptap').innerHTML()).toContain('<p>foo&lt;p</p>')
  })

  test('should allow inserting a list', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.insertContent(val)
    }, '<ul><li>ABC</li><li>123</li></ul>')
    expect(await page.locator('.tiptap').innerHTML()).toContain('<ul><li><p>ABC</p></li><li><p>123</p></li></ul>')
  })

  test('should remove newlines and tabs when parseOptions.preserveWhitespace=false', async ({ page }) => {
    await page.evaluate(
      val => {
        document.querySelector('.tiptap').editor.commands.insertContent(val[0], val[1])
      },
      [
        '\n<h1>Tiptap</h1><p><strong>Hello\n World</strong>\n</p>\n',
        {
          parseOptions: { preserveWhitespace: false },
        },
      ],
    )
    expect(await page.locator('.tiptap').innerHTML()).toContain('<h1>Tiptap</h1><p><strong>Hello World</strong></p>')
  })

  test('should split content when image is inserted inbetween text', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.insertContent(val)
    }, '<p>HelloWorld</p>')
    await page.evaluate(p => {
      document.querySelector('.tiptap').editor.commands.setTextSelection(p)
    }, 6)
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.insertContent(val)
    }, '<img src="https://example.image/1" alt="This is an example" />')
    expect(await page.locator('.tiptap').innerHTML()).toContain(
      '<p>Hello</p><img src="https://example.image/1" alt="This is an example" contenteditable="false" draggable="true"><p>World</p>',
    )
  })

  test('should not split content when image is inserted at beginning of text', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.insertContent(val)
    }, '<p>HelloWorld</p>')
    await page.evaluate(p => {
      document.querySelector('.tiptap').editor.commands.setTextSelection(p)
    }, 1)
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.insertContent(val)
    }, '<img src="https://example.image/1" alt="This is an example" />')
    expect(await page.locator('.tiptap').innerHTML()).toContain(
      '<img src="https://example.image/1" alt="This is an example" contenteditable="false" draggable="true"><p>HelloWorld</p>',
    )
  })

  test('should respect editor.options.parseOptions if defined to be `false`', async ({ page }) => {
    await page.evaluate(
      v => {
        document.querySelector('.tiptap').editor.options.parseOptions = v
      },
      { preserveWhitespace: false },
    )
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.insertContent(val)
    }, '\n<h1>Tiptap</h1><p><strong>Hello\n World</strong>\n</p>\n')
    expect(await page.locator('.tiptap').innerHTML()).toContain('<h1>Tiptap</h1><p><strong>Hello World</strong></p>')
  })

  test('should respect editor.options.parseOptions if defined to be `full`', async ({ page }) => {
    await page.evaluate(
      v => {
        document.querySelector('.tiptap').editor.options.parseOptions = v
      },
      { preserveWhitespace: 'full' },
    )
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.insertContent(val)
    }, '\n<h1>Tiptap</h1><p><strong>Hello\n World</strong>\n</p>\n')
    expect(await page.locator('.tiptap').innerHTML()).toContain('<h1>Tiptap</h1><p><strong>Hello\n World</strong></p>')
  })

  test('should respect editor.options.parseOptions if defined to be `true`', async ({ page }) => {
    await page.evaluate(
      v => {
        document.querySelector('.tiptap').editor.options.parseOptions = v
      },
      { preserveWhitespace: true },
    )
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.insertContent(val)
    }, '<h1>Tiptap</h1><p><strong>Hello\n World</strong>\n</p>')
    expect(await page.locator('.tiptap').innerHTML()).toContain('<h1>Tiptap</h1><p><strong>Hello  World</strong></p>')
  })
})
