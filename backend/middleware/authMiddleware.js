// Note: This middleware validates the token
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  // We are putting the token in the header
  let token

  // Check if token is valid and found
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1] // Fetch the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET) // Verify the token
      console.log('Decoded: ' + decoded)

      req.user = await User.findById(decoded.id).select('-password') // Gets all user request and places it req.user

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not Authorized, token failed')
    }
  }

  // If token DNE
  if (!token) {
    res.status(401)
    throw new Error('Not Authorized, no token')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not Authorized as an admin')
  }
}

export { protect, admin }
