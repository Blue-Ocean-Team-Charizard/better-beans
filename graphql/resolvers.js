/* eslint-disable consistent-return */
/* eslint-disable camelcase */
export const resolvers = {
  Query: {
    reviews: async (_, args, ctx) => {
      const reviews = await ctx.prisma.reviews.findMany();
      return reviews;
    },
    reviewsByShop: async (_, { shop_id }, ctx) => {
      const reviews = await ctx.prisma.reviews.findMany({
        where: { shop_id },
      });
      return reviews;
    },
    reviewsByUser: async (_, { user_id }, ctx) => {
      const reviews = await ctx.prisma.reviews.findMany({
        where: { user_id },
      });
      return reviews;
    },
    photos: async (_, args, ctx) => {
      const photos = await ctx.prisma.photos.findMany();
      return photos;
    },
    photosByReview: async (_, { review_id }, ctx) => {
      const photos = await ctx.prisma.photos.findMany({
        where: { review_id },
      });
      return photos;
    },
    beansByUser: async (_, { user_id, visited }, ctx) => {
      const beans = await ctx.prisma.visited.findMany({
        where: { user_id, visited },
      });
      return beans;
    },
    beansByUserAndShop: async (_, { user_id, shop_id }, ctx) => {
      const beans = await ctx.prisma.visited.findMany({
        where: { user_id, shop_id },
      });
      return beans;
    },
  },

  Mutation: {
    createReview: async (_, {
      name, avatar, body, rating, shop_id, shop_name, user_id,
    }, ctx) => {
      const now = new Date();
      const review = await ctx.prisma.reviews.create({
        data: {
          name,
          avatar,
          body,
          rating,
          date: now,
          helpful: 0,
          reported: 0,
          shop_id,
          shop_name,
          user_id,
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
    createVisited: async (_, { user_id, shop_id, shop_name, visited }, ctx) => {
      const bean = await ctx.prisma.visited.create({
        data: { user_id, shop_id, shop_name, visited },
      });

      return bean;
    },
    toggleVisited: async (_, { id, visited }, ctx) => {
      const updateBean = await ctx.prisma.visited.update({
        where: { id },
        data: { visited }
      });

      return updateBean;
    },
    incrementHelpful: async (_, { id, helpful }, ctx) => {
      const newHelpful = await ctx.prisma.reviews.update({
        where: { id },
        data: { helpful: helpful + 1 }
      });

      return newHelpful;
    },
    incrementReported: async (_, { id, reported }, ctx) => {
      const newReported = await ctx.prisma.reviews.update({
        where: { id },
        data: { reported: reported + 1 }
      });

      return newReported;
    }
  },
};
