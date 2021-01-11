import {Page} from '@core/page/Page'
import {$} from '@core/Dom'
import {createTableList} from '@core/shared/dashboard.functions'

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString()
    return $.create('div', 'db').html(`
      <div class="db__header">
        <h1>Excel Lite</h1>
      </div>

      <div class="db__new">
        <div class="db__view">
          <a href="#excel/${now}" class="db__create">
              New <br> Table
          </a>
        </div>
      </div>

      <div class="db__table db__view">
        ${ createTableList() }
      </div>
    `)
  }
}
