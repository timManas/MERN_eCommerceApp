// Note: Stores are object
// Stores are mega state that is accessed and updated by itsown functions
// This is where we connect all our reducers and middlware
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer } from './reducers/productReducers.js'

const reducer = combineReducers({
  productList: productListReducer,
})

const initialState = {}

const middleware = [thunk] // What does this do again ?

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
