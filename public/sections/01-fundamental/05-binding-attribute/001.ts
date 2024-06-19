function createBlock() {
  const input = document.createElement('input')
  input.className = 'a'
  input.value = 'b'
  input.dataset.id = 'id'
  input.setAttribute('others', 'other')
  return {
    mount(target, anchor) {
      target.insertBefore(input, anchor)
    },
    destroy() {
      div.remove()
    },
  }
}

const block = createBlock()
block.mount(document.body, null)
