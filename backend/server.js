const express = require('express')
const dotenv = require('dotenv')
const products = require('./data/products')

// Creates config for dotenv
dotenv.config() // This is where define any environment variables

// Initializes express
const app = express()

// GET list of products in JSON format
app.get('/api/products', (req, res) => {
  res.json(products) // Converts the product.js into json type
})

// GET single Product
app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})

// Listens at port 5000
const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)
