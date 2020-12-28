import express from 'express'
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
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

// DELETE User | GET user by Id | PUT Update user by Id from Admin
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

export default router
