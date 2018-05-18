const faker = require('faker')

const rand = (min, max) => Math.floor(Math.random() * max) + min

module.exports = _ => Array.from({length: rand(1, 3)}).map(_ => faker.lorem.word())
