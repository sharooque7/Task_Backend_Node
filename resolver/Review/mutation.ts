import { PrismaClient, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import exp from "constants";
const prisma = new PrismaClient();
interface Review {
  id: number;
  movie_id: number;
  user_id: number;
  rating: number;
  comment: string;
}
export const createReview = async (parent: any, { input }: any) => {
  try {
    const { movie_id, user_id, rating, comment }: Review = input;
    const createReview = await prisma.review.create({
      data: {
        movie_id,
        user_id,
        rating,
        comment,
      },
    });

    return { message: "Review posted" };
  } catch (error) {
    console.log(error);
  }
};

export const updateReview = async (parent: any, { input }: any) => {
  try {
    const { id, user_id, movie_id, comment, rating }: Review = input;

    console.log(input);
    const update = await prisma.review.updateMany({
      where: {
        AND: [
          {
            id: id,
          },
          {
            user_id: user_id,
          },
          {
            movie_id: movie_id,
          },
        ],
      },
      data: {
        user_id,
        movie_id,
        comment,
        rating,
        updatedAt: new Date(),
      },
    });

    return {
      message: "Review updated",
    };
  } catch (error) {
    console.log(error);
  }
};

export const removeReview = async (parent: any, { review_id }: any) => {
  try {
    const review = await prisma.review.deleteMany({
      where: {
        id: parseInt(review_id),
      },
    });
    return {
      message: "Review deleted",
    };
  } catch (error) {
    console.log(error);
  }
};
