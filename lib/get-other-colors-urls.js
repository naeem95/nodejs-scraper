const { COLOR_SWITCHER_ID } = require('../constants')
const getDomManipulator = require('../utils/get-dom-manipulator')

function getOtherColorsUrls (html) {
  const $ = getDomManipulator(html)
  const urls = $(COLOR_SWITCHER_ID).children().map(function (idx, element) {
    return $(element).attr('value')
  })
  return urls.toArray().filter((url, index) => index > 0)
}

module.exports = getOtherColorsUrls
