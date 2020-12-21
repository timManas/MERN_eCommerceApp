import axios from 'axios'
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    // When sending data, we want to send header of content type to JSON
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    // Send POST request of user by username/password
    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )

    // Dispatch and send to Reducer
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    // Set data to localstorage
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    // If fetching data was not succesful
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo') // removes userinfo from storage
  dispatch({ type: USER_LOGOUT })
}

// Registers user
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    // When sending data, we want to send header of content type to JSON
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    // Send POST request of user by name/username/password
    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    )

    // Dispatch and send to Reducer
    dispatch({
      type: USER_REGISTER_SUCCESS, // Successfully registers user
      payload: data,
    })

    dispatch({
      type: USER_LOGIN_SUCCESS, // Successfully logs in user
      payload: data,
    })

    // Set data to localstorage
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    // If fetching data was not succesful
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
