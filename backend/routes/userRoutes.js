import express from 'express'
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// POST - register user  | GET - Fetch all users for Admin
router.route('/').post(registerUser).get(protect, admin, getUsers)

// GET list of products in JSON format
router.post('/login', authUser)

// GET User profile
router.route('/profile').get(protect, getUserProfile)

// PUT User profile
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

export default router
