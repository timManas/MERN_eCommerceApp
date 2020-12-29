// Note: Actions are objects containing a type and payload
// Used to tell reducer how to update the store
import axios from 'axios'
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
} from '../constants/productConstants'

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST }) // Sending request`

    const { data } = await axios.get('/api/products')

    // At this point, we have the product data from the backend
    dispatch({
      // Fetching the data was successful
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    // If fetching data was not succesful
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST }) // Sending request`

    const { data } = await axios.get(`/api/products/${id}`)

    // At this point, we have the product data from the backend
    dispatch({
      // Fetching the data was successful
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    // If fetching data was not succesful
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// Delete Product by Admin
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
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

    // Send DELETE request for product
    await axios.delete(`/api/products/${id}`, config)

    // Dispatch and send to Reducer
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    })
  } catch (error) {
    // If fetching data was not succesful
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// Create Product by Admin
export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
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

    // Send Post request for product
    const { data } = await axios.post(`/api/products`, {}, config)

    // Dispatch and send to Reducer
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    // If fetching data was not succesful
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// Update Product by Admin
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
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

    // Send Post request for product
    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    )

    // Dispatch and send to Reducer
    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    // If fetching data was not succesful
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
