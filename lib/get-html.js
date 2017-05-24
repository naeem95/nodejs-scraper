const { get } = require('axios')

module.exports = async function getHtml (url) {
  try {
    const { data: html } = await get(url)
    return html
  } catch (err) {
    throw err
  }
}
