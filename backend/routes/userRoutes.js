import express from 'express'
import { authUser } from '../controllers/userController.js'

const router = express.Router()

// GET list of products in JSON format
router.post('/login', authUser)

export default router
