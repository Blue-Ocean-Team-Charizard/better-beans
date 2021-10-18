/* eslint-disable camelcase */
// import { GraphQLServer } from 'graphql-yoga'
// ... or using `require()`
const { GraphQLServer } = require('graphql-yoga');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const typeDefs = `
  type Query {
    hello(name: String, job: String): String!
    getUser(id: Int): User
    getReviews: [Review]
    getReviewsByShop(shop_id: String!): [Review]
    getReviewsByUser(user_id: Int!): [Review]
    getPhotos: [Photo]
  }

  type User {
    id: Int!
    name: String!
    email: String
    photo_url: String
  }

  type Review {
    id: Int!
    first_name: String
    title: String
    body: String!
    date: String
    rating: Int
    helpful: Int
    reported: Int
    shop_id: String
    user_id: Int
  }

  type Photo {
    id: Int!
    review_id: Int!
    url: String
  }

  type Mutation {
    setMessage(message: String): String!
    createUser(name: String, email: String, photo_url: String): String
    createReview(
      first_name: String,
      title: String,
      body: String,
      rating: Int,
      shop_id: String,
      user_id: Int,
      photos: [String]
    ): String!
    createPhoto(review_id: Int!, url: String!): String!
  }
`;

const resolvers = {
  Query: {
    // hello: (_, { name, job }) => `Hello ${name || 'World'} with ${job || 'Unemployed'}`,
    getUser: async (_, { id }) => {
      try {
        return await prisma.users.findUnique({
          where: { id },
        });
      } catch (e) {
        console.error(e);
      }
    },
    getReviews: async () => {
      const reviews = await prisma.reviews.findMany();
      return reviews;
    },
    getReviewsByShop: async (_, { shop_id }) => {
      const reviews = await prisma.reviews.findMany({
        where: { shop_id },
      });
      return reviews;
    },
    getReviewsByUser: async (_, { user_id }) => {
      const reviews = await prisma.reviews.findMany({
        where: { user_id },
      });
      return reviews;
    },
    getPhotos: async () => {
      const photos = await prisma.photos.findMany();
      return photos;
    },
  },

  Mutation: {
    setMessage: () => prisma.users.create({
      data: { name: 'Hello kitty' },
    }),
    createUser: async (_, { name, email, photo_url }) => {
      await prisma.users.create({
        data: { name, email, photo_url },
      });
      return 'User Created';
    },
    createReview: async (_, {
      first_name, title, body, rating, shop_id, user_id, photos,
    }) => {
      const now = new Date();
      const review = prisma.reviews.create({
        data: {
          first_name,
          title,
          body,
          rating,
          date: now,
          helpful: 0,
          reported: 0,
          shop_id,
          user_id,
          // photos: {
          //   create: photos.map((photo) => {
          //     url: photo.url,

          //   })
          // }
        },
      });
      const images = photos.map((photo) => prisma.photos.create({
        data: {
          review_id: review.id,
          url: photo.url,
        },
      }));
      await review;
      await images;
      return 'Review Created';
    },
    createPhoto: async (_, { review_id, url }) => {
      await prisma.photos.create({
        data: { review_id, url },
      });
      return 'Photo Created';
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('Server is running on localhost:4000'));
