const name = 'Bill'

function createBlock(target: HTMLElement, anchor: HTMLElement) {
  const div = document.createElement('div')
  div.innerText = 'Hello ' + name
  return {
    mount() {
      target.insertBefore(div, anchor)
    },
    destroy() {
      div.remove()
    }
  }
}
