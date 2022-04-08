function createBlock(name: string) {
  const div = document.createElement('div')
  div.innerText = 'Hello ' + name
  return {
    mount(target: HTMLElement, anchor: HTMLElement) {
      target.insertBefore(div, anchor)
    },
    update(name: string) {
      div.textContent = 'Hello ' + name
    },
    destroy() {
      div.remove()
    },
  }
}

const block = createBlock('Bill')
block.mount(document.body, null)
block.update('John')
