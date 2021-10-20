/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const { gql } = require('apollo-server-micro');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export const typeDefs = gql`
  type Query {
    reviews: [Review]
    reviewsByShop(shop_id: String!): [Review]!
    reviewsByUser(user_id: String!): [Review]!
    photos: [Photo]
  }

  type Review {
    id: Int!
    name: String
    body: String!
    date: String
    rating: Int
    helpful: Int
    reported: Int
    shop_id: String
    user_id: String
  }

  type Photo {
    id: Int!
    review_id: Int!
    url: String
  }

  type Mutation {
    createReview(
      name: String,
      body: String,
      rating: Int,
      shop_id: String,
      user_id: String,
    ): Review!
    createPhoto(review_id: Int!, url: String!): Photo!
  }
`;

export default prisma;
