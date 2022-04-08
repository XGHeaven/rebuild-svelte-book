import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

const TYPE_EMOJI_MAP: Record<string, string> = {
  preknowledge: '🍽',
}

const TYPE_TEXT_MAP: Record<string, string> = {
  preknowledge: '预备知识',
}

@customElement('md-note')
export class MDNote extends LitElement {
  static override styles = css`
    :host {
      display: block;
      margin-bottom: 16px;
    }
    .container {
      display: flex;
      padding: 12px 16px;
      border: 1px solid black;
      border-radius: 8px;
      align-items: center;
    }

    .type-preknowledge {
      border-color: #c0c8ff;
      background-color: #c0c8ff5c;
    }

    .indicator {
      display: flex;
      flex: none;
      flex-direction: column;
      margin-right: 12px;
      text-align: center;
    }

    .icon {
      font-size: 28px;
    }

    .text {
      color: grey;
      font-size: 12px;
    }

    .content {
      flex: 1 1 auto;
    }

    ::slotted(*) {
      color: grey;
      font-size: 14px;
    }

    ::slotted(p) {
      margin-bottom: 8px !important;
    }
  `

  @property({ type: String }) type?: string
  @property({ type: String }) link?: string

  override render() {
    return html`
      <div class="container type-${this.type ?? ''}">
        <div class="indicator">
          <div class="icon">${TYPE_EMOJI_MAP[this.type ?? '']}</div>
          <div class="text">${TYPE_TEXT_MAP[this.type ?? '']}</div>
        </div>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `
  }
}
