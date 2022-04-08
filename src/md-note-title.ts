import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('md-note-title')
export class MDNoteTitle extends LitElement {
  static override styles = css`
    ::slotted(*) {
      font-size: 18px;
    }

    ::slotted(p) {
      margin-bottom: 8px !important;
    }

    .title {
      display: flex;
      justify-content: space-between;
    }
  `

  @property({ type: String }) link?: string
  override render() {
    return html`
      <div class="title">
        <slot></slot>
        ${this.link ? html`<a href="${this.link}" target="_blank">学习了解</a>` : null}
      </div>
    `
  }
}
