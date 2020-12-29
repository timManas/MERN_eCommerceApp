import express from 'express'
import {
  getProducts,
  getProductById,
  deleteProduct,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// GET list of products in JSON format
router.route('/').get(getProducts)

// GET single Product || DELETE Single Product
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct)

export default router
