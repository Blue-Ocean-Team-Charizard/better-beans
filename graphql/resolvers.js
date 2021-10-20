/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
export const resolvers = {
  Query: {
    user: async (_, { id }, ctx) => {
      try {
        return await ctx.prisma.users.findUnique({
          where: { id },
        });
      } catch (e) {
        console.error(e);
      }
    },
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
  },

  Mutation: {
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
