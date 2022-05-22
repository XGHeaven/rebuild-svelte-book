function createBlock(target: HTMLElement, anchor: HTMLElement, name: string) {
  const div = document.createElement('div')
  div.innerText = 'Hello ' + name
  return {
    mount() {
      target.insertBefore(div, anchor)
    },
    destroy() {
      div.remove()
    },
  }
}

let name = 'foo'
const block = createBlock(document.body, null, name);
block.mount()
