import { gql } from '@apollo/client'

export const GET_AUTHORS = gql`
query {
  allAuthors {
    id
    name
    born
    bookCount
  }
}
`
export const CHANGE_BIRTHYEAR = gql`
mutation changeBirthyear($name: String!, $born: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $born
  ) {
    name
  }
}
`

export const GET_BOOKS = gql`
query {
  allBooks {
    id
    title
    author
    published
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    id
    title
    author
    published
    genres
  }
}
`
