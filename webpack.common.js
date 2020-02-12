const CopyPlugin = require('copy-webpack-plugin')
const DotenvPlugin = require('dotenv-webpack')
const dotenvPath = __dirname + '/.env.' + (process.env.npm_lifecycle_script.includes('production') ? 'production' : 'development')

const replaceWithProcessEnv = (content) => {
  for (var key in require('dotenv').config({ path: dotenvPath }).parsed) {
    content = content.replace(new RegExp('process.env.' + key, 'g'), process.env[key])
  }
  return content
}

module.exports = {
  plugins: [
    new DotenvPlugin(
      {
        path: dotenvPath,
        safe: true
      }
    ),
    new CopyPlugin(
      [
        {
          from: 'src/manifest.json',
          transform(content, path) {
            return replaceWithProcessEnv(content.toString())
          }
        }
      ]
    )
  ]
}
