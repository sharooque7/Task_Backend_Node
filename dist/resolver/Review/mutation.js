import { PrismaClient } from "@prisma/client";
import { hashService } from "../../utils/auth.js";
import { GraphQLError } from "graphql";
const prisma = new PrismaClient();
export const createReview = async (parent, { input }, context) => {
    try {
        const verify = await hashService.verifyToken(context.token);
        const { movie_id, user_id, rating, comment } = input;
        const createReview = await prisma.review.create({
            data: {
                movie_id,
                user_id,
                rating,
                comment,
            },
        });
        return { message: "Review posted", statusCode: 200 };
    }
    catch (error) {
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
export const updateReview = async (parent, { input }, context) => {
    try {
        const { id, user_id, movie_id, comment, rating } = input;
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
    }
    catch (error) {
        console.log(error);
        return {
            message: "something went wrong while updating please try again",
            error: { message: error.message, code: error.extensions.code },
            statusCode: error.extensions.code,
        };
    }
};
export const removeReview = async (parent, { input }, context) => {
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
    }
    catch (error) {
        console.log(error);
        return {
            message: error.message,
            error: { message: error.message, code: error.extensions.code },
            statusCode: error.extensions.code,
        };
    }
};
//# sourceMappingURL=mutation.js.map