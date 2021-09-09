import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { LOGIN } from '../queries'

const LoginForm = ({ show, setToken, setError, setPage }) => {
  if (!show) {
    return null
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      setPage('books')
    }
  }, [result.data])

  const onSubmit = (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        username
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
