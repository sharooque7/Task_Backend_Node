import { PrismaClient, Prisma } from "@prisma/client";
import validator from "validator";
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
