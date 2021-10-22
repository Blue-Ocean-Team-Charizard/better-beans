/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const { gql } = require('apollo-server-micro');
const { PrismaClient } = require('@prisma/client');

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export const typeDefs = gql`
  type Query {
    reviews: [Review]
    reviewsByShop(shop_id: String!): [Review]!
    reviewsByUser(user_id: String!): [Review]!
    photos: [Photo]!
    photosByReview(review_id: Int!): [Photo]!
    beansByUser(
      user_id: String!
      visited: Boolean!
    ): [Visited]!
  }

  type Review {
    id: Int!
    name: String
    avatar: String
    body: String!
    date: String
    rating: Int
    helpful: Int
    reported: Int
    shop_id: String
    shop_name: String
    user_id: String
  }

  type Photo {
    id: Int!
    review_id: Int!
    url: String
  }

  type Visited {
    id: Int!
    user_id: String
    shop_id: String
    shop_name: String
    visited: Boolean!
  }

  type Mutation {
    createReview(
      name: String,
      avatar: String,
      body: String,
      rating: Int,
      shop_id: String,
      shop_name: String,
      user_id: String,
    ): Review!
    createPhoto(
      review_id: Int!
      url: String!
    ): Photo!
    createVisited(
      user_id: String
      shop_id: String
      shop_name: String
      visited: Boolean!
    ): Visited!
    toggleVisited(
      id: Int!
    ): Visited!
    incrementHelpful(
      id: Int!
      helpful: Int!
    ): Review!
    incrementReported(
      id: Int!
      reported: Int!
    ): Review!
  }
`;

export default prisma;
