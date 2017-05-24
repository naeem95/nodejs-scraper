const flatten = require('lodash.flatten')
const getDomManipulator = require('../utils/get-dom-manipulator')
const getProductsHtml = require('../lib/get-products-html')
const getProductsCount = require('../lib/get-products-count')

const categories = ['swim', 'essentials']

async function getCategoryLinks (category) {
  const count = await getProductsCount(category)
  const html = await getProductsHtml(category, count)
  const $ = getDomManipulator(html)
  return $('.product-name-container')
  .map((index, element) => {
    return $(element).find('a').attr('href')
  })
  .toArray()
}

async function getAllLinks () {
  const allLinks = await Promise.all(categories.map(category => getCategoryLinks(category)))
  return flatten(allLinks)
}

module.exports = getAllLinks
