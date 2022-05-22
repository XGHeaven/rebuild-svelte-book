function createBlock(target: HTMLElement, anchor: HTMLElement, h: number, m: number, s: number) {
  const div = document.createElement('div')
  div.innerText = h + ':' + m + ':' + s
  return {
    mount() {
      target.insertBefore(div, anchor)
    },
    update(h: number, m: number, s: number) {
        div.innerText = h + ':' + m + ':' + s
    },
    destroy() {
      div.remove()
    },
  }
}

let h = 0
let m = 0
let s = 0

const block = createBlock(document.body, null, h, m, s);
block.mount()

setTimeout(() => {
  s += 1
  if (s > 60) {
      m += 1
      s -= 60
  }
  if (m > 60) {
      h += 1
      m -= 60
  }
  block.update(h, m, s)
}, 1000)
