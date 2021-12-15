function createBlock(
  target: HTMLElement,
  anchor: HTMLElement,
  name: string,
  age: number,
  gender: string
) {
  const div1 = document.createElement('div')
  const div2 = document.createElement('div')
  const div3 = document.createElement('div')
  const text1 = document.createTextNode('姓名: ')
  const text2 = document.createTextNode(name)
  const text3 = document.createTextNode('年龄: ')
  const text4 = document.createTextNode(age + '')
  const text5 = document.createTextNode('性别: ')
  const text6 = document.createTextNode(gender)
  div1.appendChild(text1)
  div1.appendChild(text2)
  div2.appendChild(text3)
  div2.appendChild(text4)
  div3.appendChild(text5)
  div3.appendChild(text6)
  return {
    mount() {
      target.insertBefore(div1, anchor)
      target.insertBefore(div2, anchor)
      target.insertBefore(div3, anchor)
    },
    update(name: string, age: number, gender: string) {
      text2.textContent = name
      text4.textContent = age + ''
      text6.textContent = gender
    },
    destroy() {
      div1.remove()
      div2.remove()
      div3.remove()
    }
  }
}
