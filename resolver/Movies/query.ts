import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

interface pagination {
  limit: number;
  offset: number;
}
export const getAllMovies = async (parent: any, { input }: any) => {
  try {
    let { limit = 4, offset = 0 }: pagination = input;
    const max_limit = 4;
    limit = limit > max_limit ? max_limit : limit;
    const movies = await prisma.movie.findMany({
      skip: offset,
      take: limit,
    });
    console.log("sag");
    console.log(movies);
    const pagination = {
      limit,
      offset,
    };

    console.log(pagination);
    return { movies, pagination };
  } catch (error) {
    console.log(error);
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
