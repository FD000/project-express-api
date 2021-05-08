import express, { request } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import avocadoSalesData from './data/avocado-sales.json'

//   PORT=9000 npm start 8080
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('empty placeholder')
})

app.get('/avocado', (req, res) => { 
  const { id } = req.query
  const { maxPrice } = req.query
  const { minPrice } = req.query
  const { amount } = req.query

  let filteredAvocado = avocadoSalesData

  if(maxPrice){
    filteredAvocado = filteredAvocado.filter((item) => item.averagePrice <= +maxPrice)
  }

  if(minPrice){
    filteredAvocado = filteredAvocado.filter((item) => item.averagePrice >= +minPrice)
  }

  if(amount) {
    filteredAvocado = filteredAvocado.slice(0,amount)
  }

  if(id) {
    filteredAvocado = filteredAvocado.filter((item) => item.id === +id)
  }
  res.send({ length: filteredAvocado.length, data: filteredAvocado})
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
