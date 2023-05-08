import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import Movie from "./Movie";

interface movie {
  user_id?: number;
  movie_name: string;
  description: string;
  director_name: string;
  release_date: string;
  movie_id?: number;
}
interface pagination {
  limit: number;
  offset: number;
  sort?: string;
  filter?: string;
}
interface Movie {
  movies: movie | null;
  pagination: pagination | null;
  message?: string;
  statusCode?: number;
}

const initialState: Movie = {
  movies: null,
  pagination: null,
};

export const getMovieItemAsync = createAsyncThunk<Movie, pagination>(
  "getMovieItemAsync",
  async (pagination, thunkAPI) => {
    try {
      console.log(pagination.sort);
      const sort = pagination.sort ? pagination.sort : "asc";
      const graphqlQuery = {
        query: `
query {
  getAllMovies(input:{sort:"${sort}",limit:"${pagination.limit}",offset:"${pagination.offset}"}) {
    movies {
      id
      movie_name
      description
      director_name
      release_date
      user_id
    }
    statusCode
    message
    pagination {
      limit
      offset
      count
      sort
      filter
    }
    error {
      statusCode
      message
    }
  }
}`,
      };
      const movies: any = await agent.singlepoint.api(graphqlQuery);
      console.log(movies);
      return movies;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const createMovieAsync = createAsyncThunk<Movie, movie>(
  "createMovieAsync",
  async (movie, thunkAPI) => {
    console.log(movie);
    try {
      const graphqlQuery = {
        query: `mutation {
  createMovie(input:{movie_name:"${movie.movie_name}",description:"${movie.description}",director_name:"${movie.director_name}",release_date:"${movie.release_date}",user_id:"${movie.user_id}"}) {
    message,
    error {
      statusCode
      message
    }
    statusCode
  }
}`,
      };
      const movies = await agent.singlepoint.api(graphqlQuery);
      console.log(movie);
      return movies;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const removeMovie = createAsyncThunk<
  Movie,
  { movie_id: string; user_id: string }
>("removeMovie", async ({ movie_id, user_id }, thunkAPI) => {
  console.log(user_id);
  console.log(movie_id);
  try {
    const graphqlQuery = {
      query: `
      mutation {
  removeMoview(input:{user_id:"${user_id}",movie_id:"${movie_id}"}) {
    message
    statusCode
    error {
    message
    statusCode
    }
  }
}
`,
    };
    const movies = await agent.singlepoint.api(graphqlQuery);
    console.log(movies);
    const state: any = thunkAPI.getState();
    if (movies?.data?.removeMoview?.statusCode === 200)
      await thunkAPI.dispatch(getMovieItemAsync(state?.movies?.pagination));
    return movies;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue({ error: error });
  }
});

export const updateMovie = createAsyncThunk<Movie, movie>(
  "updateMovie",
  async (movie, thunkAPI) => {
    try {
      const graphqlQuery = {
        query: `mutation {
  updateMovie(input:{id:"${movie.movie_id}",movie_name:"${movie.movie_name}",description:"${movie.description}",director_name:"${movie.director_name}",release_date:"${movie.release_date}",user_id:"${movie.user_id}"}) {
  message
  statusCode
  error {
    statusCode
    message
  }  
}
}
`,
      };
      const movies = await agent.singlepoint.api(graphqlQuery);
      console.log(movies);
      const state: any = thunkAPI.getState();
      if (movies?.data?.removeMoview?.statusCode === 200)
        await thunkAPI.dispatch(getMovieItemAsync(state?.movies?.pagination));
      return movies;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovie: (state, action) => {
      state.movies = action.payload;
    },
    setPage: (state, action) => {
      state.pagination = action.payload;
    },

    clearMovie: (state, action) => {
      state.movies = null;
    },
  },
  extraReducers: (bulider) => {
    bulider.addCase(getMovieItemAsync.fulfilled, (state, action: any) => {
      state.movies = action?.payload?.data?.getAllMovies?.movies;
      state.pagination = action?.payload?.data?.getAllMovies?.pagination;
    });
    bulider.addCase(createMovieAsync.fulfilled, (state, action) => {
      console.log(action.payload);
    });
    bulider.addCase(removeMovie.fulfilled, (state, action: any) => {
      //   console.log(action.payload.data.removeMovie.statusCode === 200);
      console.log("hi");
    });
    bulider.addMatcher(
      isAnyOf(
        getMovieItemAsync.rejected,
        createMovieAsync.rejected,
        removeMovie.rejected
      ),
      (state, action) => {
        console.log("hi");
        throw action.payload;
      }
    );
  },
});

export const { setMovie, setPage, clearMovie } = movieSlice.actions;
