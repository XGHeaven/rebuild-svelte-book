import { element, text, insert, append, setText, remove } from 'helper'

function createBlock(target: HTMLElement, anchor: HTMLElement | null, ctx: { a: number; b: number }) {
  const div = element('div')
  const text1 = text(`${ctx.a}`)
  const text2 = text(':')
  const text3 = text(`${ctx.b}`)
  append(div, text1)
  append(div, text2)
  append(div, text3)
  return {
    mount() {
      insert(target, div, anchor)
    },
    update(ctx: { a: number; b: number }, changed: string[]) {
      if (changed.includes('a')) {
        setText(text1, `${ctx.a}`)
      }
      if (changed.includes('b')) {
        setText(text3, `${ctx.b}`)
      }
    },
    destroy() {
      remove(div)
    },
  }
}

let a = 0
let b = 0

const block = createBlock(document.body, null, { a, b })
block.mount()

setTimeout(() => {
  const changed: string[] = []

  a = 1
  changed.push('a')

  block.update({ a, b }, changed)
}, 1000)
