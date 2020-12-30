import express from 'express'
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// POST - Order Items || GET all orders for Admin
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders) // calls addOrderItems when we get a '/' post request

// GET - myOrders
router.route('/myorders').get(protect, getMyOrders) // Gets the order by id

// GET - Order Id
router.route('/:id').get(protect, getOrderById) // Gets the order by id

// PUT - Updates Order after payment
router.route('/:id/pay').put(protect, updateOrderToPaid) // Gets the order by id

// PUT - Updates Order after delievered
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered) // Route order for delivery

export default router
