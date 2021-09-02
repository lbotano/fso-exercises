import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Notification from './Notification'
import { login } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <h2>Log in to application</h2>
      <Notification />
      <form id="login" onSubmit={(event) => {
        event.preventDefault()
        dispatch(login(username, password))
      }} >
        username
        <input
          id="login-username"
          type="text"
          value={username}
          onChange={ event => setUsername(event.target.value) } />
        <br />
        password
        <input
          id="login-pass"
          type="password"
          value={password}
          onChange={ event => setPassword(event.target.value) } />
        <br />
        <input id="login-submit" type="submit" value="login" />
      </form>
    </>
  )
}

export default LoginForm
