const BigQuery = require('@google-cloud/bigquery')

async function insertRowsAsStream (datasetId, tableId, rows, projectId) {
  const bigquery = BigQuery({
    projectId: projectId
  })
  try {
    const insertErrors = await bigquery.dataset(datasetId).table(tableId).insert(rows)
    return insertErrors
  } catch (err) {
    console.error('ERRORS')
    console.error(rows)
  }
}

module.exports = insertRowsAsStream
