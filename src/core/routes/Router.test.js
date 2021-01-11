import {Router} from './Router'
import {Page} from '../page/Page'

class Dashboard extends Page {
  getRoot() {
    const root = document.createElement('div')
    root.innerHTML = 'dashboard'
    return root
  }
}
class Excel {}

describe('Router', () => {
  let router
  let $root

  beforeEach(() => {
    $root = document.createElement('div')
    router = new Router($root, {
      dashboard: Dashboard,
      excel: Excel
    })
  })

  test('should be defined', () => {
    expect(router).toBeDefined()
  })

  test('should render dashboard', () => {
    router.changePageHandler()
    expect($root.innerHTML).toBe('<div>dashboard</div>')
  })
})
