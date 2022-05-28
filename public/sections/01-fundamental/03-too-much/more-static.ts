function createBlock(target: HTMLElement, anchor: HTMLElement, ctx: { name: string }) {
  const div = document.createElement('div')
  const text1 = document.createTextNode('Hi ')
  const text2 = document.createTextNode(ctx.name)
  const text3 = document.createTextNode(':\n[假设这里有上千静态文字内容]\nThanks')
  div.appendChild(text1)
  div.appendChild(text2)
  div.appendChild(text3)
  return {
    mount() {
      target.insertBefore(div, anchor)
    },
    update(ctx: { name: string }) {
      text2.textContent = ctx.name
    },
    destroy() {
      div.remove()
    },
  }
}
