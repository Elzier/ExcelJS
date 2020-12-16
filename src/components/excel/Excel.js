import {$} from '@core/Dom'
import {Emitter} from '@core/Emitter'

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
    this.emitter = new Emitter()
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    const componentOption = {emitter: this.emitter}

    this.components = this.components.map(Component => {
      const $rootChild = $.create('div', Component.className)
      const component = new Component($rootChild, componentOption)

      $rootChild.html(component.toHTML())
      $root.append($rootChild)
      return component
    })
    return $root
  }

  render() {
    this.$el.append(this.getRoot())
    this.components.forEach(component => component.init())
  }

  destroy() {
    this.components.forEach(component => component.destroy())
  }
}
