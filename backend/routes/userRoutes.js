import express from 'express'
import {
  authUser,
  registerUser,
  getUserProfile,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// POST - register user
router.route('/').post(registerUser)

// GET list of products in JSON format
router.post('/login', authUser)

// GET User profile
router.route('/profile').get(protect, getUserProfile)

export default router
