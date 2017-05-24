var url = require('url')

function getProductId(link) {
    return url.parse(link).pathname.split('.')[0].split('/')[2]
}

module.exports = getProductId
