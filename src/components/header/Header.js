import {ExcelComponent} from '@core/ExcelComponent'

export class Header extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Header',
      ...options
    })
  }

  static className = 'excel__header'
  toHTML() {
    return `
      <input type="text" class="excel__header-input" value="New Table">
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
}
