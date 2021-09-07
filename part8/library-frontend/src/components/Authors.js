import React from 'react'
import { useQuery } from '@apollo/client'

import { GET_AUTHORS } from '../queries'

import ChangeAuthor from './ChangeAuthor'

const Authors = (props) => {
  if (!props.show) {
    return null
  }

  const authors = useQuery(GET_AUTHORS)

  if (authors.loading) {
    return (
      <div>
        loading...
      </div>
    )
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <ChangeAuthor />
    </div>
  )
}

export default Authors
