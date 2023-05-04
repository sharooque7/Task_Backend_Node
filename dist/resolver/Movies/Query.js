import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getAllMovies = async (parent, { input }) => {
    try {
        let { limit = 4, offset = 0 } = input;
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
    }
    catch (error) {
        console.log(error);
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