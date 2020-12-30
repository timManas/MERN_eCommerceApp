import axios from 'axios'
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
} from '../constants/orderConstants'

// Creates an Order Action
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    })

    // Destructure twice to get the userInfo
    const {
      userLogin: { userInfo },
    } = getState()

    // Pass token here
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // Send POST request of user by name/username/password
    const { data } = await axios.post(`/api/orders`, order, config)

    // Dispatch and send to Reducer
    dispatch({
      type: ORDER_CREATE_SUCCESS, // Successfully creates Order
      payload: data,
    })
  } catch (error) {
    // If fetching data was not succesful
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// Fetchs an Order Id
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    })

    // Destructure twice to get the userInfo
    const {
      userLogin: { userInfo },
    } = getState()

    // Pass token here
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // Send GET request of user by name/username/password
    const { data } = await axios.get(`/api/orders/${id}`, config)

    // Dispatch and send to Reducer
    dispatch({
      type: ORDER_DETAILS_SUCCESS, // Successfully creates Order
      payload: data,
    })
  } catch (error) {
    // If fetching data was not succesful
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// Pays order
export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    })

    // Destructure twice to get the userInfo
    const {
      userLogin: { userInfo },
    } = getState()

    // Pass token here
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // Send GET request of user by name/username/password
    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    )

    // Dispatch and send to Reducer
    dispatch({
      type: ORDER_PAY_SUCCESS, // Successfully creates Order
      payload: data,
    })
  } catch (error) {
    // If fetching data was not succesful
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// Deliver order
export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    })

    // Destructure twice to get the userInfo
    const {
      userLogin: { userInfo },
    } = getState()

    // Pass token here
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // Send GET request of user by name/username/password
    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      {},
      config
    )

    // Dispatch and send to Reducer
    dispatch({
      type: ORDER_DELIVER_SUCCESS, // Successfully creates Order
      payload: data,
    })
  } catch (error) {
    // If fetching data was not succesful
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// Fetch current users Paid orders
export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    })

    // Destructure twice to get the userInfo
    const {
      userLogin: { userInfo },
    } = getState()

    // Pass token here
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // Send GET request of user by name/username/password
    const { data } = await axios.get(`/api/orders/myorders`, config)

    // Dispatch and send to Reducer
    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    // If fetching data was not succesful
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// Fetch list of orders
export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    })

    // Destructure twice to get the userInfo
    const {
      userLogin: { userInfo },
    } = getState()

    // Pass token here
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // Send GET request of user by name/username/password
    const { data } = await axios.get(`/api/orders/`, config)

    // Dispatch and send to Reducer
    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    // If fetching data was not succesful
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
