// import { GraphQLServer  }from 'graphql-yoga'
// ... or using `require()`
const { GraphQLServer } = require('graphql-yoga');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const typeDefs = `
  type Query {
    hello(name: String, job: String): String!
  }

  type User {
    id: Int!
    name: String!
    email: String
    photo_url: String
  }

  type Mutation {
    setMessage(message: String): String!
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name, job }) => `Hello ${name || 'World'} with ${job || 'Unemployed'}`,
  },

  Mutation: {
    setMessage: () => prisma.users.create({
      data: { name: 'Hello kitty' },
    }),
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log('Server is running on localhost:4000'));
