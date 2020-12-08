const CODES = {
  A: 65,
  Z: 90
}

function createCell() {
  return `<div class="row__cell" contenteditable></div>`
}

function createRow(index, content) {
  return `
    <div class=row>
        <div class="row__info">${index ? index : ''}</div>

        <div class="row__data">${content}</div>
      </div>
  `
}

function toColumn(col) {
  return `<div class="row__data-column">${col}</div>`
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
      .map(el => toColumn(el))
      .join('')

  const cell = new Array(colsCount)
      .fill('')
      .map(() => createCell())
      .join('')

  rows.push(createRow(null, cols))

  for (let i = 0; i < rowsCount; ++i) {
    rows.push(createRow(i + 1, cell))
  }

  return rows.join('')
}
