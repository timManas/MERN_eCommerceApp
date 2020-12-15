import axios from 'axios'
import { disable } from 'colors'
import { CART_ADD_ITEM } from '../constants/cardConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

  // Need to save entire CART to local storage
  // Note: Need to save it in JSON since we can only store in text
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
