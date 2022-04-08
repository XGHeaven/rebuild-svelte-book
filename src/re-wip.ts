import { css, html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('re-wip')
export class ReWIP extends LitElement {
  static override styles = css`
    :host {
      text-align: center;
      margin: 0 30px;
      padding: 8px;
      border-bottom-right-radius: 12px;
      border-bottom-left-radius: 12px;
      background-color: #90ee904f;
      display: block;
    }
  `
  override render() {
    return html`
      <div>
        当前教程还在持续编写中，敬请期待
        <a href="https://github.com/XGHeaven/rebuild-svelte-book" target="_blank">Github</a>
      </div>
    `
  }
}
