import {$} from '@core/Dom'

export function Loader() {
  return $.create('div', 'loader').html(`
    <div class="lds-roller">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  `)
}
