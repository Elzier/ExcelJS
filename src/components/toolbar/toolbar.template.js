function createButton(button) {
  const meta = `data-type="button" data-value='${JSON.stringify(button.value)}'`
  return ` 
    <div class="excel__toolbar-button 
      ${button.active ? 'active' : ''}"
      ${meta}
    >
      <i class="material-icons" ${meta}>${button.icon}</i> 
    </div>
  `
}

export function createToolbar(state) {
  const buttons = [
    {
      icon: 'format_align_left',
      active: state['textAlign'] === 'left',
      value: {textAlign: 'left'}
    },
    {
      icon: 'format_align_center',
      active: state['textAlign'] === 'center',
      value: {textAlign: 'center'}
    },
    {
      icon: 'format_align_right',
      value: {textAlign: 'right'},
      active: state['textAlign'] === 'right'
    },
    {
      icon: 'format_bold',
      value: {fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold'},
      active: state['fontWeight'] === 'bold',
    },
    {
      icon: 'format_italic',
      value: {fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic'},
      active: state['fontStyle'] === 'italic'
    },
    {
      icon: 'format_underlined',
      value: {textDecoration: state['textDecoration'] === 'underline' ? 'none' : 'underline'},
      active: state['textDecoration'] === 'underline',
    }
  ]
  return buttons.map(createButton).join('')
}
