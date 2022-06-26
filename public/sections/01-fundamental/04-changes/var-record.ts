// ...

let a = 0
let b = 0

setTimeout(() => {
  const changed = []

  a = 1
  changed.push('a')
  // 拿着 changed 数组去更新
}, 1000)

// ...
