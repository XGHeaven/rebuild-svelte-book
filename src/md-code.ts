import { html, LitElement, PropertyValues, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import * as Diff from 'diff'
import hljs from 'highlight.js/lib/common'
import type { HighlightResult } from "highlight.js";
import hljsStyle from 'highlight.js/styles/github.css'

@customElement('md-code')
export class MDCode extends LitElement {
  static styles = unsafeCSS(hljsStyle)
  @property({type: String}) ref?: string
  @property({type: String}) diff?: string

  @state() type = 'ref'
  @state() code = ''
  @state() diffData: Diff.Change[] = []

  private _cachedCode = ''
  private _cachedHTML: HighlightResult | null = null

  override updated(changed: PropertyValues) {
    super.updated(changed)
    if (changed.has('ref') || changed.has('diff')) {
      this._showCode()
    }
  }

  override render() {
    if (this.type === 'ref') {
      const result = this._highlight()
      console.log(result)
      if (!result) {
        return null
      }
      return html`<pre><code>${unsafeHTML(result.value)}</code></pre>`
    }
    if (this.type === 'diff') {
      return html`<md-diff .diffs=${this.diffData}></md-diff>`
    }
    return html`
      <div></div>
    `
  }

  private async _showCode() {
    if (this.ref) {
      this.code = await this._getCode(this.ref)
      this.type = 'ref'
    } else if (this.diff) {
      const [a, b] = this.diff.split(',')
      const [codeA, codeB] = await Promise.all([this._getCode(a), this._getCode(b)])
      this.type = 'diff'
      // this.diffData = Diff.createPatch('code', codeA, codeB)
      this.diffData = Diff.diffWords(codeA, codeB, {
        ignoreWhitespace: true
      })
    }
  }

  private async _getCode(code: string) {
    const resp = await fetch(`/code/${code}`)
    return await resp.text()
  }

  private _highlight() {
    if (this.code !== this._cachedCode) {
      if (!this.code) {
        this._cachedCode = this.code
        this._cachedHTML = null
      } else {
        this._cachedHTML = hljs.highlight(this.code, {language: this.ref!.split('.').slice(-1)[0]})
        this._cachedCode = this.code
      }
    }

    return this._cachedHTML
  }
}
