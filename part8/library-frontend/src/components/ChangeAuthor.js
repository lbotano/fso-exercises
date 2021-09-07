import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'

const ChangeAuthor = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const MUTATION = gql`
  mutation changeBirthyear($name: String!, $born: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $born
    ) {
      id
      name
      born
      bookCount
    }
  }
  `

  const [updateAuthor] = useMutation(MUTATION)

  const onSubmit = (event) => {
    event.preventDefault()
    updateAuthor({ variables: {
      name,
      born: parseInt(born, 10)
    } })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={onSubmit}>
        name
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)} />
        <br />
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
