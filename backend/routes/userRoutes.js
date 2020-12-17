import express from 'express'
import { authUser, getUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// GET list of products in JSON format
router.post('/login', authUser)

router.route('/profile').get(protect, getUserProfile)

export default router
