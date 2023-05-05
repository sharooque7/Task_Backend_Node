import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

interface pagination {
  limit: number;
  offset: number;
  movie_id: number;
}
export const getAllReviewOfMovie = async (parent: any, { input }: any) => {
  try {
    let { limit = 4, offset = 0, movie_id }: pagination = input;
    const max_limit = 4;
    limit = limit > max_limit ? max_limit : limit;
    const movie = await prisma.movie.findUnique({
      where: {
        id: movie_id,
      },
    });

    console.log(movie);
    const reviews = await prisma.review.findMany({
      where: {
        movie_id: movie_id,
      },
      orderBy: [
        {
          user_id: "desc",
        },
      ],
      skip: offset,
      take: limit,
    });

    const pagination = {
      limit,
      offset,
    };

    return { reviews, pagination, statusCode: 200, message: "success" };
  } catch (error: any) {
    console.log(error);
    return {
      message: "something went wrong while deleting",
      statusCode: error.extensions.code,
      error: {
        message: error.message,
        code: error.message.code,
      },
    };
  }
};
