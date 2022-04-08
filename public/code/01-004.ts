function createBlock(target: HTMLElement, anchor: HTMLElement) {
  const div = document.createElement('div')
  div.innerText = 'Hello World'
  return {
    mount() {
      target.insertBefore(div, anchor)
    },
    destroy() {
      div.remove()
    },
  }
}
