function createBlock(target: HTMLElement, anchor: HTMLElement, hour: number, minute: number) {
  const div = document.createElement('div')
  div.innerText = 'Time: ' + hour + ':' + minute
  return {
    mount() {
      target.insertBefore(div, anchor)
    },
    update(hour: number, minute: number) {
      div.innerText = 'Time: ' + hour + ':' + minute
    },
    destroy() {
      div.remove()
    },
  }
}
