function createBlock(hour: number, minute: number) {
  const div = document.createElement('div')
  const text1 = document.createTextNode('Time: ')
  const text2 = document.createTextNode(hour + '')
  const text3 = document.createTextNode(':')
  const text4 = document.createTextNode(minute + '')
  return {
    mount(target: HTMLElement, anchor: HTMLElement) {
      div.appendChild(text1)
      div.appendChild(text2)
      div.appendChild(text3)
      div.appendChild(text4)
      target.insertBefore(div, anchor)
    },
    updateHour(hour: number) {
      text2.textContent = hour + ''
    },
    updateMinute(minute: number) {
      text4.textContent = minute + ''
    },
    destroy() {
      div.remove()
    },
  }
}

const block = createBlock(10, 10)
block.mount(document.body, null)
// 如果小时变化就调用此函数
block.updateHour(10)
// 如果分钟变化就调佣此函数
block.updateMinute(10)
