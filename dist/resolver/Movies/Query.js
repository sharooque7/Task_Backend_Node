import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getAllMovies = async (parent, { input }) => {
    try {
        let { limit = 4, offset = 0, sort = "desc" } = input;
        const max_limit = 4;
        console.log(limit, sort, offset);
        limit = limit > max_limit ? max_limit : limit;
        const movies = await prisma.movie.findMany({
            orderBy: [
                {
                    movie_name: sort,
                },
            ],
            skip: Number(offset),
            take: Number(limit),
        });
        // console.log(movies);
        const count = await prisma.movie.count();
        const pagination = {
            limit,
            offset,
            count,
            sort,
        };
        // console.log(movies);
        return { movies, pagination, message: "success", statusCode: 200 };
    }
    catch (error) {
        console.log(error);
        return {
            message: "something went wrong",
            statusCode: error.extensions.code,
            error: {
                message: error.message,
                statusCode: error.extensions.code,
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