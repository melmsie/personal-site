const express = require('express')
let path = require('path')
let app = express()
app.set('trust proxy', true)
app.set('port', 80)

app.use(express.static(path.join(__dirname, '../personal-site')))

app.get('/whoami', async (req, res) => {
  let whoAmI = {
    'ipaddress': req.ip,
    'language': req.headers['accept-language'].split(',')[0],
    'software': req.headers['user-agent'].match(/\((.*?)\)/)[1]
  }
  console.log(whoAmI)
  return res.json(whoAmI)
})

app.use(function (req, res, next) {
  res.status(404)
  res.send('404: Page Not Found')
})

app.listen(app.get('port'), function () {
  console.log('The server is running on http://localhost:' + app.get('port'))
})
