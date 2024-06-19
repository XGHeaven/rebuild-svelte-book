import { html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { blinkElement } from './blink'

@customElement('md-link')
class MDLink extends LitElement {
  @property({ type: String }) href?: string
  @property({ type: Boolean }) section?: boolean

  // TODO
  @state() private sectionTitle?: string
  @state() private realHref = ''
  @state() private anchor = false

  override willUpdate(changed: Map<string | number | symbol, unknown>): void {
    super.willUpdate(changed)

    if (changed.has('href')) {
      if (this.href?.startsWith('#')) {
        this.anchor = true
        this.realHref = this.href!.slice(1)
      } else {
        this.anchor = false
        this.realHref = this.processHref()
      }
    }
  }

  override render() {
    let children
    if (this.anchor) {
      children = html`<slot></slot>`
    } else if (this.section) {
      children = this.sectionTitle ? html`${this.sectionTitle}` : html`<slot>Fetching Title...</slot>`
    } else {
      children = html`<slot></slot>`
    }
    return html`<a href="${this.realHref}" @click=${this.handleClick}>${children}</a>`
  }

  private handleClick(e: Event) {
    if (!this.href) {
      return
    }
    if (this.anchor) {
      let root = this.getRootNode() as DocumentFragment
      let element

      while (!element) {
        element = root.querySelector(`#${this.realHref}`)
        if (root.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
          root = (root as ShadowRoot).host.getRootNode() as DocumentFragment
        } else {
          // 到 body 就可以停了
          break
        }
      }

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
        })
        if (element.nodeType === Node.ELEMENT_NODE) {
          blinkElement(element as HTMLElement)
        }
      } else {
        console.warn(`Cannot found #${this.realHref} element`)
      }

      e.preventDefault()
    }
    // location.hash = `#${paths.join('/')}`
  }

  private processHref() {
    const current = location.hash.startsWith('#') ? location.hash.slice(1) : location.hash
    const paths = current.split('/')
    const tos = (this.href ?? '').split('/')
    for (const path of tos) {
      if (path === '.') {
        continue
      }
      if (path === '..') {
        paths.pop()
        continue
      }
      paths.push(path)
    }

    return `#${paths.join('/')}`
  }
}
