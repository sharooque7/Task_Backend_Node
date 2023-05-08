import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";

interface review {
  user_id: number;
  id?: number;
  movie_id: number;
  rating: number;
  comment: string;
}

interface pagination {
  limit: number;
  offset: number;
  sort?: string;
  filter?: string;
}
interface Review {
  reviews: review | null;
  pagination: pagination | null;
  show: boolean;
}

const initialState: Review = {
  reviews: null,
  pagination: null,
  show: false,
};

export const getAllReview = createAsyncThunk<
  review,
  { movie_id: number; limit: number; offset: number }
>("getAllReview", async ({ movie_id, limit, offset }, thunkAPI) => {
  try {
    const graphqlQuery = {
      query: `query {
  getAllReviewOfMovie(input:{movie_id:${movie_id},limit:${limit},offset:${offset}}) {
   reviews {
      comment
      rating
      user_id
      movie_id
      createdAt
      id
    }
    statusCode
    message
    pagination {
      count
      filter
      limit
      offset
      sort
    }
    error {
       message
       statusCode
    }
  }
}`,
    };

    const review = await agent.singlepoint.api(graphqlQuery);
    console.log(review);
    return review;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error });
  }
});

export const createReview = createAsyncThunk<Review, review>(
  "createReview",
  async ({ user_id, movie_id, comment, rating }, thunkAPI) => {
    console.log(user_id, comment, movie_id, rating);
    try {
      const graphqlQuery = {
        query: `mutation {
  createReview(input: {movie_id:${movie_id},user_id:${user_id},rating:${rating},comment:"${comment}"}) {
    message
    statusCode
    error {
      message
      statusCode
    }
  }
}`,
      };

      const review = await agent.singlepoint.api(graphqlQuery);
      console.log(review);
      return review;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const removeReview = createAsyncThunk<
  Review,
  { user_id: number; review_id: number }
>("removeReview", async ({ user_id, review_id }, thunkAPI) => {
  try {
    const graphqlQuery = {
      query: `mutation {
  removeReview(input: {user_id:${user_id},review_id:${review_id}}) {
    message
    statusCode
    error {
      message
      statusCode
    }
  }
}`,
    };
    const review = await agent.singlepoint.api(graphqlQuery);
    console.log(review);
    return review;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue({ error });
  }
});

export const updateReview = createAsyncThunk<Review, review>(
  "updateReview",
  async ({ id, user_id, movie_id, comment, rating }, thunkAPI) => {
    console.log(id, user_id, movie_id, comment, rating);
    try {
      if (id) {
        const graphqlQuery = {
          query: `mutation{
  updateReview(input: {id:${id},user_id:${user_id},movie_id:${movie_id},rating:${rating},comment:"${comment}"}) {
    message
    statusCode
    error {
      message
      statusCode
    
    }
  }
}`,
        };
        const review = await agent.singlepoint.api(graphqlQuery);
        console.log(review);
        return review;
      }
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setReview: (state, action) => {
      state.reviews = action.payload;
    },
    setPage: (state, action) => {
      state.pagination = action.payload;
    },

    clearReview: (state, action) => {
      state.reviews = null;
    },
    setShow: (state, action) => {
      console.log(action.payload);
      console.log(state.show);
      state.show = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllReview.fulfilled, (state, action: any) => {
      state.reviews = action.payload.data.getAllReviewOfMovie.reviews;
      state.pagination = action.payload.data.getAllReviewOfMovie.pagination;
    });

    builder.addCase(createReview.fulfilled, (state, action) => {
      console.log(action.payload);
    });
    builder.addMatcher(
      isAnyOf(getAllReview.rejected, createReview.rejected),
      (state, action) => {
        throw action.payload;
      }
    );
  },
});

export const { setPage, setReview, setShow, clearReview } = reviewSlice.actions;
