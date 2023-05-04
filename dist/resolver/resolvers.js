import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const resolvers = {
    Query: {
        hello() {
            return "Hello World";
        },
    },
    Mutation: {},
};
export default resolvers;
//# sourceMappingURL=resolvers.js.map