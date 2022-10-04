const { gql } = require("apollo-server");

const books = [
  {
    id: "1",
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    id: "2",
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const typeDefs = gql`
  type Book {
    id: ID
    title: String
    author: String
  }

  type Query {
    findBooks: [Book]
    findBookById(id: ID!): Book
  }

  input newBook {
    title: String!
    author: String!
  }

  type Mutation {
    addBook(newBook: newBook): Book
  }
`;

const resolvers = {
  Query: {
    findBooks: () => {
      return books;
    },
    findBookById: async (_, args) => {
      try {
        const result = books.filter((book) => book.id == args.id);
        return result[0];
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    addBook: (_, args) => {
      books.push({
        id: books.length + 1,
        title: args.newBook.title,
        author: args.newBook.author,
      });
      return books[books.length - 1];
    },
  },
};

module.exports = {
  bookTypeDefs: typeDefs,
  bookResolvers: resolvers,
};
