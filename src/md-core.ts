import { css, html, LitElement, PropertyValues, unsafeCSS } from "lit";
import { customElement, property, state } from 'lit/decorators.js'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import mdStyle from 'github-markdown-css/github-markdown-light.css'

@customElement('md-core')
export class MDCore extends LitElement {
  static styles = unsafeCSS(mdStyle)
  @property({type: String}) section = ''

  @state() mdContent = ''
  @state() domNode: HTMLElement | null = null

  override updated(changed: PropertyValues) {
    super.updated(changed)
    if (changed.has('section')) {
      console.log('fetch', this.section)
      this._fetchSection(this.section)
    }
  }

  override render() {
    return html`
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
    const html = String(await remark().use(remarkHtml, {
      sanitize: false
    }).process(content))
    fragment.innerHTML = html
    console.log(fragment)
    this.domNode = fragment
  }
}
