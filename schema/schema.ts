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
        _id:ID!
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

    type Response {
        message:String!
        error: String
        token:String
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
    }

    input updateInput {
        id:ID!
        movie_name:String!
        description:String!
        director_name:String!
        release_date:String
    }
   
    input pagination {
        limit:Int!
        offset:Int!
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

    type getAllReviews {
        reviews:[review!]!
        pagination:page!
    }

    type Query {
        hello:String!
        getAllMovies(input:pagination):getAllMovies!
        getMovie(input:ID!):movie!
        getAllReviewOfMovie(movie_id:ID!):getAllReviews!
        
    }

    type Mutation {
        register(input:registerInput):Response!
        login(input:loginInput):Response!
        changePassword(email:String!):Response!
        createMovie(input:movieInput):Response!
        removeMoview(movie_name:String!):Response!
        updateMovie(input:updateInput!):Response!
        createReview(input:reviewInput!):Response!
        updateReview(input:reviewInput!):Response!
        removeReview(review_id:ID!):Response!
        
        test:String!
    }
`;
