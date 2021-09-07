import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import Select from 'react-select'

import { GET_AUTHORS, CHANGE_BIRTHYEAR } from '../queries'

const ChangeAuthor = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const authors = useQuery(GET_AUTHORS).data.allAuthors

  const [updateAuthor] = useMutation(CHANGE_BIRTHYEAR, {
    refetchQueries: [ { query: GET_AUTHORS } ]
  })

  const onSubmit = (event) => {
    event.preventDefault()
    updateAuthor({
      variables: {
        name: name.value,
        born: parseInt(born, 10)
      }
    })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={onSubmit}>
        <Select
          defaultValue={authors ? authors[0] : ''}
          onChange={setName}
          options={
            authors.map((author) => (
              { value: author.name, label: author.name }
            ))
          }
        />
        born
        <input
          type="number"
          value={born}
          onChange={(event) => setBorn(event.target.value)} />
        <br />
        <input type="submit" value="update author" />
      </form>
    </div>
  )
}

export default ChangeAuthor
