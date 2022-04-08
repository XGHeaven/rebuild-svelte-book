import { css, html, LitElement, PropertyValues, unsafeCSS } from "lit";
import { customElement, property, state } from 'lit/decorators.js'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
import mdStyle from 'github-markdown-css/github-markdown-light.css'

declare const process: any

@customElement('md-core')
export class MDCore extends LitElement {
  static styles = [unsafeCSS(mdStyle), process.env.NODE_ENV !== 'production' ? css`
  .debug {
    font-size: 12px;
    color: grey;
    text-align: center;
  }
  ` : css`
  .debug {
    display: none;
  }
  `]
  @property({type: String}) section = ''

  @state() mdContent = ''
  @state() domNode: HTMLElement | null = null

  private _parseTime = 0

  override updated(changed: PropertyValues) {
    super.updated(changed)
    if (changed.has('section')) {
      console.log('fetch', this.section)
      this._fetchSection(this.section)
    }
  }

  override render() {
    return html`
      <div class="debug">ParseTime: ${this._parseTime}, MarkdownLength: ${this.mdContent.length}</div>
      <div class="markdown-body">
        ${this.domNode}
      </div>
    `
  }

  private async _fetchSection(section: string) {
    if (!section) {
      return;
    }
    console.log('fetch', section)

    const resp = await fetch(`/sections/${section}.md`)
    const content = await resp.text()
    this.mdContent = content;
    const fragment = document.createElement('div')
    const startTime = performance.now()
    const html = String(await remark().use(remarkGfm).use(remarkHtml, {
      sanitize: false
    }).process(content))
    this._parseTime = performance.now() - startTime
    fragment.innerHTML = html
    console.log(fragment)
    this.domNode = fragment
  }
}
