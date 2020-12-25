import express from 'express'
import { addOrderItems } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// POST - Order Items
router.route('/').post(protect, addOrderItems) // calls addOrderItems when we get a '/' post request

export default router
