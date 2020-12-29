import {defaultStyles, defaultTitle} from '@/constants'

const defaultState = {
  titleState: defaultTitle,
  colState: {},
  rowState: {},
  stylesState: {},
  dataState: {},
  currentText: '',
  currentStyles: defaultStyles,
  openDate: new Date().toJSON()
}

const normalize = state => ({...state, currentStyles: defaultStyles, currentText: ''})

export function normalizeInitialState(state) {
  return state ? normalize(state) : defaultState
}
