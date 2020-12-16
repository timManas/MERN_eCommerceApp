import express from 'express'
import {
  getProducts,
  getProductById,
} from '../controllers/productController.js'

const router = express.Router()

// GET list of products in JSON format
router.route('/').get(getProducts)

// GET single Product
router.route('/:id').get(getProductById)

export default router
