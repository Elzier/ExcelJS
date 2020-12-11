const CODES = {
  A: 65,
  Z: 90
}

function createCell(_, col) {
  return `<div class="row__cell" contenteditable data-cell="${col}"></div>`
}

function createRow(index, content) {
  const resizer = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class=row data-type="resizable">
        <div class="row__info">
          ${index ? index : ''}
          ${resizer}
        </div>

        <div class="row__data">${content}</div>
      </div>
  `
}

function toColumn(col, index) {
  return `
    <div class="row__data-column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function toChar(el, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const rows = []
  const colsCount = CODES.Z - CODES.A + 1

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  const cell = new Array(colsCount)
      .fill('')
      .map(createCell)
      .join('')

  rows.push(createRow(null, cols))

  for (let i = 0; i < rowsCount; ++i) {
    rows.push(createRow(i + 1, cell))
  }

  return rows.join('')
}
