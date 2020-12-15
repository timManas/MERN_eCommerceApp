import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cardConstants'

export const cardReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      const existItem = state.cartItems.find((x) => x.product === item.product)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        }
      } else {
        return {
          ...state, // Returns whatever our state is
          cartItems: [...state.cartItems, item], // adds item to the cart
        }
      }
    case CART_REMOVE_ITEM:
      // Filter out the item to be removed
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      }

    default:
      return state
  }
}
