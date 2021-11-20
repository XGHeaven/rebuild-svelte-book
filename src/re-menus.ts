import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, state } from "lit/decorators.js";
import { repeat } from 'lit/directives/repeat.js'
import { classMap } from 'lit/directives/class-map.js'

function flattenSection(sec: any, parent?: any): any[] {
  const self = {
    ...sec,
    depth: (parent?.depth ?? -1) + 1,
    path: (parent?.path ? parent.path + '/' : '') + sec.id,
  }
  return [self, ...sec.children?.reduce((secs: any[], nsec: any[]) => {
    secs.push(...flattenSection(nsec, self))
    return secs
  }, []) ?? []]
}

@customElement('re-menus')
export class ReMenus extends LitElement {
  static styles = css`
    .current {
      color: blue;
    }
  `

  @state() current = ''
  @state() _flattenSections: any[] = []
  _sections: unknown[] = []

  get sections() {
    return this._sections
  }
  set sections(input: unknown[]) {
    this._sections = input
    this._flattenSections = input.reduce<any[]>((secs, sec) => {
      secs.push(...flattenSection(sec))
      return secs
    }, [])
  }

  willUpdate(changed: PropertyValues) {
    super.willUpdate(changed)
  }

  override render() {
    return html`
      ${repeat(this._flattenSections, v => v.path, v => html`
        <div style="padding-left: ${16 * v.depth}px" class="${classMap({
          current: this.current === v.path
        })}" @click=${this._click} data-path="${v.path}">${v.title}</div>
      `)}
    `
  }

  private _click(e: MouseEvent) {
    const path = (e.target as HTMLElement).dataset?.['path']
    if (path) {
      this.dispatchEvent(new CustomEvent('topage', {
        detail: {
          path
        },
        bubbles: false,
      }))
    }
  }
}
