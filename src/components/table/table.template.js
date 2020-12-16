const CODES = {
  A: 65,
  Z: 90
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

function createColumn(col, index) {
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

function createCell(row) {
  return function(_, col) {
    return `
      <div class="row__cell" 
      contenteditable
      data-type="cell"
      data-cell="${col}" 
      data-id="${row}:${col}"
      ></div>`
  }
}

export function createTable(rowsCount = 15) {
  const rows = []
  const colsCount = CODES.Z - CODES.A + 1

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(createColumn)
      .join('')

  rows.push(createRow(null, cols))

  for (let row = 0; row < rowsCount; ++row) {
    const cell = new Array(colsCount)
        .fill('')
        .map(createCell(row))
        .join('')

    rows.push(createRow(row + 1, cell))
  }

  return rows.join('')
}
