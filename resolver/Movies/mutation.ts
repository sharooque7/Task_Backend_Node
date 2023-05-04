import { hashService } from "../../utils/auth.js";
import { GraphQLError } from "graphql";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
interface Movie {
  id?: number;
  movie_name: string;
  description: string;
  director_name: string;
  release_date: Date;
  review?: Review[];
}

interface Review {}

export const createMovie = async (params: any, { input }: any) => {
  try {
    const { movie_name, description, director_name, release_date }: Movie =
      input;

    const movie = await prisma.movie.create({
      data: {
        movie_name,
        description,
        director_name,
        release_date: new Date(release_date),
      },
    });
    return {
      message: "creation successful",
    };
  } catch (error) {
    console.log(error);
  }
};

export const removeMoview = async (parent: any, { movie_name }: any) => {
  try {
    console.log(movie_name);
    const movie = await prisma.movie.findMany({
      where: { movie_name },
    });

    const id = movie[0]?.id;

    console.log(movie);
    const deleteMovie = prisma.movie.deleteMany({
      where: {
        movie_name: movie_name,
      },
    });
    const deleteReviews = prisma.review.deleteMany({
      where: {
        movie_id: id,
      },
    });

    const transaction = await prisma.$transaction([deleteReviews, deleteMovie]);

    return {
      message: "Deletion succeded",
    };
  } catch (error) {
    console.log(error);
  }
};
export const updateMovie = async (parent: any, { input }: any) => {
  try {
    const { id, movie_name, description, release_date, director_name }: Movie =
      input;
    const updateMovie = await prisma.movie.updateMany({
      where: { id },
      data: {
        movie_name,
        description,
        director_name,
        release_date,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
