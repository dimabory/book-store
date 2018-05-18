const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()

const rand = (min, max) => Math.floor(Math.random() * max) + min

const publishers = require('./publishers')(rand)()
const genres = require('./genres')(rand)()


const books = require('./books')(rand, genres, publishers)

server.use(middlewares)

server.get('/books', (req, res) => {
  res.jsonp(books())
})

server.get('/genres', (req, res) => {
  res.jsonp(genres)
})

server.get('/publishers', (req, res) => {
  res.jsonp(publishers)
})

server.listen(3001, () => {
  console.log('JSON Server is running')
  console.log('Publishers:', publishers)
  console.log('Genres:', genres)
})