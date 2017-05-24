const getHtml = require('./get-html')
const getDomManipulator = require('../utils/get-dom-manipulator')
const insertRowsAsStream = require('./insertRowsAsStream')
const getId = require('./get-product-id')
const getColor = require('./get-product-color')
const getSizes = require('./get-sizes')
const { SECRET_JSON_ELEMENT_ID } = require('../constants')
const { PROJECT_ID, DATASET_ID, TABLE_ID } = require('../config')

async function getJsonBlob (url, timestamp) {
  try {
    const html = await getHtml(url)
    const $ = getDomManipulator(html)
    const jsonElement = $(SECRET_JSON_ELEMENT_ID)
    if (!jsonElement.length) {
      // get everything manually
      const id = getId(url)
      const {
        sizes,
        availableSizes
      } = getSizes($)
      return {
        id,
        sizes: JSON.stringify(sizes),
        availableSizes: JSON.stringify(availableSizes),
        timestamp,
        color: getColor(url)
      }
    }
    const json = jsonElement.text().trim()
    const jsonBlob = JSON.parse(json)
    jsonBlob.timestamp = timestamp
    jsonBlob.sizes = JSON.stringify(jsonBlob.sizes)
    jsonBlob.availableSizes = JSON.stringify(jsonBlob.availableSizes)
    return jsonBlob
  } catch (err) {
    console.error('url: ', url)
    console.error(err.message)
  }
}

async function depositeJsonBlobs (links, timestamp, concurrency = 15) {
  try {
    console.log(`${links.length} to go...`)
    if (links.length === 0) return
    const linksCopy = [...links]
    const currentLinksBatch = linksCopy.splice(0, concurrency)
    const batchRestults = await Promise.all(currentLinksBatch.map(link => getJsonBlob(link, timestamp)))
    const normalizedResults = batchRestults.filter(result => result) // get rid of all the nulls in batchRestults
    const insertErrors = await insertRowsAsStream(DATASET_ID, TABLE_ID, normalizedResults, PROJECT_ID)
    if (insertErrors && insertErrors.length > 1) {
      console.log('Insert errors:')
    }
    return depositeJsonBlobs(linksCopy, timestamp, concurrency)
  } catch (err) {
    console.log(err.message)
    console.log(err)
  }
}

module.exports = depositeJsonBlobs
