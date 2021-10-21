/* eslint-disable import/prefer-default-export */
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
  },

  Mutation: {
    createReview: async (_, {
      name, body, rating, shop_id, user_id,
    }, ctx) => {
      const now = new Date();
      const review = await ctx.prisma.reviews.create({
        data: {
          name,
          body,
          rating,
          date: now,
          helpful: 0,
          reported: 0,
          shop_id,
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
  },
};
