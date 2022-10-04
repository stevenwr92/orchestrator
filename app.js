const { ApolloServer } = require("apollo-server");
const port = 4000;
const { bookTypeDefs, bookResolvers } = require("./schema/book");
const { postTypeDefs, postResolvers } = require("./schema/post");
const { userTypeDefs, userResolvers } = require("./schema/user");

const server = new ApolloServer({
  resolvers: [bookResolvers, postResolvers, userResolvers],
  typeDefs: [bookTypeDefs, postTypeDefs, userTypeDefs],
});

server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});