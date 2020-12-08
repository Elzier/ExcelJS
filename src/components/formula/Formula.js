import {ExcelComponent} from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click']
    });
  }

  static className = 'excel__formula'
  toHTML() {
    return `
      <div class="excel__formula-info">fx</div>
      <div class="excel__formula-input" contenteditable="true" spellcheck="false"></div>
    `
  }

  onInput(event) {
    console.log(this.$root)
    console.log('Formula: onInput', event.target.textContent.trim())
  }

  onClick() {
    console.log('click')
  }

  // init() {
  //   this.$root.on('input', function() {
  //
  //   })
  // }
}
