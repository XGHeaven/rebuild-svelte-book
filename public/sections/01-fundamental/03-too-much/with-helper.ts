import { element, text, insert, append, setText, remove } from 'helper'

function createBlock(target: HTMLElement, anchor: HTMLElement, ctx: { name: string }) {
  const div = element('div')
  const text1 = text('Hi ')
  const text2 = text(ctx.name)
  const text3 = text(':\n[假设这里有上千静态文字内容]\nThanks')
  append(div, text1)
  append(div, text2)
  append(div, text3)
  return {
    mount() {
      insert(target, div, anchor)
    },
    update(ctx: { name: string }) {
      setText(text2, ctx.name)
    },
    destroy() {
      remove(div)
    },
  }
}
