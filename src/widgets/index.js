import CustomSelect from './CustomSelect'
import Modal from './Modal'

export function defineCustomElements () {
  customElements.define('custom-modal', Modal)
  customElements.define('custom-select', CustomSelect)
}

export {
  CustomSelect,
  Modal
}