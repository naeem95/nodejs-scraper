const { SIZE_SELECTOR_CLASS } = require('../constants')
module.exports = function getSizes ($) {
  const selector = $(SIZE_SELECTOR_CLASS)
  if (!selector.length) {
    throw new Error('Page not found')
  }
  const rawSizes = selector
    .find('option')
    .map((idx, optionElement) => $(optionElement).text())
    .toArray()
    .slice(1)
    .map((size) => {
      size = size.trim()
      size = size.replace(/Size: /i, '')
      return size
    })
  return {
    sizes: rawSizes.map(size => size.replace(/ - Out of Stock/i, '')),
    availableSizes: rawSizes.filter((size) => !size.includes('Out of Stock'))
  }
}
