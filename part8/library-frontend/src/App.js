import React, { useState } from 'react'
import { useApolloClient } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'

const App = () => {
  const [token, setToken] = useState(null)
  const [message, setMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  let notifyTimeoutId
  const notify = (error) => {
    setMessage(error)
    if (notifyTimeoutId) clearTimeout(notifyTimeoutId)
    notifyTimeoutId = setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useState(() => {
    setToken(localStorage.getItem('library-user-token'))
  }, [])

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          token
            ? <button onClick={() => setPage('add')}>add book</button>
            : null
        }
        {
          token
            ? <button onClick={logout}>logout</button>
            : <button onClick={() => setPage('login')}>login</button>
        }
      </div>
      
      <Notify errorMessage={message} />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setError={notify}
        setPage={setPage}
      />

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App
