import { element, text, insert, append, setText, remove, attr } from 'helper'

interface ContextValue {
  className: string
  value: string
  dataId: string
  other: string
}

type ContextKeys = keyof ContextValue

function createBlock(target: HTMLElement, anchor: HTMLElement | null, ctx: ContextValue) {
  const input = document.createElement('input')
  attr(input, 'class', ctx.className)
  attr(input, 'value', ctx.value)
  attr(input, 'data-id', ctx.dataId)
  attr(input, 'others', ctx.other)
  return {
    mount() {
      insert(target, input, anchor)
    },
    update(ctx: ContextValue, changed: ContextKeys[]) {
      if (changed.includes('className')) {
        attr(input, 'className', `${ctx.className}`)
      }
      if (changed.includes('value')) {
        attr(input, 'value', `${ctx.value}`)
      }
      if (changed.includes('dataId')) {
        attr(input, 'data-id', `${ctx.dataId}`)
      }
      if (changed.includes('other')) {
        attr(input, 'others', `${ctx.other}`)
      }
    },
    destroy() {
      remove(input)
    },
  }
}

let className = 'a'
let value = 'b'
let dataId = 'id'
let other = 'other'

const block = createBlock(document.body, null, {
  className,
  value,
  dataId,
  other,
})
block.mount()

setTimeout(() => {
  const changed: ContextKeys[] = []

  className = 'a b'
  changed.push('className')

  block.update({ className, value, dataId, other }, changed)
}, 1000)
