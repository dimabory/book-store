const path = require('path')

const config = {
  mode: 'development',
  devServer: {
    contentBase: [path.join(__dirname, 'public')],
    compress: true,
    port: 9000,
    hot: true,
    lazy: false,
    index: 'index.html',
    watchContentBase: true
  },
  entry: ['./src/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/dist')
  }
}

module.exports = config