import {$} from '@core/Dom'

export function resizeHandler($root, event) {
  const $target = $(event.target)
  const $parent = $target.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const type = $target.data.resize
  const sideProp = type === 'col' ? 'bottom' : 'right'
  let value

  $target.css({
    opacity: 1,
    [sideProp]: '-6000px'
  })

  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.pageX - coords.right + 3
      value = coords.width + delta
      $target.css({right: -delta + 'px'})
    } else {
      const delta = e.pageY - coords.bottom + 3
      value = coords.height + delta
      $target.css({bottom: -delta + 'px'})
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
    if (type === 'col') {
      $parent.css({width: value + 'px'})
      $root.findAll(`[data-cell="${$parent.data.col}"]`)
          .forEach(el => el.style.width = value + 'px')
    } else {
      $parent.css({height: value + 'px'})
    }
    $target.css({
      right: 0,
      opacity: 0,
      bottom: 0
    })
  }
}
