"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const schema = (0, graphql_1.buildSchema)(`

type RootQuery {
    hello : String!
}

schema {
    query:RootQuery
}

`);
exports.default = schema;
//# sourceMappingURL=schema.js.map