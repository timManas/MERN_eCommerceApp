import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/middleware.js'
import connectDB from './config/db.js'
import products from './data/products.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

// This is common JS Syntax
// const express = require('express')
// const dotenv = require('dotenv')
// const products = require('./data/products')

// Creates config for dotenv
dotenv.config() // This is where define any environment variables

// Connect to DB
connectDB()

// Initializes express
const app = express()

app.use(express.json()) // allows application to accept JSON data in body

// How to fetch from dataJSON from a specific URL
// // GET list of products in JSON format
// app.get('/api/products', (req, res) => {
//   res.json(products) // Converts the product.js into json type
// })

// // GET single Product
// app.get('/api/products/:id', (req, res) => {
//   const product = products.find((p) => p._id === req.params.id)
//   res.json(product)
// })

// Fetch data from Database
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

// Error - 404 handling
app.use(notFound)

// Error Handling
app.use(errorHandler)

// Listens at port 5000
const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.green
      .inverse
  )
)
