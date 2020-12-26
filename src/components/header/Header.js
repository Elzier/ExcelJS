import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/Dom'
import {changeTitle} from '@/redux/actions'
import {deBounce} from '@core/utils'

export class Header extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    })
  }

  static className = 'excel__header'

  prepare() {
    this.onInput = deBounce(this.onInput, 300)
  }

  toHTML() {
    const title = this.store.getState().titleState
    return `
      <input type="text" class="excel__header-input" value="${title}">
        <div>
          <div class="excel__header-button">
              <i class="material-icons">delete</i>
          </div>
          <div class="excel__header-button">
              <i class="material-icons">exit_to_app</i>
          </div>
        </div>
    `
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }
}
