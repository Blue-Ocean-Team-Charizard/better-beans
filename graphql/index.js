/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const { gql } = require('apollo-server-micro');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export const typeDefs = gql`
  type Query {
    user(id: Int): User
    reviews: [Review]
    reviewsByShop(shop_id: String!): [Review]!
    reviewsByUser(user_id: Int!): [Review]!
    photos: [Photo]
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

export default prisma;
