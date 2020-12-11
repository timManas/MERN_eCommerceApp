// These are action creators
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from '../constants/producConstants'

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
