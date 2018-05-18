const faker = require('faker')

module.exports = rand => {
  return _ => Array.from({length: rand(1, 10)}).map(_ => faker.lorem.word())
}
