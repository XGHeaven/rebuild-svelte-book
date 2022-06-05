// ...

let a = 0
let b = 0

const changed = []

setTimeout(() => {
  a = 1
  changed.push('a')
  // 拿着 changed 数组去更新
}, 1000)

// ...
