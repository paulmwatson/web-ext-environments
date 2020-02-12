const CopyPlugin = require('copy-webpack-plugin')
const DotenvPlugin = require('dotenv-webpack')
module.exports = (env) => {
  const dotenvPath = __dirname + '/.env.' + env

  const replaceWithProcessEnv = (content) => {
    for (var key in require('dotenv').config({ path: dotenvPath }).parsed) {
      content = content.replace(new RegExp('process.env.' + key, 'g'), process.env[key])
    }
    return content
  }

  return {
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
            transform(content) {
              return replaceWithProcessEnv(content.toString())
            }
          }
        ]
      )
    ]
  }
}