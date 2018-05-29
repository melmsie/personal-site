const express = require('express')
let path = require('path')
let app = express()
app.set('trust proxy', true)
app.set('port', 80)
const snek = require('snekfetch')
const config = require('./config.json')

app.use(express.static(path.join(__dirname, '../personal-site')))

app.get('/whoami', async (req, res) => {
  let location = await snek.get(`https://ipinfo.io/${req.ip}/geo?token=${config.ipToken}`)
  location = location.body
  let whoAmI = {
    'ipaddress': req.ip,
    'location': `${location.country}: ${location.region}`,
    'language': req.headers['accept-language'].split(',')[0],
    'software': req.headers['user-agent'].match(/\((.*?)\)/)[1]
  }
  console.log(location.body)
  return res.json(whoAmI)
})

app.use(function (req, res, next) {
  res.status(404)
  res.send('404: Page Not Found')
})

app.listen(app.get('port'), function () {
  console.log('The server is running on http://localhost:' + app.get('port'))
})
