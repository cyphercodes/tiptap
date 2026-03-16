import { describe, expect, it } from 'vitest'

import Document from '../../extension-document/src/index.js'
import Paragraph from '../../extension-paragraph/src/index.js'
import Text from '../../extension-text/src/index.js'
import { Editor, Extension } from '../src/index.js'

describe('transformPastedHTML', () => {
  it('should run transforms in correct priority order (higher priority first)', () => {
    const order: number[] = []

    const element = document.createElement('div')

    document.body.append(element)

    const editor = new Editor({
      element,
      extensions: [
        Document,
        Paragraph,
        Text,
        Extension.create({
          name: 'extension1',
          priority: 100,
          transformPastedHTML(html) {
            order.push(2)
            return html
          },
        }),
        Extension.create({
          name: 'extension2',
          priority: 200,
          transformPastedHTML(html) {
            order.push(1)
            return html
          },
        }),
        Extension.create({
          name: 'extension3',
          priority: 50,
          transformPastedHTML(html) {
            order.push(3)
            return html
          },
        }),
      ],
    })

    // Manually trigger the transform
    editor.view.props.transformPastedHTML?.('<p>test</p>')

    expect(order).toEqual([1, 2, 3])

    editor.destroy()
  })

  it('should chain transforms correctly', () => {
    const element = document.createElement('div')

    document.body.append(element)

    const editor = new Editor({
      element,
      extensions: [
        Document,
        Paragraph,
        Text,
        Extension.create({
          name: 'replaceFoo',
          priority: 100,
          transformPastedHTML(html) {
            return html.replace(/foo/g, 'bar')
          },
        }),
        Extension.create({
          name: 'replaceBar',
          priority: 90,
          transformPastedHTML(html) {
            return html.replace(/bar/g, 'baz')
          },
        }),
      ],
    })

    const result = editor.view.props.transformPastedHTML?.('<p>foo</p>')

    // First transform: foo -> bar (priority 100)
    // Second transform: bar -> baz (priority 90)
    expect(result).toBe('<p>baz</p>')

    editor.destroy()
  })

  it('should integrate with baseTransform from editorProps', () => {
    const element = document.createElement('div')

    document.body.append(element)

    const editor = new Editor({
      element,
      editorProps: {
        transformPastedHTML(html) {
          return html.replace(/base/g, 'replaced')
        },
      },
      extensions: [
        Document,
        Paragraph,
        Text,
        Extension.create({
          name: 'extensionTransform',
          transformPastedHTML(html) {
            return html.replace(/replaced/g, 'final')
          },
        }),
      ],
    })

    const result = editor.view.props.transformPastedHTML?.('<p>base</p>')

    // Base transform runs first: base -> replaced
    // Extension transform runs second: replaced -> final
    expect(result).toBe('<p>final</p>')

    editor.destroy()
  })

  it('should handle extensions without transforms', () => {
    const element = document.createElement('div')

    document.body.append(element)

    const editor = new Editor({
      element,
      extensions: [
        Document,
        Paragraph,
        Text,
        Extension.create({
          name: 'noTransform',
          // No transformPastedHTML defined
        }),
        Extension.create({
          name: 'withTransform',
          transformPastedHTML(html) {
            return html.replace(/test/g, 'success')
          },
        }),
      ],
    })

    const result = editor.view.props.transformPastedHTML?.('<p>test</p>')

    // Should still work even with extensions that don't define transformPastedHTML
    expect(result).toBe('<p>success</p>')

    editor.destroy()
  })

  it('should return original HTML if no transforms are defined', () => {
    const element = document.createElement('div')

    document.body.append(element)

    const editor = new Editor({
      element,
      extensions: [
        Document,
        Paragraph,
        Text,
        Extension.create({
          name: 'noTransform1',
        }),
        Extension.create({
          name: 'noTransform2',
        }),
      ],
    })

    const result = editor.view.props.transformPastedHTML?.('<p>unchanged</p>')

    expect(result).toBe('<p>unchanged</p>')

    editor.destroy()
  })

  it('should have access to extension context', () => {
    const element = document.createElement('div')

    document.body.append(element)

    let capturedContext: any = null

    const editor = new Editor({
      element,
      extensions: [
        Document,
        Paragraph,
        Text,
        Extension.create({
          name: 'contextChecker',
          addOptions() {
            return {
              testOption: 'testValue',
            }
          },
          transformPastedHTML(html) {
            capturedContext = {
              name: this.name,
              hasOptions: !!this.options,
              hasEditor: !!this.editor,
              hasStorage: this.storage !== undefined,
            }
            return html
          },
        }),
      ],
    })

    editor.view.props.transformPastedHTML?.('<p>test</p>')

    expect(capturedContext).toEqual({
      name: 'contextChecker',
      hasOptions: true,
      hasEditor: true,
      hasStorage: true,
    })

    editor.destroy()
  })

  it('should work with multiple transforms modifying HTML structure', () => {
    const element = document.createElement('div')

    document.body.append(element)

    const editor = new Editor({
      element,
      extensions: [
        Document,
        Paragraph,
        Text,
        Extension.create({
          name: 'removeStyles',
          priority: 100,
          transformPastedHTML(html) {
            return html.replace(/\s+style="[^"]*"/gi, '')
          },
        }),
        Extension.create({
          name: 'addClass',
          priority: 90,
          transformPastedHTML(html) {
            return html.replace(/<p>/g, '<p class="clean">')
          },
        }),
      ],
    })

    const result = editor.view.props.transformPastedHTML?.('<p style="color: red;">test</p>')

    expect(result).toBe('<p class="clean">test</p>')

    editor.destroy()
  })

  it('should handle empty HTML', () => {
    const element = document.createElement('div')

    document.body.append(element)

    const editor = new Editor({
      element,
      extensions: [
        Document,
        Paragraph,
        Text,
        Extension.create({
          name: 'transform',
          transformPastedHTML(html) {
            return html || '<p>default</p>'
          },
        }),
      ],
    })

    const result = editor.view.props.transformPastedHTML?.('')

    expect(result).toBe('<p>default</p>')

    editor.destroy()
  })

  it('should handle view parameter being passed through', () => {
    const element = document.createElement('div')

    document.body.append(element)

    let viewPassed = false

    const editor = new Editor({
      element,
      editorProps: {
        transformPastedHTML(html, view) {
          viewPassed = !!view
          return html
        },
      },
      extensions: [Document, Paragraph, Text],
    })

    editor.view.props.transformPastedHTML?.('<p>test</p>', editor.view)

    expect(viewPassed).toBe(true)

    editor.destroy()
  })
})
