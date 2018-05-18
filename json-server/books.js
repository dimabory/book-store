const faker = require('faker')

const getData = (rand, genres, publishers) => {

  return {
    name: faker.lorem.words(Math.floor(Math.random() * 3) + 1),
    author: faker.fake('{{name.firstName}}, {{name.lastName}} {{name.suffix}}'),
    year: faker.date.past(),
    genre: genres.slice(rand(0, genres.length), genres.length),
    pages: faker.random.number(200),
    price: faker.commerce.price(100, 1000, 2),
    amount: faker.random.number(100),
    publisher: publishers.slice(rand(0, publishers.length), publishers.length),
  }
}

module.exports = (rand, genres, publishers) => {
  return _ => Array.from({length: rand(3, 6)}).map(i => getData(rand, genres, publishers))
}
