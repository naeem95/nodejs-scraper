const getAllLinks = require('./lib/get-all-links')
const depositeJsonBlobs = require('./lib/get-json-blobs')
const { INTERVAL_LENGTH } = require('./config')

getAllLinks()
.then((links) => {
  console.log('Got all links')
  depositeJsonBlobs(links, Date.now() / 1000)
    .then(() => {
      setInterval(() => depositeJsonBlobs(links, Date.now() / 1000), INTERVAL_LENGTH)
    })
})
.catch(handleError)

function handleError (err) {
  console.error(err.message)
  console.error(err.stack)
}
