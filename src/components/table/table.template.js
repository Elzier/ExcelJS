import {toInlineStyles} from '@core/utils'
import {defaultStyles} from '@/constants'
import {parse} from '@core/parse'

const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 25

function createRow(index, content, rowState) {
  const resizer = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  const height = rowHeight(rowState, index)
  return `
    <div class=row data-type="resizable" data-row="${index}" style="height: ${height}">
        <div class="row__info">
          ${index ? index : ''}
          ${resizer}
        </div>

        <div class="row__data">${content}</div>
      </div>
  `
}

function toChar(el, index) {
  return String.fromCharCode(CODES.A + index)
}

function createColumn({col, index, width}) {
  return `
    <div class="row__data-column" data-type="resizable" data-col="${index}" style="width: ${width}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createCell(state, row) {
  return function(_, col) {
    const width = colWidth(state.colState, col)
    const id = `${row}:${col}`
    const text = state.dataState[id] || ''
    const styles = toInlineStyles({...defaultStyles, ...state.stylesState[id]})
    return `
      <div class="row__cell"
      contenteditable
      data-type="cell"
      data-cell="${col}" 
      data-id="${id}"
      data-value="${text}"
      style="${styles} width: ${width}"
      >${parse(text) || ''}</div>`
  }
}

function colWidth(colState, index) {
  return (colState[index] || DEFAULT_WIDTH) + 'px'
}

function rowHeight(rowState, index) {
  return (rowState[index] || DEFAULT_HEIGHT) + 'px'
}

function assignWidth(state) {
  return function(col, index) {
    return {
      col, index, width: colWidth(state.colState, index)
    }
  }
}

export function createTable(rowsCount = 15, state = {}) {
  const rows = []
  const colsCount = CODES.Z - CODES.A + 1

  const cols = new Array(colsCount) 
      .fill('')
      .map(toChar)
      .map(assignWidth(state))
      .map(createColumn)
      .join('')

  rows.push(createRow(null, cols, {}))

  for (let row = 0; row < rowsCount; ++row) {
    const cell = new Array(colsCount)
        .fill('')
        .map(createCell(state, row))
        .join('')

    rows.push(createRow( row + 1, cell, state.rowState))
  }

  return rows.join('')
}
