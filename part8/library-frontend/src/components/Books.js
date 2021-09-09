import React, { useState } from 'react'
import { useQuery } from '@apollo/client'

import { GET_BOOKS } from '../queries'

const Books = ({ show, defaultGenre = null }) => {
  if (!show) {
    return null
  }

  const books = useQuery(GET_BOOKS)
  const [selectedGenre, selectGenre] = useState(defaultGenre)

  if (books.loading) {
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
            !selectedGenre || a.genres.indexOf(selectedGenre) >= 0
              ? (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              )
              : null
          )}
        </tbody>
      </table>
      { selectedGenre }
      <div>
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
    </div>
  )
}

export default Books
