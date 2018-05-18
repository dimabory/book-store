import { title } from './config'
import Api from './service/Api'
import { Book, Publisher, Genre } from './model'

export default class {

  constructor (store) {
    document.title = title
    this._store = store

    this.loader = true

    this.filter = null

    Promise.all([
      Api.books.then(data => this.store.books = data.map(i => new Book(i))),
      Api.publishers.then(data => this.store.publishers = data.map(i => new Publisher({name: i}))),
      Api.genres.then(data => this.store.genres = data.map(i => new Genre({name: i}))),
    ]).then(_ => {
      this.refreshTable()
      this.addEventListeners()
      this.loader = false
    }).catch(_ => {
      console.error(_)
      document.getElementById('loader').textContent = 'Can\'t load data... Please run json-server `npm install && npm run start:json-server`'
    })

  }

  refreshTable (filter) {
    document.querySelectorAll('.books__body > tr').forEach(node => node.remove())

    const filtered = filter ? this.filterBooks(filter) : null

    this.store.books.map((book, index) => {
      if (null !== filtered && filtered.indexOf(index) < 0) {
        return
      }
      let tr = document.createElement('tr')
      Object.keys(book).map(key => {
        let td = document.createElement('td')
        td.classList.add(key)

        let value = book[key]

        if (Array.isArray(value)) {
          value = value.join(',')
        }

        td.textContent = value

        tr.appendChild(td)
      })

      let tdActions = document.createElement('td')
      const editBtn = document.createElement('button')
      editBtn.textContent = 'Edit'
      editBtn.addEventListener('click', e => this.onEdit(index))
      const deleteBtn = document.createElement('button')
      deleteBtn.textContent = 'Delete'
      deleteBtn.addEventListener('click', e => this.onDelete(index))

      tdActions.appendChild(editBtn)
      tdActions.appendChild(deleteBtn)

      tr.appendChild(tdActions)
      document.getElementsByClassName('books__body')[0].appendChild(tr)

    })
  }

  onEdit (index) {
    this.modal.open(index, this.store.books[index])
  }

  onDelete (index) {
    if (!!this.store.books[index]) {
      this.store.books.splice(index, 1)
      this.dispatchRefresh()
    }
  }

  addEventListeners () {
    document.getElementById('add-book').addEventListener('click', _ => this.modal.open())
    document.getElementById('filter-books').addEventListener('input', e => this.refreshTable(e.target.value))
  }

  dispatchRefresh () {
    document.getElementById('filter-books').dispatchEvent(new Event('input'))
  }

  filterBooks (filter) {
    filter = filter.toString().trim()

    return this.store.books.reduce((accumulator, item, index) => {
      if (Object.values(item).find(i => {
        return i.toString().includes(filter)
      })) {
        accumulator.push(index)
      }
      return accumulator
    }, [])
  }

  get modal () {
    let modal = document.querySelectorAll('custom-modal')[0]
    if (!modal) {
      modal = document.createElement('custom-modal')
      modal.genres = this.store.genres
      modal.publishers = this.store.publishers

      document.body.appendChild(modal)

      modal.addEventListener('submit-form', this.onFormSubmitted.bind(this))
    }

    return modal
  }

  onFormSubmitted (e) {
    if (e.target.index < 0) {
      this.store.books.push(e.target.book)
    } else {
      Object.assign(this.store.books, {[e.target.index]: e.target.book})
    }

    this.dispatchRefresh()
  }

  get store () {
    return this._store
  }

  set store (value) {
    this._store = value
  }

  set loader (value) {
    document.getElementById('loader').style.display = value ? 'display' : 'none'
  }

}