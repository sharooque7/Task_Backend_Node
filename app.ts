// import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { createHandler } from "graphql-http/lib/use/express";
// const dotenv = require("dotenv").config();
// const express = require("express");
// const morgan = require("morgan");
// const cors = require("cors");
const { graphql } = require("graphql");
// const { createHandler } = require("graphql-http/lib/use/express");
import schema from "./schema";
import { hello } from "./resolvers";

const app = express();

app.use(
  morgan(":method :url :status :response-time ms - :res[content-length]")
);
app.use(cors());

app.use("/graphql", createHandler({ schema: schema, rootValue: hello }));

app.listen(3003, () => {
  console.log("Listening on port number 3003");
});
