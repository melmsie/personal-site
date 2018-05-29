const express = require('express')
let path = require('path')
let app = express()

app.set('port', 80)

app.use(express.static(path.join(__dirname, '../personal-site')))

app.use(function (req, res, next) {
  res.status(404)
  res.send('404: Page Not Found')
})

app.listen(app.get('port'), function () {
  console.log('The server is running on http://localhost:' + app.get('port'))
})