import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'

import { GET_BOOKS } from '../queries'

const Books = ({ show, defaultGenre = null }) => {
  if (!show) {
    return null
  }

  const [getBooks, books] = useLazyQuery(GET_BOOKS)
  const [selectedGenre, selectGenre] = useState(defaultGenre)

  useEffect(() => {
    getBooks({ variables: { genre: selectedGenre } })
  }, [selectedGenre])

  if (books.loading || !books.data) {
    return (
      <div>
        loading...
      </div>
    )
  }

  const genres = books.data.allBooks.reduce((accGenres = [], book) => (
    accGenres.concat(book.genres.find((b) => accGenres.indexOf(b) < 0))
  ), [])

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.data.allBooks.map(a =>
            (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
        {
          defaultGenre === null
            ? <div>
              {
                genres.map((genre) => (
                  <button key={genre} onClick={() => selectGenre(genre)}>
                    {genre}
                  </button>
                ))
              }
              <button onClick={() => selectGenre(null)}>
                all genres
              </button>
            </div>
            : null
        }
    </div>
  )
}

export default Books
