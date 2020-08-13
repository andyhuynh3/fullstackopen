const { ApolloServer, gql } = require('apollo-server');
const { v1: uuid } = require('uuid');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');
const config = require('./utils/config');
const logger = require('./utils/logger');

// let authors = [
//   {
//     name: 'Robert Martin',
//     id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
//     born: 1963,
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
//     born: 1821,
//   },
//   {
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
//   },
//   {
//     name: 'Sandi Metz', // birthyear not known
//     id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
//   },
// ];

// const books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
//     genres: ['refactoring'],
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
//     genres: ['agile', 'patterns', 'design'],
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
//     genres: ['refactoring'],
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
//     genres: ['refactoring', 'patterns'],
//   },
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
//     genres: ['refactoring', 'design'],
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
//     genres: ['classic', 'crime'],
//   },
//   {
//     title: 'The Demon ',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
//     genres: ['classic', 'revolution'],
//   },
// ];

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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
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
  },
  Mutation: {
    addBook: async (root, args) => {
      const authorId = null;
      args.author = JSON.parse(JSON.stringify(args.author));
      const authors = await Author.find({});
      let matchingAuthor = authors.find((author) => author.name === args.author.name);
      if (!matchingAuthor) {
        const author = new Author({ ...args.author });
        await author.save();
        matchingAuthor = author;
      }
      console.log(authorId);
      const book = new Book({ ...args, author: matchingAuthor._id });
      await book.save();
      book.author = matchingAuthor;
      return book;
    },
    editAuthor: (root, args) => {
      const author = authors.find((author) => author.name === args.name);
      if (author) {
        const updatedAuthor = { ...author, born: args.setBornTo };
        authors = authors.map((author) => (author.name === args.name ? updatedAuthor : author));
        return updatedAuthor;
      }
      return null;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
