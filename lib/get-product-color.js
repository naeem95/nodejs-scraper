var url = require('url')
var getProductId = require('./get-product-id')

function getProductColor (productUrl) {
  return url.parse(productUrl, true).query[`dwvar_${getProductId(productUrl)}_color`]
}

module.exports = getProductColor
