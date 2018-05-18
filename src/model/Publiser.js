export default class Publisher {

  constructor ({id, name}) {
    this.id = id || name
    this.name = name
  }

  toString () {
    return this.name
  }

}