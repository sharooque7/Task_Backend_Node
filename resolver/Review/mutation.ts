import { PrismaClient, Prisma } from "@prisma/client";
import { hashService } from "../../utils/auth.js";
import { GraphQLError } from "graphql";
import { reverse } from "dns";
const prisma = new PrismaClient();
interface Review {
  id: number;
  movie_id: number;
  user_id: number;
  rating: number;
  comment: string;
}

interface Token {
  token: string;
}
export const createReview = async (
  parent: any,
  { input }: any,
  context: Token
) => {
  try {
    const verify = await hashService.verifyToken(context.token);
    const { movie_id, user_id, rating, comment }: Review = input;
    console.log(movie_id, user_id, comment, rating);
    const createReview = await prisma.review.create({
      data: {
        movie_id,
        user_id,
        rating,
        comment,
      },
    });

    return { message: "Review posted", statusCode: 200 };
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

export const updateReview = async (
  parent: any,
  { input }: any,
  context: Token
) => {
  try {
    const { id, user_id, movie_id, comment, rating }: Review = input;
    console.log(id, user_id, movie_id, comment, rating);
    const verify = await hashService.verifyToken(context.token);
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
      statusCode: 200,
    };
  } catch (error: any) {
    console.log(error);
    return {
      message: "something went wrong while updating please try again",
      error: { message: error.message, code: error.extensions.code },
      statusCode: error.extensions.code,
    };
  }
};

export const removeReview = async (
  parent: any,
  { input }: any,
  context: Token
) => {
  try {
    const verify = await hashService.verifyToken(context.token);
    const { review_id, user_id } = input;
    const review = await prisma.review.deleteMany({
      where: {
        AND: [{ id: parseInt(review_id) }, { user_id: user_id }],
      },
    });
    console.log(review);
    if (review.count === 0) {
      throw new GraphQLError("Review deletion unsuccessfull Try again", {
        extensions: {
          code: 404,
          message: "Review deletion unsuccessfull Try agai",
        },
      });
    }
    return {
      message: "Review deleted",
      statusCode: 200,
    };
  } catch (error: any) {
    console.log(error);
    return {
      message: error.message,
      error: { message: error.message, code: error.extensions.code },
      statusCode: error.extensions.code,
    };
  }
};
