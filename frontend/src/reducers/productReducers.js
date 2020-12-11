// Note: Reducers are functions which take in initial state and an action
// Returns that specific part of the global store
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from '../constants/producConstants.js'

export const productListReducer = (state = { products: [] }, action) => {
  // remember actions are objects which contain type and payload
  // Send appropriate response depending on the action
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, product: action.payload }
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
