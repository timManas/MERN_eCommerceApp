import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const router = express.Router()

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

// GET list of products in JSON format
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({}) // Find all products
    res.json(products) // Converts the product.js into json type
  })
)

// @desc    Fetch Single products
// @route   GET /api/products/:id
// @access  Public

// GET single Product
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  })
)

export default router
