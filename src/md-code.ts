import { css, html, LitElement, PropertyValues, unsafeCSS } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import * as Diff from 'diff'
import hljs from 'highlight.js/lib/common'
import type { HighlightResult } from 'highlight.js'
import hljsStyle from 'highlight.js/styles/github.css'
import { MDCore } from './md-core'

@customElement('md-code')
export class MDCode extends LitElement {
  static styles = [
    unsafeCSS(hljsStyle),
    css`
      :host {
        font-size: 14px;
      }
    `,
  ]
  @property({ type: String }) ref?: string
  @property({ type: String }) diff?: string

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
    return html`<div>Not Found</div>`
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
        ignoreWhitespace: true,
      })
    }
  }

  private async _getCode(code: string) {
    const resp = await fetch(this._resolveCodePath(code))
    return await resp.text()
  }

  private _highlight() {
    if (this.code !== this._cachedCode) {
      if (!this.code) {
        this._cachedCode = this.code
        this._cachedHTML = null
      } else {
        this._cachedHTML = hljs.highlight(this.code, { language: this.ref!.split('.').slice(-1)[0] })
        this._cachedCode = this.code
      }
    }

    return this._cachedHTML
  }

  private _resolveCodePath(code: string) {
    if (code.startsWith('.')) {
      let parent = this.parentNode
      while (parent && parent !== document.body) {
        if ((parent as any).tagName === 'MD-CORE') {
          break
        }
        parent = (parent as any).host ?? parent.parentNode
      }

      if (parent instanceof MDCore) {
        return `/sections/${parent.section}/${code.slice(2)}`
      }
    }
    return `/code/${code}`
  }
}
