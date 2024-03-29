import React, { useState, useEffect } from 'react'
import { useApolloClient, useLazyQuery, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import { WHO_AM_I, GET_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [message, setMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const [getMe, me] = useLazyQuery(WHO_AM_I)
  const client = useApolloClient()

  let notifyTimeoutId
  const notify = (error) => {
    setMessage(error)
    if (notifyTimeoutId) clearTimeout(notifyTimeoutId)
    notifyTimeoutId = setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map(p => p.id).includes(object.id)
    
    const dataInStore = client.readQuery({
      query: GET_BOOKS,
      variables: { genre: null }
    })

    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: GET_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
        variables: { genre: null }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useEffect(() => {
    setToken(localStorage.getItem('library-user-token'))
  }, [])

  useEffect(() => {
    if (token) {
      getMe()
    }
  }, [token])

  if (me.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          token
            ? <button onClick={() => setPage('recommend')}>recommend</button>
            : null
        }
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


      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      {
        me.data
         ? <Books
          show={page === 'recommend'}
          defaultGenre={me.data.me.favoriteGenre}
        />
        : null
      }

      <NewBook
        show={page === 'add'}
        updateCacheWith={updateCacheWith}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setError={notify}
        setPage={setPage}
      />

    </div>
  )
}

export default App
