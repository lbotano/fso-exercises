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
    bookCount: async () => await Book.estimatedDocumentCount(),
    authorCount: async () => await Author.estimatedDocumentCount(),
    allBooks: async (root, args) => await Book.find(),
    allAuthors: async () => await Author.find()
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
    editAuthor: async (root, args) => (
      await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true })
    )
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
