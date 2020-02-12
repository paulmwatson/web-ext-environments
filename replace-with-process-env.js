module.exports = (content, vars) => {
  for (var key in vars) {
    content = content.replace(new RegExp('process.env.' + key, 'g'), process.env[key])
  }
  return content
}
