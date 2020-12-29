export class ActiveRoute {
  static get path() {
    return window.location.hash.slice(1)
  }

  static get attr() {
    return ActiveRoute.path.split('/')[1]
  }

  static navigate() {
    window.location.hash = ''
  }
}
