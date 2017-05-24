const getHtml = require('./get-html')

async function getProductsHtml (category, size) {
  const html = await getHtml(`http://world.dvf.com/${category}/all/?sz=${size}&start=0&format=page-element`)
  return html
}

module.exports = getProductsHtml
