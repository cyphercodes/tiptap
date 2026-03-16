import { expect,test } from '@playwright/test'

test.describe('/src/Commands/SetContent/React/', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/Commands/SetContent/React/')
  })

  test.beforeEach(async ({ page }) => {
    await page.keyboard.press('Control+a')
    await page.keyboard.press('Backspace')
  })

  test('should insert raw text content', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, 'Hello World.')
    expect(await page.locator('.tiptap').innerHTML()).toContain('<p>Hello World.</p>')
  })

  test('should insert raw JSON content', async ({ page }) => {
    await page.evaluate(
      val => {
        document.querySelector('.tiptap').editor.commands.setContent(val)
      },
      { type: 'paragraph', content: [{ type: 'text', text: 'Hello World.' }] },
    )
    expect(await page.locator('.tiptap').innerHTML()).toContain('<p>Hello World.</p>')
  })

  test('should insert a Prosemirror Node as content', async ({ page }) => {
    await page.evaluate(() => {
      const editor = document.querySelector('.tiptap').editor
      editor.commands.setContent(editor.schema.node('paragraph', null, editor.schema.text('Hello World.')))
    })
    expect(await page.locator('.tiptap').innerHTML()).toContain('<p>Hello World.</p>')
  })

  test('should insert a Prosemirror Fragment as content', async ({ page }) => {
    await page.evaluate(() => {
      const editor = document.querySelector('.tiptap').editor
      editor.commands.setContent(
        editor.schema.node('doc', null, editor.schema.node('paragraph', null, editor.schema.text('Hello World.')))
          .content,
      )
    })
    expect(await page.locator('.tiptap').innerHTML()).toContain('<p>Hello World.</p>')
  })

  test('should emit updates', async ({ page }) => {
    const result = await page.evaluate(() => {
      const editor = document.querySelector('.tiptap').editor
      let updateCount = 0
      const callback = () => {
        updateCount += 1
      }

      editor.on('update', callback)
      // emit an update
      editor.commands.setContent('Hello World.', { emitUpdate: true })
      const afterEmit = updateCount

      updateCount = 0
      // do not emit an update
      editor.commands.setContent('Hello World again.', { emitUpdate: false })
      const afterNoEmit = updateCount
      editor.off('update', callback)

      return { afterEmit, afterNoEmit }
    })
    expect(result.afterEmit).toBe(1)
    expect(result.afterNoEmit).toBe(0)
  })

  test('should insert more complex html content', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<h1>Welcome to Tiptap</h1><p>This is a paragraph.</p><ul><li><p>List Item A</p></li><li><p>List Item B</p><ul><li><p>Subchild</p></li></ul></li></ul>')
    expect(await page.locator('.tiptap').innerHTML()).toContain(
      '<h1>Welcome to Tiptap</h1><p>This is a paragraph.</p><ul><li><p>List Item A</p></li><li><p>List Item B</p><ul><li><p>Subchild</p></li></ul></li></ul>',
    )
  })

  test('should remove newlines and tabs', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p>Hello\n\tworld\n\t\thow\n\t\t\tnice.</p>')
    expect(await page.locator('.tiptap').innerHTML()).toContain('<p>Hello world how nice.</p>')
  })

  test('should keep newlines and tabs when preserveWhitespace = full', async ({ page }) => {
    await page.evaluate(
      val => {
        document.querySelector('.tiptap').editor.commands.setContent(val[0], val[1])
      },
      [
        '<p>Hello\n\tworld\n\t\thow\n\t\t\tnice.</p>',
        {
          parseOptions: { preserveWhitespace: 'full' },
        },
      ],
    )
    expect(await page.locator('.tiptap').innerHTML()).toContain('<p>Hello\n\tworld\n\t\thow\n\t\t\tnice.</p>')
  })

  test('should overwrite existing content', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p>Initial Content</p>')
    expect(await page.locator('.tiptap').innerHTML()).toContain('<p>Initial Content</p>')

    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p>Overwritten Content</p>')
    expect(await page.locator('.tiptap').innerHTML()).toContain('<p>Overwritten Content</p>')

    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, 'Content without tags')
    expect(await page.locator('.tiptap').innerHTML()).toContain('<p>Content without tags</p>')
  })

  test('should insert mentions', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p><span data-type="mention" data-id="1" data-label="John Doe">@John Doe</span></p>')
    expect(await page.locator('.tiptap').innerHTML()).toContain(
      '<span data-type="mention" data-id="1" data-label="John Doe" data-mention-suggestion-char="@" contenteditable="false">@John Doe</span>',
    )
  })

  test('should remove newlines and tabs between html fragments', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<h1>Tiptap</h1>\n\t<p><strong>Hello World</strong></p>')
    expect(await page.locator('.tiptap').innerHTML()).toContain('<h1>Tiptap</h1><p><strong>Hello World</strong></p>')
  })

  // TODO I'm not certain about this behavior and what it should do...
  // This exists in insertContentAt as well
  test('should keep newlines and tabs between html fragments when preserveWhitespace = full', async ({ page }) => {
    await page.evaluate(
      val => {
        document.querySelector('.tiptap').editor.commands.setContent(val[0], val[1])
      },
      [
        '<h1>Tiptap</h1>\n\t<p><strong>Hello World</strong></p>',
        {
          parseOptions: {
            preserveWhitespace: 'full',
          },
        },
      ],
    )
    expect(await page.locator('.tiptap').innerHTML()).toContain(
      '<h1>Tiptap</h1><p>\n\t</p><p><strong>Hello World</strong></p>',
    )
  })

  test('should allow inserting nothing', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '')
    expect(await page.locator('.tiptap').innerHTML()).toContain('')
  })

  test('should allow inserting nothing when preserveWhitespace = full', async ({ page }) => {
    await page.evaluate(
      val => {
        document.querySelector('.tiptap').editor.commands.setContent(val[0], val[1])
      },
      ['', { parseOptions: { preserveWhitespace: 'full' } }],
    )
    expect(await page.locator('.tiptap').innerHTML()).toContain('')
  })

  test('should allow inserting a partial HTML tag', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<p>foo')
    expect(await page.locator('.tiptap').innerHTML()).toContain('<p>foo</p>')
  })

  test('should allow inserting a partial HTML tag when preserveWhitespace = full', async ({ page }) => {
    await page.evaluate(
      val => {
        document.querySelector('.tiptap').editor.commands.setContent(val[0], val[1])
      },
      ['<p>foo', { parseOptions: { preserveWhitespace: 'full' } }],
    )
    expect(await page.locator('.tiptap').innerHTML()).toContain('<p>foo</p>')
  })

  test('will remove an incomplete HTML tag', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, 'foo<p')
    expect(await page.locator('.tiptap').innerHTML()).toContain('<p>foo</p>')
  })

  // TODO I'm not certain about this behavior and what it should do...
  // This exists in insertContentAt as well
  test('should allow inserting an incomplete HTML tag when preserveWhitespace = full', async ({ page }) => {
    await page.evaluate(
      val => {
        document.querySelector('.tiptap').editor.commands.setContent(val[0], val[1])
      },
      ['foo<p', { parseOptions: { preserveWhitespace: 'full' } }],
    )
    expect(await page.locator('.tiptap').innerHTML()).toContain('<p>foo&lt;p</p>')
  })

  test('should allow inserting a list', async ({ page }) => {
    await page.evaluate(val => {
      document.querySelector('.tiptap').editor.commands.setContent(val)
    }, '<ul><li>ABC</li><li>123</li></ul>')
    expect(await page.locator('.tiptap').innerHTML()).toContain('<ul><li><p>ABC</p></li><li><p>123</p></li></ul>')
  })

  test('should allow inserting a list when preserveWhitespace = full', async ({ page }) => {
    await page.evaluate(
      val => {
        document.querySelector('.tiptap').editor.commands.setContent(val[0], val[1])
      },
      ['<ul><li>ABC</li><li>123</li></ul>', { parseOptions: { preserveWhitespace: 'full' } }],
    )
    expect(await page.locator('.tiptap').innerHTML()).toContain('<ul><li><p>ABC</p></li><li><p>123</p></li></ul>')
  })

  test('should remove newlines and tabs when parseOptions.preserveWhitespace=false', async ({ page }) => {
    await page.evaluate(
      val => {
        document.querySelector('.tiptap').editor.commands.setContent(val[0], val[1])
      },
      [
        '\n<h1>Tiptap</h1><p><strong>Hello\n World</strong>\n</p>\n',
        {
          parseOptions: {
            preserveWhitespace: false,
          },
        },
      ],
    )
    expect(await page.locator('.tiptap').innerHTML()).toContain('<h1>Tiptap</h1><p><strong>Hello World</strong></p>')
  })
})
