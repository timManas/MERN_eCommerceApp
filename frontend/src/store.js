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

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
})

const initialState = {}

const middleware = [thunk] // What does this do again ?

// Create store
// CreateStore: a Function what uses rootReducer to create store
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)) // What is compose with dev tools ?
)

export default store
