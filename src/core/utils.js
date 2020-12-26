export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end]
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => start + index)
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  } else {
    return localStorage.setItem(key, JSON.stringify(data))
  }
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}

export function camelToDash(camel) {
  return camel.replace(/[A-Z]/g, m => '-' + m.toLowerCase())
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles).map(key => `${[camelToDash(key)]}: ${styles[key]}; `).join('')
}

export function deBounce(fn, wait) {
  let timeout
  return function(...args) {
    const later = () => {
      // eslint-disable-next-line
      fn.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
