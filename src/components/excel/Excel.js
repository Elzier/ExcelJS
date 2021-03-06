import {$} from '@core/Dom'
import {Emitter} from '@core/Emitter'
import {StoreSubscriber} from '@core/StoreSubscriber'
import {openDate} from '@/redux/actions'
import {preventToDefault} from '@core/utils'

export class Excel {
  constructor(options) {
    this.components = options.components || []
    this.emitter = new Emitter()
    this.store = options.store
    this.subscriber = new StoreSubscriber(this.store)
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    const componentOption = {
      emitter: this.emitter,
      store: this.store
    }

    this.components = this.components.map(Component => {
      const $rootChild = $.create('div', Component.className)
      const component = new Component($rootChild, componentOption)

      $rootChild.html(component.toHTML())
      $root.append($rootChild)
      return component
    })
    return $root
  }

  init() {
    if (process.env.NODE_ENV === 'production') {
      addEventListener('contextmenu', preventToDefault)
    }
    this.store.dispatch(openDate())
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach(component => component.init())
  }

  destroy() {
    this.subscriber.unsubscribeFromStore()
    this.components.forEach(component => component.destroy())
  }
}
