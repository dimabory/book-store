import Genre from './Genre'
import Publisher from './Publiser'

export default class Book {

  constructor ({name = null, author = null, year = null, genre = [], pages = null, price = 0, amount = 0, publisher = []}) {

    this.name = name
    this.author = author
    this.year = year ? new Date(year).getFullYear() : null
    this.genre = genre.map(i => new Genre({name: i, id: i}))
    this.pages = pages
    this.price = price
    this.amount = amount
    this.publisher = publisher.map(i => new Publisher({name: i, id: i}))

  }

}