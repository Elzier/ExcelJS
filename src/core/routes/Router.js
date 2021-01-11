import {$} from '../Dom'
import {ActiveRoute} from './ActiveRoute'
import {Loader} from '@/components/Loader'

export class Router {
  constructor(selector, routes) {
    this.$placeholder = $(selector)
    this.routes = routes
    this.page = null
    this.changePageHandler = this.changePageHandler.bind(this)
    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  async changePageHandler(event) {
    this.loader = new Loader()
    if (this.page) {
      this.page.destroy()
    }

    this.$placeholder.clear().append(this.loader)
    const Page = ActiveRoute.path.includes('excel') ? this.routes.excel : this.routes.dashboard
    this.page = new Page(ActiveRoute.attr)
    const root = await this.page.getRoot()
    this.$placeholder.clear().append(root)
    this.page.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
