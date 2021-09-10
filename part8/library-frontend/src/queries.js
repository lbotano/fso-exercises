import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  id
  title
  author {
    name
  }
  genres
}
`

export const BOOK_ADDED = gql`
subscription {
  bookAdded {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const LOGIN = gql`
mutation getCredentials($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`

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
query getBooks($genre: String) {
  allBooks(genre: $genre) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const WHO_AM_I = gql`
query {
  me {
    favoriteGenre
  }
}
`
