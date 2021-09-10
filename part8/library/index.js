const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require('./schemas/authors')
const Book = require('./schemas/books')
const User = require('./schemas/users')

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }

  type Book {
    id: ID!
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title : String!
      author : String!
      published : Int!
      genres : [String!]!
    ): Book!
    editAuthor(
      name : String!,
      setBornTo : Int!,
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Author: {
    bookCount: async (root) => await Book.countDocuments({ author: root.id })
  },
  Query: {
    bookCount: async () => await Book.estimatedDocumentCount(),
    authorCount: async () => await Author.estimatedDocumentCount(),
    allBooks: async (root, args) => args.genre
      ? await Book.find({ genres: args.genre }).populate('author')
      : await Book.find().populate('author'),
    allAuthors: async () => await Author.find(),
    me: (root, args, context) => context.currentUser
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new UserInputError('not logged in')
      }

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = await new Author({ name: args.author })
      }
      const newBook = await new Book({
        ...args,
        author
      })
      try {
        await newBook.save()
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })

      return newBook
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new UserInputError('not logged in')
      }

      try {
        return await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo },
          { new: true })
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch((error) => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to database')
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
