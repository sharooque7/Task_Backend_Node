// import * as quthQuery from "./Authentication/query";
import * as authMutation from "./Authentication/mutation.js";
import * as movieQuery from "./Movies/query.js";
import * as movieMutation from "./Movies/mutation.js";
import * as reviewQuery from "./Review/query.js";
import * as reviewMutation from "./Review/mutation.js";
const resolvers = {
    Query: { ...movieQuery, ...reviewQuery },
    Mutation: { ...authMutation, ...movieMutation, ...reviewMutation },
};
export default resolvers;
//# sourceMappingURL=combined.js.map