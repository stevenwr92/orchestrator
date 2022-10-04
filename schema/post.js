const { gql } = require("apollo-server");
const axios = require("axios");
const redis = require("../config/redis");

const typeDefs = gql`
  type Category {
    id: ID
    name: String
  }

  type Tag {
    id: ID
    name: String
  }

  type Post {
    id: ID
    UserMongoId: ID
    title: String
    content: String
    imgUrl: String
    Category: Category
    Tags: [Tag]
    createdAt: String
  }

  type SuccessAdd {
    message: String
  }

  type SuccessDelete {
    message: String
  }
  type User {
    username: String
  }

  type PostById {
    title: String
    content: String
    imgUrl: String
    Category: Category
    Tags: [Tag]
    createdAt: String
    User: User
  }

  type Query {
    findPosts: [Post]
    findPostById(id: Int!): PostById
  }

  input newPost {
    title: String!
    content: String!
    imgUrl: String!
    categoryId: Int!
    name: String!
    UserMongoId: String!
  }

  type Mutation {
    addPost(newPost: newPost): SuccessAdd
    editPost(id: Int!, newPost: newPost): SuccessAdd
    deletePost(id: Int!): SuccessDelete
  }
`;

const resolvers = {
  Query: {
    findPosts: async () => {
      try {
        const postCache = await redis.get("app:postss");

        if (postCache) return JSON.parse(postCache);

        const { data } = await axios.get("http://localhost:4001/post");

        await redis.set("app:postss", JSON.stringify(data));

        return data;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    findPostById: async (parent, args) => {
      try {
        const { data: post } = await axios.get(
          `http://localhost:4001/post/${args.id}`
        );

        let { data: user } = await axios.get(
          `https://docker-users.herokuapp.com/users/${post.UserMongoId}`
        );

        post.User = user;
        return post;
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    addPost: async (_, args) => {
      try {
        const { data } = await axios.post(
          `http://localhost:4001/post/create`,
          args.newPost
        );
        console.log(data);
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    editPost: async (parent, args) => {
      try {
        const { data } = await axios.put(
          `http://localhost:4001/post/${args.id}`,
          args.newPost
        );
        console.log(args);
        console.log(data);
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    deletePost: async (parent, args) => {
      try {
        const { data } = await axios.delete(
          `http://localhost:4001/post/${args.id}`
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
  postTypeDefs: typeDefs,
  postResolvers: resolvers,
};
