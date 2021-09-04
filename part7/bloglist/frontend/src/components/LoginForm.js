import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Form, Button } from 'react-bootstrap'

import Notification from './Notification'
import { login } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <Form id="login" onSubmit={(event) => {
        event.preventDefault()
        dispatch(login(username, password))
      }} >
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            id="login-username"
            type="text"
            value={username}
            onChange={ event => setUsername(event.target.value) }
            placeholder="Enter your username" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            id="login-pass"
            type="password"
            value={password}
            onChange={ event => setPassword(event.target.value) }
            placeholder="Enter your password" />
        </Form.Group>
        <Button variant="primary" id="login-submit" type="submit">
          Login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
