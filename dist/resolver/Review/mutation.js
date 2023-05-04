import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const createReview = async (parent, { input }) => {
    try {
        const { movie_id, user_id, rating, comment } = input;
        const createReview = await prisma.review.create({
            data: {
                movie_id,
                user_id,
                rating,
                comment,
            },
        });
        return { message: "Review posted" };
    }
    catch (error) {
        console.log(error);
    }
};
export const updateReview = async (parent, { input }) => {
    try {
        const { id, user_id, movie_id, comment, rating } = input;
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
    }
    catch (error) {
        console.log(error);
    }
};
export const removeReview = async (parent, { review_id }) => {
    try {
        const review = await prisma.review.deleteMany({
            where: {
                id: parseInt(review_id),
            },
        });
        return {
            message: "Review deleted",
        };
    }
    catch (error) {
        console.log(error);
    }
};
//# sourceMappingURL=mutation.js.map