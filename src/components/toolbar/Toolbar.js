import {createToolbar} from '@/components/toolbar/toolbar.template'
import {$} from '@core/Dom'
import {ExcelStateComponent} from '@core/ExcelStateComponent'
import {defaultStyles} from '@/constants'

export class Toolbar extends ExcelStateComponent {
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribeOn: ['currentStyles'],
      ...options
    })
  }
  static className = 'excel__toolbar'

  prepare() {
    this.initState(defaultStyles)
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles)
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value)
      this.$emit('toolbar:applyStyle', value)
    }
  }
}
