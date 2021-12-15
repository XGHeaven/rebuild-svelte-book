import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, state } from 'lit/decorators.js'

const SIDE_WIDTH = 280

@customElement('app-home')
class AppHome extends LitElement {
  static styles = css`
    .error {
      font-size: 24px;
      text-align: center;
    }

    .side {
      width: ${SIDE_WIDTH}px;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      height: 100%;
      border-right: 1px solid lightgray;
    }

    .body {
      padding-left: ${SIDE_WIDTH}px;
    }

    .content {
      margin: auto;
      padding: 0 24px;
    }
  `
  @state() section?: string
  @state() sections = []
  @state() loading = true
  @state() errMsg = ''

  connectedCallback() {
    super.connectedCallback()
    window.addEventListener('hashchange', () => {
      const hash = location.hash
      if (hash.startsWith('#')) {
        this.section = hash.slice(1)
      }
    })
    if (location.hash.startsWith('#')) {
      this.section = location.hash.slice(1)
    }
  }

  override firstUpdated(changed: PropertyValues) {
    super.firstUpdated(changed)
    this._fetchData()
  }

  override render() {
    return html`
    ${this.errMsg ? html`<div>${this.errMsg}</div>` : null}
    <div class="side">
      <re-menus .sections=${this.sections} .current=${this.section} @topage=${this._toPage}></re-menus>
    </div>
    <div class="body">
      <re-wip></re-wip>
      <div class="content">
        ${this.section ? html`<md-core section="${this.section}"></md-core>` : null}
      </div>
    </div>
    `
  }

  private _fetchData() {
    this.loading = true
    fetch('/sections.json').then(resp => {
      return resp.json()
    }).then(sections => {
      this.sections = sections
      this.loading = false
    }).catch(e => {
      console.error(e)
      this.loading = false
      this.errMsg = 'Load fail: ' + e.message
    })
  }

  private _toPage(e: CustomEvent<{path: string}>) {
    this.section = e.detail.path
    window.location.hash = `#${e.detail.path}`
  }
}