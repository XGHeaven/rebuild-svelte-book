export function blinkElement(element: HTMLElement) {
  const oldColor = element.style.backgroundColor
  const oldTransition = element.style.transition

  element.style.backgroundColor = '#fffed6f0'
  element.style.transition = 'background-color .5s ease'

  setTimeout(() => {
    element.style.backgroundColor = oldColor
    setTimeout(() => {
      element.style.transition = oldTransition
    }, 500)
  }, 1500)
}
