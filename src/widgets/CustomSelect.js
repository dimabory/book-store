class CustomSelect extends HTMLElement {
  constructor () {
    super()

    const selectClassName = '.custom-select'

    // init items
    this._items = []

    // attach shadow DOM
    const shadow = this.attachShadow({mode: 'open'})
    shadow.innerHTML = `
                <style>
                    ${selectClassName} {
                        padding: 10px;
                    }
                </style>
    `

    // create select DOM element
    const el = document.createElement('select')
    el.classList.add(selectClassName)

    this.container = el

    this.addItem = this.addItem.bind(this)

    shadow.appendChild(this.container)
  }

  addItem (value) {
    this._items.push(value)

    this.updateView()
  }

  connectedCallback () {
    console.log('Connected custom-select')
    this.updateView()
  }

  attributeChangedCallback (name, oldValue, newValue) {
    console.log('custom-select element attributes changed.')
  }

  get items () {
    return this._items
  }

  updateView () {
    this.container.innerHTML = `${this._items.map(item => `<option class="custom-select--item">${item}</option>`).join('')}`
  }
}

customElements.define('custom-select', CustomSelect)

export default CustomSelect