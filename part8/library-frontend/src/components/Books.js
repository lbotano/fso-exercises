import React from 'react'
import { useQuery, gql } from '@apollo/client'

const Books = (props) => {
  if (!props.show) {
    return null
  }

  const QUERY = gql`
  query {
    allBooks {
      id
      title
      author
      published
    }
  }
  `
  const books = useQuery(QUERY)

  if (books.loading) {
    return (
      <div>
        loading...
      </div>
    )
  }

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
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books
