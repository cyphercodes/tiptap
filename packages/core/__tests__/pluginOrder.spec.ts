import { describe, expect, it } from 'vitest'

import Document from '../../extension-document/src/index.js'
import Paragraph from '../../extension-paragraph/src/index.js'
import Text from '../../extension-text/src/index.js'
import { Editor, Extension } from '../src/index.js'

describe('pluginOrder', () => {
  it('should run keyboard shortcuts in correct order', () => {
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
          priority: 1000,
          addKeyboardShortcuts() {
            return {
              a: () => {
                order.push(1)

                return false
              },
            }
          },
        }),
        Extension.create({
          addKeyboardShortcuts() {
            return {
              a: () => {
                order.push(3)

                return false
              },
            }
          },
        }),
        Extension.create({
          addKeyboardShortcuts() {
            return {
              a: () => {
                order.push(2)

                return false
              },
            }
          },
        }),
      ],
    })

    // Simulate keydown event for 'a'
    const event = new KeyboardEvent('keydown', { key: 'a', bubbles: true })

    editor.view.dom.dispatchEvent(event)

    expect(order).toEqual([1, 2, 3])

    editor.destroy()
  })
})
