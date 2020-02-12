# web-ext-environments

Example code for developing browser extensions with [web-ext](https://github.com/mozilla/web-ext) with multiple environments (`development`, `production`) while retaining reloading in development. This way you can develop and build extensions with different service URLS, API secrets etc.

The takeaway is to add [npm](https://www.npmjs.com/) and [webpack](https://github.com/webpack/webpack) with [dotenv-webpack](https://github.com/mrsteele/dotenv-webpack), [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin), and [concurrently](https://github.com/kimmobrunfeldt/concurrently) plugins.

- `dotenv-webpack` will replace `process.env` occurrences in JavaScript files. e.g. 
```javascript
// ./src/index.js
console.log(process.env.API_BASE_URL)

// webpack => ./dist/main.js
console.log('http://127.0.0.1:8000/v1/')
```
- `copy-webpack-plugin` is used to replace `process.env` occurences in `manifest.json`. e.g.
```javascript
// ./src/manifest.json
...
"permissions": [
  "tabs",
  "process.env.API_BASE_URL*"
],
...

// webpack => ./dist/manifest.json
...
"permissions": [
  "tabs",
  "https://api.example.test/v1/*"
],
...
```
- `concurrently` is used to run `webpack --watch` mode and `web-ext run`.

My example uses `.env.development` and `.env.production` files (not checked in) to configure `API_BASE_URL`. See `.env.example` for an example. 

You can also have different webpack configuration per environment based on `webpack.development.js` and `webpack.production.js` which are meged with `webpack.common.js`.

## Improvements

You'll notice `replaceWithProcessEnv` effectively does what `dotenv-webpack` does but the latter doesn't work on non-entry files like `manifest.json`. Ideally `dotenv-webpack` would be extended to support all files processed by webpack.

## Alternatives

A simpler alternative to all of this is a bash script that rewrites `manifest.json` and `src/index.js` but in the long run you'll likely want webpack features for developing more complex extensions.

## Local Development

### Setup
- `echo "API_BASE_URL='http://127.0.0.1:8000/v1/'" > .env.development`
- `echo "API_BASE_URL='https://api.example.test/v1/'" > .env.production`
- `npm i`

### Usage
- `npm run dev`

## Build
- `npm run build`
- `web-ext run --source-dir dist`