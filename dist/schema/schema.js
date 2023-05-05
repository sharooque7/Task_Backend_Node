export const typeDefs = `#graphql

    enum Roles{
        user
        admin
    }

    input UserInput {
        username:String!
        emailid:String!
        password:String
    }

    type User {
        id:ID
        username:String!
        emailid:String!
        password:String
    }

    input registerInput {
        name:String!
        email:String!
        password:String!
    }
    input loginInput {
        email:String!
        password:String!
    }

    type error {
        message:String
        code:Int
    }

    type Response {
        message:String!
        statusCode:Int!
        error: error
        token:String
        user:User
        reviews:[review!]
        pagination:page
        movies:[movie!]
    }
   
    type movie {
        id:ID!
        movie_name:String!
        description:String!
        director_name:String!
        release_date:String
    }

    input movieInput {
        movie_name:String!
        description:String!
        director_name:String!
        release_date:String
        user_id:Int!
    }

    input updateInput {
        id:Int!
        movie_name:String!
        description:String!
        director_name:String!
        release_date:String
        user_id:Int!
    }
   
    input pagination {
        limit:Int!
        offset:Int!
        sort:String
        filter:String
    }
    type page {
        limit:String!
        offset:String!
    }

    type getAllMovies {
        movies:[movie!]!
        pagination:page!
    }
    type review {
        id:ID!
        movie_id:ID!
        user_id:ID!
        rating:String!
        comment:String!
        createdAt:String
        updatedAt:String
    }

    input reviewInput {
        id:Int
        movie_id:Int!
        user_id:Int!
        rating:Float!
        comment:String!
    }

    input removeMovieInput {
        user_id:Int!
        movie_id:Int!
    }

    input reviewQueryInput{
        limit:Int!
        offset:Int!
        movie_id:Int!
    }

    input removeReviewInput {
        user_id:Int!
        review_id:Int!
    }

    type Query {
        hello:String!
        getAllMovies(input:pagination):Response!
        getMovie(input:ID!):movie!
        getAllReviewOfMovie(input:reviewQueryInput!):Response!   
    }



    type Mutation {
        register(input:registerInput):Response!
        login(input:loginInput):Response!
        changePassword(email:String!):Response!
        createMovie(input:movieInput):Response!
        removeMoview(input:removeMovieInput!):Response!
        updateMovie(input:updateInput!):Response!
        createReview(input:reviewInput!):Response!
        updateReview(input:reviewInput!):Response!
        removeReview(input:removeReviewInput!):Response!
        
        test:Response!
    },
`;
//# sourceMappingURL=schema.js.map