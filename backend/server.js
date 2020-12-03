const express = require('express')
const products = require('./data/products')

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
app.listen(5000, console.log('Server is running on port 5000'))
