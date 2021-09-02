import loginService from '../services/login'
import blogService from '../services/blogs'
import { notify } from './notificationReducer'

const defaultState = null

const loginReducer = (state = defaultState, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  case 'LOGOUT':
    return defaultState
  default:
    return state
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(username, password)
      window.localStorage.setItem('loggedBlogListUser', JSON.stringify(user.data))
      dispatch(setUser(user.data))
    } catch (error) {
      console.error(error)
      if (error.response && error.response.status === 401) {
        dispatch(notify('Wrong username or password', true))
      } else {
        dispatch(notify('Cannot login: server might not be running', true))
      }
    }
  }
}

export const setUser = (user) => {
  blogService.setToken(user.token)
  return {
    type: 'SET_USER',
    data: user
  }
}

export const logout = () => {
  window.localStorage.removeItem('loggedBlogListUser')
  return {
    type: 'LOGOUT'
  }
}

export default loginReducer
