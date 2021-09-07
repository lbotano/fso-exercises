import React from 'react'
import { useQuery, gql } from '@apollo/client'

import ChangeAuthor from './ChangeAuthor'

const Authors = (props) => {
  if (!props.show) {
    return null
  }

  const QUERY = gql`
  query {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
  `

  const authors = useQuery(QUERY)

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
