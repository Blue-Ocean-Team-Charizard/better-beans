// import { GraphQLServer  }from 'graphql-yoga'
// ... or using `require()`
const { GraphQLServer } = require('graphql-yoga');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const typeDefs = `
  type Query {
    hello(name: String, job: String): String!
    getUser(id: Int): User
  }

  type User {
    id: Int!
    name: String!
    email: String
    photo_url: String
  }

  type Mutation {
    setMessage(message: String): String!
    createUser(name: String, email: String): String
  }
`;

const resolvers = {
  Query: {
    // hello: (_, { name, job }) => `Hello ${name || 'World'} with ${job || 'Unemployed'}`,
    getUser: async (_, { id }) => {
      const user = await prisma.users.findUnique({
        where: { id },
      });
      return user;
    },
    // getUser: (_, { id }) => prisma.users.filter((user) => user.id === id)[0],
    // getUser: (_, { id }) => {
    //   return {
    //     id: id,
    //     name: 'Daniel',
    //     email: 'dan@dan.com',
    //     photo_url: 'hotpic.com'
    //   };
    // },
  },

  Mutation: {
    setMessage: () => prisma.users.create({
      data: { name: 'Hello kitty' },
    }),
    createUser: async (_, { name, email }) => {
      await prisma.users.create({
        data: { name, email },
      });
      return 'Created';
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log('Server is running on localhost:4000'));
