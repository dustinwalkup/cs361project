import express from 'express'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
import cheerio from 'cheerio'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import sendMail from './mail.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config()
const app = express()

app.use(express.static(path.join(__dirname, 'build')))

app.get('/api', async (req, res) => {
  const results = await fetch(
    'http://triviabot-converter.herokuapp.com/convert?crypto1=BTC&curr1=USD'
  )
  const BTCValue = await results.json()
  res.json(BTCValue.BTC.USD)
})

const api_key = process.env.REACT_APP_GKEY

app.get('/api/search/:location', async (req, res) => {
  const location = await req.params.location.split(',')
  const searchLat = location[0]
  const searchLng = location[1]
  if (location) {
    const api_url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${searchLat},${searchLng}&radius=20000&type=atm&keyword=bitcoin&key=${api_key}`
    const api_res = await fetch(api_url)
    const { results } = await api_res.json()
    res.json(results)
  } else {
    res.status(404)
    throw new Error('Location not found')
  }
})

app.get('/api/scrape/:subject', async (req, res) => {
  const subject = req.params.subject
  const URL = `https://en.wikipedia.org/wiki/${subject}`
  const list = []
  const response = await (await fetch(URL)).text()
  const $ = cheerio.load(response)
  $('.citation a').each((idx, el) => {
    const item = $(el).next().text()
    if (item === '(PDF)') {
      list.push($(el).attr('href'))
    }
  })

  if (list.length > 0) {
    res.send(list)
  } else {
    res.send('No PDFs available')
  }
})

// Data parsing
app.use(
  express.urlencoded({
    extended: false,
  })
)
app.use(express.json())
app.post('/api/contact', (req, res) => {
  // TODO:
  const { name, email, subject, message } = req.body
  sendMail(email, subject, message, (err) => {
    if (err) {
      res.status(500).json({ message: 'Internal Error' })
    } else {
      res.json({ message: 'Message recieved' })
    }
  })
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
