export default class CustomSelect extends HTMLElement {
  constructor () {
    super()

    const selectClassName = 'custom-select'

    // init items
    this._items = []
    this._isValid = true

    const shadow = this.attachShadow({mode: 'open'})
    shadow.innerHTML = `
                <style>
                    .${selectClassName} {
                        padding: 5px;
                        width: 100%;
                    }
                    .error {
                        display: none;
                        color: #ff2e31;
                    }
                </style>
    `

    const el = document.createElement('select')
    el.setAttribute('multiple', true)
    el.classList.add(selectClassName)

    this._container = el

    this._container.addEventListener('change', e => {
      if (e.target.hasAttribute('required')) {
        this.isValid = this.selected.length
      }
    })

    this.push = this.push.bind(this)
    this.clear = this.clear.bind(this)

    shadow.appendChild(this._container)

    const error = document.createElement('span')
    error.classList.add('error')
    error.textContent = 'Invalid value'

    shadow.appendChild(error)
  }

  pop () {
    this._items = this._items.pop()
    this.updateView()
  }

  push (item) {
    if (item instanceof Option) {
      this._items.push(item)
    } else {
      const {text, value, defaultSelected, selected} = item
      this._items.push(new Option(text, value, defaultSelected, selected))
    }

    this.updateView()
  }

  static get observedAttributes () {return ['disabled', 'required'] }

  connectedCallback () {
    this.updateView()
  }

  attributeChangedCallback (name, oldValue, newValue) {
    switch (name) {
      case 'disabled':
        this._container.disabled = true
        break
      case 'required':
        this._container.required = true
        break
      default:

        break
    }
  }

  clear () {
    this._items = []
    this.isValid = true
  }

  get isValid () {
    return this._isValid
  }

  set isValid (value) {
    this._isValid = value
    this.shadowRoot.querySelectorAll('span.error')[0].style.display = !this.isValid ? 'block' : 'none'
  }

  get items () {
    return this._items
  }

  get selected () {
    return this._items.filter(item => item.selected)
  }

  get container () {
    return this._container
  }

  updateView () {
    this._container.innerHTML = null

    this._items.map(item => {
      item.classList.add('custom-select--item')
      this._container.appendChild(item)
    })
  }
}