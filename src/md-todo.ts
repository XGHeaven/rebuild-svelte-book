import { css, html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('md-todo')
export class MDTodo extends LitElement {
  static override styles = css`
    :host {
      display: block;
      padding: 12px;
      margin: 10px 0;
      background-color: grey;
      color: white;
    }
  `
  override render() {
    return html`TODO: <slot></slot>`
  }
}
