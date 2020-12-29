import express from 'express'
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// GET list of products in JSON format || Create (POST) new Product
router.route('/').get(getProducts).post(protect, admin, createProduct)

// GET single Product || DELETE Single Product || Update Single Product
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

export default router
