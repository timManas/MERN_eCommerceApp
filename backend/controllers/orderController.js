import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc    Fetch new order
// @route   POST /api/order
// @access  Private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  // Return Error is orderItems is empty
  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No Order Item')
    return
  } else {
    // Create new order
    const order = new Order({
      orderItems,
      user: req.user._id, // Add user as well
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    // Save to DB
    const createOrder = await order.save()
    res.status(201).json(createOrder)
  }
})

export { addOrderItems }
