import { css, html, LitElement, PropertyValues } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import * as Diff from 'diff'
import { MDCore } from './md-core'
import { getHighlighter, Highlighter, ShikiTransformer } from 'shiki'
import { transformerNotationDiff } from '@shikijs/transformers'

@customElement('md-code')
export class MDCode extends LitElement {
  static highlighter: Highlighter | null = null
  static highlighterPromise: Promise<Highlighter> | null = null
  static async getHighlighter() {
    if (this.highlighter) {
      return this.highlighter
    }
    if (!this.highlighterPromise) {
      this.highlighterPromise = getHighlighter({
        themes: ['github-light'],
        langs: ['typescript', 'svelte', 'html', 'javascript'],
      })
    }
    return this.highlighterPromise
  }
  static styles = [
    css`
      :host {
        font-size: 14px;
        background-color: #fcfcfc;
        border: 1px solid #ddd;
        display: block;
        border-radius: 4px;
      }

      .header {
        background-color: #ccc;
        font-size: 12px;
        padding: 8px 16px;
      }

      .body {
        overflow: auto;
      }

      code {
        counter-reset: step;
        counter-increment: step 0;
      }

      .line::before {
        content: counter(step);
        counter-increment: step;
        width: 24px;
        margin-right: 8px;
        display: inline-block;
        text-align: right;
        color: rgba(115, 138, 148, 0.4);
        border-right: 4px solid transparent;
        padding-right: 8px;
      }

      pre {
        margin: 0;
        padding-left: 8px;
      }

      .line.mark {
        background: lightyellow;
      }

      .line.mark::before {
        border-right-color: orange;
      }

      .note {
        white-space: normal;
        padding: 4px 8px;
        margin-left: 32px;
        margin-right: 12px;
        border-radius: 4px;
        border-left: 3px solid #1ba673;
        background: #1ba67320;
        color: #1ba673;
        margin-top: 4px;
      }

      .body-has-note .line:not(.mark) {
        opacity: 0.5;
        transition: opacity 0.3s ease;
      }

      .body-has-note:hover .line:not(.mark) {
        opacity: 1;
      }

      .diff.add {
        background-color: #e6ffed;
      }

      .diff.remove {
        background-color: #ffeef0;
      }
    `,
  ]
  @property({ type: String }) ref?: string
  @property({ type: String }) diff?: string

  private _code = ''
  private _codeName = ''
  private _codeLang = 'typescript'
  private _cachedCode = ''
  @state() private _cost: [fetchTime: number, processTime: number, highlightTime: number] = [0, 0, 0]

  @state() private _cachedHTML: string | null = null
  private _cachedRanges: [number, number][] = []

  override updated(changed: PropertyValues) {
    super.updated(changed)
    if (changed.has('ref') || changed.has('diff')) {
      this._updateCode()
    }
  }

  override render() {
    let code
    if (this._cachedHTML) {
      code = html`${unsafeHTML(this._cachedHTML)}`
    } else {
      code = html`<div>Not Found</div>`
    }

    return html`
      <div class="container">
        <div class="header">${this._codeName} (${this._cost.map((v) => `${v.toFixed(2)}ms`).join('/')})</div>
        <div class="body ${this._cachedRanges.length ? 'body-has-note' : ''}">${code}</div>
      </div>
    `
  }

  private async _updateCode() {
    let now = performance.now()
    if (this.ref) {
      this._codeName = this.ref
      this._code = await this._getCode(this.ref)
      this._cost[0] = performance.now() - now
      this._cost[1] = 0
      this._codeLang = guessLang(this.ref)
    } else if (this.diff) {
      const [a, b] = this.diff.split(',')
      this._codeName = `Diff: ${a} ${b}`
      this._codeLang = guessLang(a)
      const [codeA, codeB] = await Promise.all([this._getCode(a), this._getCode(b)])
      this._cost[0] = performance.now() - now
      now = performance.now()
      const diffData = Diff.diffLines(codeA, codeB, {
        // ignoreWhitespace: true,
      })
      this._code = diffData
        .map((part) => {
          const hasEndBreak = part.value.endsWith('\n')
          const value = hasEndBreak ? part.value.slice(0, -1) : part.value
          const notion = part.added ? '// [!code ++]' : part.removed ? '// [!code --]' : ''
          const remix = value
            .split('\n')
            .map((line) => `${line}${notion}`)
            .join('\n')
          return `${remix}${hasEndBreak ? '\n' : ''}`
        })
        .join('')
      this._cost[1] = performance.now() - now
      console.log(diffData, this._code)
    }
    await this._asyncHightLight()
  }

  private async _getCode(code: string) {
    const resp = await fetch(this._resolveCodePath(code))
    return await resp.text()
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

  private async _asyncHightLight() {
    if (this._code === this._cachedCode) {
      return
    }
    const now = performance.now()
    this._cachedCode = this._code
    const children = Array.from(this.children).filter((child) => child.tagName === 'MD-CODE-NOTE')
    const ranges: [number, number][] = []
    children.forEach((child) => {
      const slot = child.slot
      const [start, end] = slot.split('-').map(Number)
      for (let i = start; i <= end; i++) {
        ranges.push([start, end])
      }
    })
    this._cachedRanges = ranges
    const highlighter = await MDCode.getHighlighter()
    const result = await highlighter.codeToHtml(this._code, {
      lang: this._codeLang,
      theme: 'github-light',
      transformers: [parseRangesTransform(ranges), transformerNotationDiff()],
    })

    this._cost[2] = performance.now() - now
    this._cachedHTML = result
  }
}

function parseRangesTransform(ranges: [number, number][]) {
  const transformer: ShikiTransformer = {
    name: 'range-transform',
    code(node) {
      const lines = node.children.filter((v) => v.type === 'element') as (typeof node)[]
      lines.forEach((line, i) => {
        const lineNo = i + 1
        const matchedRange = ranges.find((range) => lineNo >= range[0] && lineNo <= range[1])
        if (matchedRange) {
          this.addClassToHast(line, 'mark')
          if (matchedRange[1] === lineNo) {
            node.children.splice(node.children.indexOf(line) + 1, 0, {
              type: 'element',
              tagName: 'div',
              children: [
                {
                  type: 'element',
                  tagName: 'slot',
                  children: [
                    {
                      type: 'text',
                      value: '',
                    },
                  ],
                  properties: {
                    name: `${matchedRange[0]}-${matchedRange[1]}`,
                  },
                },
              ],
              properties: {
                class: 'note',
              },
            })
          }
        }
      })
    },
  }

  return transformer
}

function guessLang(fileName: string): string {
  const ext = fileName.split('.').pop()
  switch (ext) {
    case 'ts':
    case 'tsx':
      return 'typescript'
    case 'svelte':
      return 'svelte'
    case 'html':
      return 'html'
    case 'js':
      return 'javascript'
    default:
      return 'typescript'
  }
}
