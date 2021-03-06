import {APPLY_STYLES, CHANGE_TEXT, CHANGE_TITLE, CURRENT_STYLES, TABLE_RESIZE, OPEN_DATE} from './types'

export function rootReducer(state, action) {
  let field
  let val
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState'
      return {...state, [field]: value(state, field, action)}

    case CHANGE_TEXT:
      field = 'dataState'
      return {...state, currentText: action.data.value, [field]: value(state, field, action)}

    case CURRENT_STYLES:
      return {...state, currentStyles: action.data}

    case APPLY_STYLES:
      field = 'stylesState'
      val = state[field] || {}
      action.data.ids.forEach(id => {
        val[id] = {...val[id], ...action.data.value}
      })
      return {...state, [field]: val, currentStyles: {...state.currentStyles, ...action.data.value}}

    case CHANGE_TITLE:
      return {...state, titleState: action.data}
    default: return state

    case OPEN_DATE:
      return {...state, openDate: new Date().toJSON()}
  }
}

function value(state, field, action) {
  const prevState = state[field] || {}
  prevState[action.data.id] = action.data.value
  return prevState
}

