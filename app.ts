import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan, { token } from "morgan";
import cors from "cors";
import { typeDefs } from "./schema/schema.js";
import resolvers from "./resolver/combined.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { GraphQLError, GraphQLFormattedError } from "graphql";
import http from "http";
import bodyParser from "body-parser";
const app = express();

const httpServer = http.createServer(app);

interface MyContext {
  token?: String;
}

app.use(
  morgan(":method :url :status :response-time ms - :res[content-length]")
);
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Authorization"
  );
  // res.setHeader();
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  "/",
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({
      token: req.headers.authorization?.split(" ")[1] || "",
    }),
  })
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve)
);

console.log("Server running on localhost:4000");
