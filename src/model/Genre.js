export default class Genre {

  constructor ({id, name}) {
    this.id = id || name
    this.name = name
  }

  toString () {
    return this.name
  }

}