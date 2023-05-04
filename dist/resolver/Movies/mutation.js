import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const createMovie = async (params, { input }) => {
    try {
        const { movie_name, description, director_name, release_date } = input;
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
    }
    catch (error) {
        console.log(error);
    }
};
export const removeMoview = async (parent, { movie_name }) => {
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
    }
    catch (error) {
        console.log(error);
    }
};
export const updateMovie = async (parent, { input }) => {
    try {
        const { id, movie_name, description, release_date, director_name } = input;
        const updateMovie = await prisma.movie.updateMany({
            where: { id },
            data: {
                movie_name,
                description,
                director_name,
                release_date,
            },
        });
    }
    catch (error) {
        console.log(error);
    }
};
//# sourceMappingURL=mutation.js.map