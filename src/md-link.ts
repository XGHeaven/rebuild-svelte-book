import { html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

@customElement('md-link')
class MDLink extends LitElement {
  @property({ type: String }) href?: string
  @property({ type: Boolean }) section?: boolean

  @state() sectionTitle?: string
  @state() realHref = ''

  override willUpdate(changed: Map<string | number | symbol, unknown>): void {
    super.willUpdate(changed)

    if (changed.has('href')) {
      this.realHref = this.processHref()
    }
  }

  override render() {
    let children
    if (this.section) {
      children = this.sectionTitle ? html`${this.sectionTitle}` : html`<slot>Fetching Title...</slot>`
    } else {
      children = html`<slot></slot>`
    }
    return html`<a href="${this.realHref}" @click=${this.handleClick}>${children}</a>`
  }

  private handleClick() {
    if (!this.href) {
      return
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
      }
      paths.push(path)
    }

    return `#${paths.join('/')}`
  }
}
