import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

const TYPE_EMOJI_MAP: Record<string, string> = {
  'preknowledge': '🍽'
}

@customElement('md-note')
export class MDNote extends LitElement {
  static override styles = css`
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

    .icon {
      flex: none;
      margin-right: 18px;
      font-size: 36px;
    }

    .content {
      flex: 1 1 auto;
    }
  `

  @property({type: String}) type?: string

  override render() {
    return html`
      <div class="container type-${this.type ?? ''}">
        <div class="icon">${TYPE_EMOJI_MAP[this.type ?? '']}</div>
        <div class="content"><slot></slot></div>
      </div>
    `
  }
}
