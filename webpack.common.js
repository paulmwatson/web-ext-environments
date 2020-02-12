const CopyPlugin = require('copy-webpack-plugin')
const DotenvPlugin = require('dotenv-webpack')
const replaceWithProcessEnv = require('./replace-with-process-env.js')

module.exports = (env) => {
  const dotenvPath = __dirname + '/.env.' + env
  const env_vars = require('dotenv').config({ path: dotenvPath }).parsed
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
              return replaceWithProcessEnv(content.toString(), env_vars)
            }
          }
        ]
      )
    ]
  }
}