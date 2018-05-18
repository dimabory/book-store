const faker = require('faker')
const rand = (min, max) => Math.floor(Math.random() * max) + min

const getData = _ => {
  return {
    name: faker.lorem.words(Math.floor(Math.random() * 3) + 1),
    author: faker.fake('{{name.firstName}}, {{name.lastName}} {{name.suffix}}'),
    year: faker.date.past(),
    genre: Array.from({
      length: rand(1, 3)
    }).map(_ => faker.lorem.word()),
    pages: faker.random.number(200),
    price: faker.commerce.price(100, 1000, 2),
    amount: faker.random.number(100),
    publisher: Array.from({
      length: rand(1, 3)
    }).map(_ => faker.lorem.words()),
  }
}

module.exports = _ => Array.from({length: rand(3, 6)}, getData)
