import {$} from '@core/Dom'

export class Excel {
  constructor(selector, options) {
    // this.$el = document.querySelector(selector)
    this.$el = $(selector)
    this.components = options.components || []
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    this.components = this.components.map(Component => {
      const $rootChild = $.create('div', Component.className)
      const component = new Component($rootChild)
      // Debug
      // if (component.name) {
      //   window['c' + component.name] = component
      // }
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
}
