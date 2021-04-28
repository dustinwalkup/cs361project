import express from 'express'
import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.get('/', (req, res) => {
  res.send('API is running...')
})

const searchLat = 45.5234515
const searchLng = -122.6762071

const api_key = process.env.REACT_APP_GKEY
const api_url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${searchLat},${searchLng}&radius=20000&type=atm&keyword=bitcoin&key=${api_key}`

app.get('/api/search', async (req, res) => {
  const api_res = await fetch(api_url)
  const { results } = await api_res.json()
  res.json(results)
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
