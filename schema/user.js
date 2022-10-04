const { gql } = require("apollo-server");
const axios = require("axios");
// const redis = require("./config/redis");

const typeDefs = gql`
  type User {
    _id: String
    username: String
    email: String
  }

  type DeleteMessage {
    acknowledged: Boolean
    deletedCount: Int
  }

  type Query {
    findUsers: [User]
    findUserById(id: String!): User
  }

  input newUser {
    username: String!
    email: String!
    password: String!
    phoneNumber: String
    Address: String
  }

  type Mutation {
    addUser(newUser: newUser): User
    deleteUser(id: String!): DeleteMessage
  }
`;

const resolvers = {
  Query: {
    findUsers: async () => {
      try {
        const { data } = await axios.get(
          "https://docker-users.herokuapp.com/users"
        );
        return data;
      } catch (err) {
        throw err;
      }
    },
    findUserById: async (parent, args) => {
      try {
        const { data } = await axios.get(
          `https://docker-users.herokuapp.com/users/${args.id}`
        );
        return data;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    addUser: async (_, args) => {
      try {
        const { data } = await axios.post(
          `https://docker-users.herokuapp.com/users`,
          args.newUser
        );
        console.log(data);
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    deleteUser: async (parent, args) => {
      try {
        const { data } = await axios.delete(
          `https://docker-users.herokuapp.com/users/${args.id}`
        );
        console.log(data);
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  },
};

module.exports = {
  userTypeDefs: typeDefs,
  userResolvers: resolvers,
};
