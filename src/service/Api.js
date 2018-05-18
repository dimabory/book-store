import { api_url } from '../config'

export default class Api {

  static get books () {
    return this.fetchJson(`${api_url}/books`)
  }

  static get publishers () {
    return this.fetchJson(`${api_url}/publishers`)
  }

  static get genres () {
    return this.fetchJson(`${api_url}/genres`)
  }

  static fetchJson (url) {
    return fetch(url).then(response => {
      return response.json()
    })
  }

}