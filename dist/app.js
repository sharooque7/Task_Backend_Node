"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import dotenv from "dotenv";
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const express_2 = require("graphql-http/lib/use/express");
// const dotenv = require("dotenv").config();
// const express = require("express");
// const morgan = require("morgan");
// const cors = require("cors");
const { graphql } = require("graphql");
// const { createHandler } = require("graphql-http/lib/use/express");
const schema_1 = __importDefault(require("./schema"));
const resolvers_1 = require("./resolvers");
const app = (0, express_1.default)();
app.use((0, morgan_1.default)(":method :url :status :response-time ms - :res[content-length]"));
app.use((0, cors_1.default)());
app.use("/graphql", (0, express_2.createHandler)({ schema: schema_1.default, rootValue: resolvers_1.hello }));
app.listen(3003, () => {
    console.log("Listening on port number 3003");
});
//# sourceMappingURL=app.js.map