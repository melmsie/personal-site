const express = require('express')
let path = require('path')
let app = express()
app.set('trust proxy', true)
app.set('port', 80)
const snek = require('snekfetch')
const config = require('./config.json')
/*
  // TODO: add an about page at about.melmsie.com [markdown?]
  // TODO: add a "see my tech stack" page at stack.melmsie.com [markdown?]
  // TODO: add a fully authed kid counter page at kwc.melmsie.com [MongoDB?]
*/
app.use(express.static(path.join(__dirname, '../personal-site')))

app.get('/whoami', async (req, res) => {
  // TODO: Make this pretty
  let location = await snek.get(`https://ipinfo.io/${req.ip}/geo?token=${config.ipToken}`)
  location = location.body
  let whoAmI = {
    'ipaddress': req.ip,
    'location': `${location.country}: ${location.region}`,
    'language': req.headers['accept-language'].split(',')[0],
    'software': req.headers['user-agent'].match(/\((.*?)\)/)[1]
  }
  return res.json(whoAmI)
})

app.get('/date', async (req, res) => { // TODO: [Markdown?]
  return res.send('Send a Unix timestamp, or natural language date to "/date/" and receive the opposite JSON reponse.')
})

app.get('/date/*', async (req, res) => {
  /*
  TODO: Add timezone options (as well as time with the date)
  FIXME: Make sure input is validated
  */
  let pre
  let converted
  let input = decodeURI(req.url).split('/')[2]
  if (isNaN(input)) {
    pre = new Date(input)
    converted = pre.getTime() / 1000
  } else {
    pre = new Date(input * 1000)
    converted = pre.toDateString()
  }
  const final = {
    'before': input,
    'after': converted
  }
  return res.json(final)
})

app.get('/short/*', async (req, res) => {
  return res.send('Coming soon')
})

app.use(function (req, res, next) {
  // TODO: 404 page when
  res.status(404)
  res.send('404: Page Not Found')
})

app.listen(app.get('port'), function () {
  console.log('The server is running on http://localhost:' + app.get('port'))
})
