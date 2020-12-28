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

// @desc    Get Order By ID
// @route   GET /api/order/:id
// @access  Private

const getOrderById = asyncHandler(async (req, res) => {
  // Fetch order
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to paid
// @route   GET /api/order/:id/pay
// @access  Private

const updateOrderToPaid = asyncHandler(async (req, res) => {
  // Fetch order
  const order = await Order.findById(req.params.id)

  // If order is successfully paid, we modify the data
  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      // Comes from paypal result
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

export { addOrderItems, getOrderById, updateOrderToPaid }
