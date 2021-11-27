import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement('md-diff')
export class MDDiff extends LitElement {
  static styles = css`
    .code {
      line-height: 1;
    }
    .add {
      color: white;
      background-color: green;
    }
    .del {
      color: white;
      background-color: red;
    }
  `
  @state() diffs: Diff.Change[] = []

  override render() {
    return html`
      <pre class="code">${this.diffs.map(diff => this._renderChange(diff))}</pre>
    `
  }

  private _renderChange(change: Diff.Change) {
    if (change.added) {
      return html`<span class="add">${change.value}</span>`
    }

    if (change.removed) {
      return html`<span class="del">${change.value}</span>`
    }

    return change.value
  }
}
