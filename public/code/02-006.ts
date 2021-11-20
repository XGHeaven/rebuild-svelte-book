function createBlock(hour: number, minute: number) {
  const div = document.createElement('div')
  div.textContent = 'Time: ' + hour + ':' + minute
  return {
    mount(target: HTMLElement, anchor: HTMLElement) {
      target.insertBefore(div, anchor)
    },
    update(hour: number, minute: number) {
      div.textContent = 'Time: ' + hour + ':' + minute
    },
    destroy() {
      div.remove()
    }
  }
}

const block = createBlock(10, 30)
block.mount(document.body, null)
block.update(11, 20)
