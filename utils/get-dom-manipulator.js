const { load } = require('cheerio')

module.exports = function getDomManipulator (html) {
  return load(html)
}
