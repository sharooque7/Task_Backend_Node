import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getAllReviewOfMovie = async (parent, { input }) => {
    try {
        let { limit = 4, offset = 0, movie_id } = input;
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
    }
    catch (error) {
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
//# sourceMappingURL=query.js.map