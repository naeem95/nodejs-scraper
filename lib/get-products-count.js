const getHtml = require('./get-html')
const getDomManipulator = require('../utils/get-dom-manipulator')

async function getProductsCount (category) {
  const html = await getHtml(`http://world.dvf.com/${category}/all/`)
  const $ = getDomManipulator(html)
  return $('#main .results.plp__results').text().replace('\n', '').split(' ')[0]
}

module.exports = getProductsCount
