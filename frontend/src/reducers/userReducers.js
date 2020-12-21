import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
  // remember actions are objects which contain type and payload
  // Send appropriate response depending on the action
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

// Note: You will need the USER_LOGOUT !!!!
// If you remove this, if the user logs out and tries to re-register, it will redirect to home page instead of Registation page
// Why ? Because the Redux still has userInfoState in userRegister Object while in
// userLogin its userInflo returns empty object
//
export const userRegisterReducer = (state = {}, action) => {
  // remember actions are objects which contain type and payload
  // Send appropriate response depending on the action
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}
