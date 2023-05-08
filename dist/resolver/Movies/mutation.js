import { hashService } from "../../utils/auth.js";
import { GraphQLError } from "graphql";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const createMovie = async (parent, { input }, context) => {
    try {
        const verify = await hashService.verifyToken(context.token);
        const { movie_name, description, director_name, user_id, release_date, } = input;
        console.log(movie_name, description, director_name, user_id, release_date);
        const movie = await prisma.movie.create({
            data: {
                user_id: parseInt(user_id),
                movie_name,
                description,
                director_name,
                release_date: new Date(release_date),
            },
        });
        return {
            message: "creation successful",
            statusCode: 201,
        };
    }
    catch (error) {
        console.log(error);
        return {
            message: "something went wrong",
            statusCode: error.extensions.code,
            error: { message: error.message, code: error.extensions.code },
        };
    }
};
export const removeMoview = async (parent, { input }, context) => {
    try {
        const verify = await hashService.verifyToken(context.token);
        const { user_id, movie_id } = input;
        console.log(user_id, movie_id);
        const deleteMovie = prisma.movie.deleteMany({
            where: {
                AND: [{ user_id: parseInt(user_id) }, { id: parseInt(movie_id) }],
            },
        });
        const deleteReviews = prisma.review.deleteMany({
            where: {
                AND: [{ user_id: parseInt(user_id) }, { movie_id: parseInt(movie_id) }],
            },
        });
        const transaction = await prisma.$transaction([deleteReviews, deleteMovie]);
        console.log(transaction);
        if (transaction[1].count === 0) {
            throw new GraphQLError("Movie deletion unsuccessfull Try again", {
                extensions: {
                    code: 404,
                    message: "Review deletion unsuccessfull Try agai",
                },
            });
        }
        return {
            message: "Deletion succeded",
            statusCode: 200,
        };
    }
    catch (error) {
        console.log(error);
        return {
            message: "something went wrong while deleting",
            statusCode: error.extensions.code,
            error: { message: error.message, code: error.extensions.code },
        };
    }
};
export const updateMovie = async (parent, { input }, context) => {
    try {
        const verify = await hashService.verifyToken(context.token);
        const { id, user_id, movie_name, description, release_date, director_name, } = input;
        const updateMovie = await prisma.movie.updateMany({
            where: { AND: [{ id: parseInt(id) }, { user_id: parseInt(user_id) }] },
            data: {
                movie_name,
                description,
                director_name,
                release_date: new Date(release_date),
                user_id: parseInt(user_id),
            },
        });
        console.log(updateMovie);
        return {
            message: "Updated successfully",
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
//# sourceMappingURL=mutation.js.map