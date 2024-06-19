import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('md-code-note')
export class MDCodeNote extends LitElement {
  static styles = css`
    ::slotted(ol:last-child),
    ::slotted(p:last-child) {
      margin-bottom: 0 !important;
    }
  `
  @property({ type: String }) range?: string

  override render() {
    return html`
      <div>
        <slot></slot>
      </div>
    `
  }
}
