import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getAllMovies = async (parent, { input }) => {
    try {
        let { limit = 4, offset = 0, sort = "asc" } = input;
        const max_limit = 4;
        limit = limit > max_limit ? max_limit : limit;
        const movies = await prisma.movie.findMany({
            orderBy: [
                {
                    release_date: sort,
                },
            ],
            skip: offset,
            take: limit,
        });
        const pagination = {
            limit,
            offset,
        };
        return { movies, pagination, message: "success", statusCode: 200 };
    }
    catch (error) {
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
export const getMovie = async (parent, { input }) => {
    try {
        const { id } = input;
        const movie = await prisma.movie.findUnique({
            where: {
                id: id,
            },
        });
        return movie;
    }
    catch (error) {
        console.log(error);
    }
};
//# sourceMappingURL=query.js.map