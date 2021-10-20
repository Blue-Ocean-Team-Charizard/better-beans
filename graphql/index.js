/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
// import { GraphQLServer } from 'graphql-yoga'
// ... or using `require()`
// const { GraphQLServer } = require('graphql-yoga');
const { gql } = require('apollo-server-micro');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export const typeDefs = gql`
  type Query {
    hello(name: String, job: String): String!
    getUser(id: Int): User
    getReviews: [Review]
    getReviewsByShop(shop_id: String!): [Review]!
    getReviewsByUser(user_id: Int!): [Review]!
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
    createUser(name: String, email: String, photo_url: String): User!
    createReview(
      first_name: String,
      title: String,
      body: String,
      rating: Int,
      shop_id: String,
      user_id: Int,
    ): Review!
    createPhoto(review_id: Int!, url: String!): Photo!
  }
`;

export const resolvers = {
  Query: {
    getUser: async (_, { id }, ctx) => {
      try {
        return await ctx.prisma.users.findUnique({
          where: { id },
        });
      } catch (e) {
        console.error(e);
      }
    },
    getReviews: async (_, args, ctx) => {
      const reviews = await ctx.prisma.reviews.findMany();
      return reviews;
    },
    getReviewsByShop: async (_, { shop_id }, ctx) => {
      const reviews = await ctx.prisma.reviews.findMany({
        where: { shop_id },
      });
      return reviews;
    },
    getReviewsByUser: async (_, { user_id }, ctx) => {
      const reviews = await ctx.prisma.reviews.findMany({
        where: { user_id },
      });
      return reviews;
    },
    getPhotos: async (_, args, ctx) => {
      const photos = await ctx.prisma.photos.findMany();
      return photos;
    },
  },

  Mutation: {
    setMessage: () => prisma.users.create({
      data: { name: 'Hello kitty' },
    }),
    createUser: async (_, { name, email, photo_url }, ctx) => {
      const user = await ctx.prisma.users.create({
        data: { name, email, photo_url },
      });
      return user;
    },
    createReview: async (_, {
      first_name, title, body, rating, shop_id, user_id,
    }, ctx) => {
      const now = new Date();
      const review = await ctx.prisma.reviews.create({
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
      return review;
    },
    createPhoto: async (_, { review_id, url }, ctx) => {
      const photo = await ctx.prisma.photos.create({
        data: { review_id, url },
      });
      return photo;
    },
  },
};

// server.start(() => console.log('Server is running on localhost:4000'));
export default prisma;
