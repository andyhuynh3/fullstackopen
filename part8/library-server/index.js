const {
  ApolloServer, gql, UserInputError, AuthenticationError,
} = require('apollo-server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');
const config = require('./utils/config');
const logger = require('./utils/logger');

const JWT_SECRET = 'MY_SECRET';

mongoose.set('useFindAndModify', false);

const { MONGODB_URI } = config;
logger.info(`Connecting to ${MONGODB_URI}`);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error(`Error connecting to MongoDB: ${error}`);
  });

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    bookCount: Int!
    born: Int
    id: ID!
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

  input AuthorInput {
    name: String!
    born: Int
  }

  type Mutation {
    addBook(
      title: String!
      author: AuthorInput!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
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
`;

const resolvers = {
  Query: {
    bookCount: async () => {
      const books = await Book.find({});
      return books.length;
    },
    authorCount: async () => {
      const authors = await Author.find({});
      return authors.length;
    },
    allBooks: async (root, args) => {
      const query = {};
      if (args.genre) {
        query.genres = { $in: [args.genre] };
      }
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        query.author = author ? author._id : null;
      }
      const booksToReturn = await Book.find(query).populate('author', {});
      return booksToReturn;
    },
    allAuthors: async (root, args) => {
      let updatedAuthors = [];
      const authors = await Author.find({});
      const books = await Book.find({}).populate('author');
      // eslint-disable-next-line no-restricted-syntax
      for (const author of authors) {
        const bookCount = books.filter((book) => book.author.name === author.name).length;
        updatedAuthors = [...updatedAuthors, { name: author.name, born: author.born, bookCount }];
      }
      return updatedAuthors;
    },
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const { currentUser } = context;
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }
      const authorId = null;
      args.author = JSON.parse(JSON.stringify(args.author));
      const authors = await Author.find({});
      let matchingAuthor = authors.find((author) => author.name === args.author.name);
      if (!matchingAuthor) {
        const author = new Author({ ...args.author });
        try {
          await author.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args.author,
          });
        }
        matchingAuthor = author;
      }
      const book = new Book({ ...args, author: matchingAuthor._id });
      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      book.author = matchingAuthor;
      return book;
    },
    editAuthor: async (root, args, context) => {
      const { currentUser } = context;
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }
      const author = await Author.findOne({ name: args.name });
      if (author) {
        author.born = args.setBornTo;
        try {
          await author.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
        return author;
      }
      return null;
    },
    createUser: async (root, args) => {
      const { username, favoriteGenre } = args;
      const user = new User({ username, favoriteGenre });
      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== 'secret') {
        throw new UserInputError('Wrong credentials');
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET,
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
