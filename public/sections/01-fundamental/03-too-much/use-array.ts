function createBlock(target: HTMLElement, anchor: HTMLElement, ctx: [number, number, number]) {
  const div = document.createElement('div')
  div.innerText = ctx[0] /* h */ + ':' + ctx[1] /* m */ + ':' + ctx[2] /* s */
  return {
    mount() {
      target.insertBefore(div, anchor)
    },
    update(ctx: [number, number, number]) {
        div.innerText = ctx[0] + ':' + ctx[1] + ':' + ctx[2]
    },
    destroy() {
      div.remove()
    },
  }
}

let h = 0
let m = 0
let s = 0

const block = createBlock(document.body, null, [ h, m, s ]);
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
  block.update([h, m, s])
}, 1000)
