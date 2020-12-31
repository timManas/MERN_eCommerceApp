import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/middleware.js'
import connectDB from './config/db.js'
import products from './data/products.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

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

// Run Morgan in developmenet Mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Fetch data from Database
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

// Routes for paypal req/res
app.get(
  '/api/config/paypal',
  (req, res) => res.send(process.env.PAYPAL_CLIENT_ID) // When we hit this route, we fetch this Client
)

// Make the upload folder static
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// RUN THIS ONLY IN PRODUCTION MODE
if (process.env.NODE_ENV === 'production') {
  // Set the 'build' folder as a static folder
  // Why ? So we can access the build folder and load the index.html
  app.use(express.static(path.join(__dirname, '/frontend/build'))) // set frontend folder as a static folder

  // Send the index.html file if on Production
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('API is running ....')
  })
}

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
