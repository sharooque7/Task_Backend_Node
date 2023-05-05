import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

interface pagination {
  limit: number;
  offset: number;
  sort: string;
}
export const getAllMovies = async (parent: any, { input }: any) => {
  try {
    let { limit = 4, offset = 0, sort = "asc" }: pagination = input;
    const max_limit = 4;
    limit = limit > max_limit ? max_limit : limit;
    const movies = await prisma.movie.findMany({
      orderBy: [
        {
          release_date: sort,
        } as any,
      ],
      skip: offset,
      take: limit,
    });
    const pagination = {
      limit,
      offset,
    };

    return { movies, pagination, message: "success", statusCode: 200 };
  } catch (error: any) {
    console.log(error);
    return {
      message: "something went wrong",
      statusCode: error.extensions.code,
      error: {
        message: error.message,
        code: error.extensions.code,
      },
    };
  }
};

export const getMovie = async (parent: any, { input }: any) => {
  try {
    const { id } = input;

    const movie = await prisma.movie.findUnique({
      where: {
        id: id,
      },
    });

    return movie;
  } catch (error) {
    console.log(error);
  }
};
