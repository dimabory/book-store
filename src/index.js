import App from './App'
import store from './store'
import {defineCustomElements} from './widgets'

defineCustomElements()

new App(store)