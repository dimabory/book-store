import Book from '../model/Book'
import Api from '../service/Api'

const template = `
<style>
  .modal {
    display: none;
    position: fixed;
    z-index: 1; 
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto; 
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4); 
  }
  
  .modal-header {
    background-color: #5cb85c;
    color: white;
    }

  .modal-body {
    background-color: #fefefe;
    margin: 15% auto; 
    padding: 5px;
    border: 1px solid #888;
    width: fit-content; 
  }
  .modal-content {
    padding: 20px;
  }
  
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  
  #book-form input, 
  #book-form label {
    display: block;
  }
  
  #book-form > * {
    margin-bottom: 10px;
  }
  
  #book-form button[type="submit"] {
    float: right;
  }
  
  #book-form input[required]:after {content: "*"; color: red;}
  
</style>
<div class="modal-body">
    <div class="modal-header">
      <slot name="header">
        <span class="close">&times;</span>
      </slot>
    </div>
    
    <div class="modal-content">
      <slot name="content">
        <form id="book-form">
          <label for="name">
              Name: <br><input type="text" name="name" required/>
          </label>
          <label for="name">
              Author: <br><input type="text" name="author" required/>
          </label>
          <label for="year">
              Year: <br><input type="number" min="1900" max="2099" step="1" name="year" required/>
          </label>
          <!--custom select -->
          <label for="genre">
              Genre: <br><custom-select name="genre"></custom-select> <br>
          </label>
          
          <label for="pages">
              Pages: <br><input type="number" step="1" min="0" name="pages" required/>
          </label>
          </label>
          <label for="price">
              Price: <br><input type="number" step="0.01" min="0" name="price" required/>
          </label>
          </label>
          <label for="amount">
              Amount: <br><input type="number" step="1" min="0" name="amount" required/>
          </label>
          </label>
          <!--custom select -->
          <label for="publisher">
              Publisher: <br><custom-select name="publisher" required></custom-select> <br>
          </label>
          <div>
              <button type="submit">Save</button>
          </div>
        </form>
      </slot>
    </div>
    <div class="modal-footer">
      <slot name="footer"></slot>
    </div>
</div>
`

export default class Modal extends HTMLElement {
  constructor () {
    super()

    const shadow = this.attachShadow({mode: 'open'})

    this._index = -1
    this._book = new Book({})
    this._genres = []
    this._publishers = []

    this._container = document.createElement('div')
    this._container.id = 'modal'
    this._container.classList.add('modal')

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)

    this._container.innerHTML = template


    shadow.appendChild(this._container)
  }

  static get onSubmitEvent () {
    return new CustomEvent('submit-form', {
      bubbles: true
    })
  }

  connectedCallback () {
    this._container.getElementsByClassName('close')[0].addEventListener('click', this.close)
    this.shadowRoot.getElementById('book-form').addEventListener('submit', this.onSubmitForm.bind(this))
  }

  open (index = -1, book = new Book({}), genres = this.genres, publishers = this.publishers) {
    this.index = index
    this.book = book

    this.populateForm(book, genres, publishers)

    this._container.style.display = 'block'
  }

  close () {
    this.index = -1
    this.book = new Book({})
    this._container.querySelectorAll(`input`).forEach(i => {
      i.value = ''
      i.removeAttribute('value')
      i.removeAttribute('disabled')
    })
    this._container.querySelectorAll(`custom-select`).forEach(i => i.clear())
    this._container.style.display = 'none'
  }

  populateForm (book, genres, publishers) {
    Object.keys(book).map(key => {
      const input = this._container.querySelectorAll(`[name="${key}"]`)[0]
      const value = this.book[key]
      switch (key) {
        case 'genre':
          genres.map(genre => input.push(new Option(genre.name, genre.id, false, value.some(i => genre.name === i.name))))
          break;
        case 'publisher':
          publishers.map(publ => input.push(new Option(publ.name, publ.id, false, value.some(i => publ.name === i.name))))
          input.setAttribute('required', true)
          break;
        default:
          if (value) {
            input.value = value
            console.log(this.index)
            if (this.index >=0 && key === 'amount') {
              input.setAttribute('disabled', true)
            }
          }
          input.addEventListener('input', e => {
            this.book[key] = e.target.value
          })
          break;
      }
    })
  }

  onSubmitForm (e) {
    e.preventDefault()

    const customSelect = this._container.querySelectorAll(`custom-select`);
    let isValidCustomSelect = 0

    customSelect.forEach(i => {
      i.container.dispatchEvent(new Event('change'))

      const attribute = i.getAttribute('name')

      let map = []
      switch (attribute) {
        case 'publisher':
          map = this.publishers
          break;
        case 'genre':
          map = this.genres
          break;
        default:
          break;
      }

      this.book[attribute] = map.filter(attr => {
        return i.selected.some(j => j.value === attr.name)
      })

      return i.isValid ? ++isValidCustomSelect : null
    })

    if (customSelect.length !== isValidCustomSelect) {
        return
    }

    this.dispatchEvent(Modal.onSubmitEvent)
    this.close()
  }

  get index () {
    return this._index
  }

  set index (value) {
    this._index = value
  }

  get book () {
    return this._book
  }

  set book (value) {
    this._book = value
  }

  get genres () {
    return this._genres
  }

  set genres (value) {
    this._genres = value
  }

  get publishers () {
    return this._publishers
  }

  set publishers (value) {
    this._publishers = value
  }
}
