import express from 'express'
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// POST - Order Items
router.route('/').post(protect, addOrderItems) // calls addOrderItems when we get a '/' post request

// GET - Order Id
router.route('/:id').get(protect, getOrderById) // Gets the order by id

// PUT - Updates Order after payment
router.route('/:id/pay').put(protect, updateOrderToPaid) // Gets the order by id

export default router
