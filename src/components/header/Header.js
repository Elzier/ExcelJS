import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/Dom'
import {changeTitle} from '@/redux/actions'
import {deBounce} from '@core/utils'
import {ActiveRoute} from '@core/routes/ActiveRoute'

export class Header extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
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
          <div class="excel__header-button" data-button="delete">
              <i class="material-icons" data-button="delete">delete</i>
          </div>
          <div class="excel__header-button" data-button="toDashboard">
              <i class="material-icons" data-button="toDashboard">exit_to_app</i>
          </div>
        </div>
    `
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.button === 'delete') {
      const confirm = window.confirm('Are you sure? The table will be deleted.')
      if (confirm) {
        localStorage.removeItem('excel:' + ActiveRoute.attr)
        ActiveRoute.navigate()
      }
    }
    if ($target.data.button === 'toDashboard') {
      ActiveRoute.navigate()
    }
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }
}
