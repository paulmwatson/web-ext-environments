const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const env = 'production'
module.exports = merge(common(env), {
  mode: env
})