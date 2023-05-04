import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllReviewOfMovie = async (parent: any, { movie_id }: any) => {
  try {
    // const movie = await prisma.movie.findMany({
    //   where: {
    //     id,
    //   },
    // });
    // const id = movie[0]?.id;
    const reviews = await prisma.review.findMany({
      where: {
        movie_id: parseInt(movie_id),
      },
    });

    const pagination = {
      limit: 0,
      offset: 0,
    };

    return { reviews, pagination };
  } catch (error) {
    console.log(error);
  }
};
