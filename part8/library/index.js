const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')

const Author = require('./schemas/authors')
const Book = require('./schemas/books')

const typeDefs = gql`
  type Author {
    id : ID!
    name : String!
    born : Int
    bookCount : Int!
  }

  type Book {
    id : ID!
    title : String!
    author : Author!
    published : Int!
    genres: [String!]!
  }

  type Query {
    bookCount : Int!
    authorCount : Int!
    allBooks(author : String, genre : String) : [Book!]!
    allAuthors : [Author!]!
  }

  type Mutation {
    addBook(
      title : String!
      author : String!
      published : Int!
      genres : [String!]!
    ) : Book!,
    editAuthor(
      name : String!,
      setBornTo : Int!,
    ) : Author
  }
`

const resolvers = {
  Author: {
    bookCount: (root) => books.reduce((acc, curr) => curr.author === root.name ? acc + 1 : acc, 0)
  },
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      let returnBooks = books
      if (args.author) {
        returnBooks = returnBooks.filter((book) => book.author === args.author)
      }
      if (args.genre) {
        returnBooks = returnBooks.filter((book) => book.genres.find((genre) => genre === args.genre))
      }
      return returnBooks
    },
    allAuthors: () => authors
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = await new Author({ name: args.author })
        author.save()
      }
      const newBook = await new Book({
        ...args,
        author
      })
      newBook.save()
      return newBook
    },
    editAuthor: (root, args) => {
      authors = authors.map((author) =>
        author.name === args.name
        ? { ...author, born: args.setBornTo }
        : author
      )
      return authors.find((author) => author.name === args.name)
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to database')
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
