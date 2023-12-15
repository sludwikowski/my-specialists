const { createWebpackAliases } = require('./webpack.helpers')

module.exports = createWebpackAliases({
  '@assets': 'public',
  '@src': 'src',
})
