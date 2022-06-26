import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

const TYPE_EMOJI_MAP: Record<string, string> = {
  preknowledge: '🍽',
  question: '🙋',
}

const TYPE_TEXT_MAP: Record<string, string> = {
  preknowledge: '预备知识',
  question: '提问',
}

const TYPE_BORDER_COLOR: Record<string, string> = {
  preknowledge: '#c0c8ff',
  question: '#6effc7',
}

const TYPE_BACKGROUND_COLOR: Record<string, string> = {
  preknowledge: '#c0c8ff5c',
  question: '#6effc75c',
}

const TYPE_TEXT_COLOR: Record<string, string> = {
  preknowledge: '545454',
  question: '#546454',
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

    .indicator {
      display: flex;
      flex: none;
      flex-direction: column;
      margin-right: 12px;
      text-align: center;
      min-width: 48px;
    }

    .icon {
      font-size: 28px;
    }

    .text {
      font-size: 12px;
    }

    .content {
      flex: 1 1 auto;
    }

    ::slotted(*) {
      font-size: 14px;
    }

    ::slotted(p) {
      margin-bottom: 8px !important;
    }
  `

  @property({ type: String }) type?: string
  @property({ type: String }) link?: string

  override render() {
    const { type = '' } = this
    return html`
      <div class="container">
        <div class="indicator">
          <div class="icon">${TYPE_EMOJI_MAP[type]}</div>
          <div class="text">${TYPE_TEXT_MAP[type]}</div>
        </div>
        <div class="content">
          <slot></slot>
        </div>
      </div>
      <style>
        :host .container {
          border-color: ${TYPE_BORDER_COLOR[type]};
          background-color: ${TYPE_BACKGROUND_COLOR[type]};
        }

        ::slotted(*),
        .text {
          color: ${TYPE_TEXT_COLOR[type]};
        }
      </style>
    `
  }
}
