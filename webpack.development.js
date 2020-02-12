const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const env = 'development'
module.exports = merge(common(env), {
  mode: env,
  devtool: 'source-map'
})