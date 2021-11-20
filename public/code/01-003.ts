function mount(target: HTMLElement, anchor: HTMLElement) {
  const div = document.createElement('div')
  div.innerText = 'Hello World'
  target.insertBefore(div, anchor)
}
