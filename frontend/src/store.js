// Note: Stores are object
// Stores are mega state that is accessed and updated by itsown functions
// This is where we connect all our reducers and middlware
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers.js'
import { cardReducer } from './reducers/cartReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cardReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
})

// Fetch items from localStore if ANY
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

// Fethc user info from localStorage if ANY
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

// This is where we get our cartItes, tokens, userInfo
const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk] // What does this do again ?

// Create store
// CreateStore: a Function what uses rootReducer to create store
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)) // What is compose with dev tools ?
)

export default store
