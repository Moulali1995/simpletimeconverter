const express = require('express')
const app = express()
var cors = require('cors')
app.use(cors())
app.get('/api/timestamp/', (req, res) => {
  var d2 = new Date()
  return res.json({ 'unix': d2.getTime(), 'utc': d2.toUTCString() })
})

app.get('/api/timestamp/:date_string', function (request, response) {
  var date = request.params.date_string
  var d = new Date(date)
  if (d !== 'Invalid Date' && date.match(/\d{4}-\d{2}-\d{2}/)) {
    return response.json({ 'unix': d.getTime(), 'utc': d.toUTCString() })
  } else
  if (date.match(/^\d{10}/)) {
    (date.toString().length === 10) ? date *= 1000 : date *= 1
    console.log('epoch')
    const epochtime = new Date(date)

    return response.json({ 'unix': date, 'utc': epochtime.toUTCString() })
  } else {
    return response.json('Invalid Date')
  }
})
app.listen(3001)
