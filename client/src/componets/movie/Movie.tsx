import { useEffect, useState, useCallback } from "react";
import { useAppSelector } from "../../app/store/configureStore";
import { toast } from "react-toastify";
import { getMovieItemAsync, removeMovie } from "./movieSlice";
import { useAppDispatch } from "../../app/store/configureStore";
import Box from "@mui/material/Box";
import Card from "@mui/material/CardActions";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import Sort from "../utils/Sort";
import { getAllReview, setShow } from "../review/reviewSlice";
import Review from "../review/Review";

interface Props {
  id: string;
  movie_name: string;
  description: string;
  director_name: string;
  release_date: string;
  user_id: string;
}

interface movie {
  movie: Props;
}

const Cards = ({ movie }: movie) => {
  const { pagination }: any = useAppSelector((state) => state?.movies);
  const { show }: any = useAppSelector((state) => state?.reviews);

  const limit: number = pagination && pagination.limit;
  const offset: number = pagination && pagination.offset;
  const count: number = pagination && pagination.count;
  const pageSize = limit;
  const totalPage = count / pageSize;
  const [curr, setCurr] = useState(1);

  const { id, user_id, movie_name, description, release_date, director_name } =
    movie;
  const [create, setCreate] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user: any = localStorage.getItem("user");
  const userData = JSON.parse(user);
  const curr_user = userData.data.login.user.id;

  const createMovie = async () => {
    setCreate(!create);
    navigate("/movies/create");
  };
  const updateMovie = async (state: any) => {
    console.log("hi");
    navigate("/movies/update", {
      state: state,
    });
  };
  const deleteMovie = async (id: string) => {
    try {
      const user: any = localStorage.getItem("user");
      const userData = JSON.parse(user);
      const user_id = userData.data.login.user.id;

      const movie: any = await dispatch(
        removeMovie({ movie_id: id, user_id: user_id })
      );

      if (movie?.payload?.data?.removeMoview?.statusCode === 200) {
        toast.success(movie?.payload?.data?.removeMoview?.message);
      }
      if (movie?.payload?.data?.removeMoview?.statusCode !== 200) {
        throw {
          message: movie?.payload?.data?.removeMoview?.message,
          code: movie?.payload?.data?.removeMoview?.statusCode,
        };
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const viewReview = async (id: string) => {
    let current = (curr - 1) * pageSize;

    const review = await dispatch(
      getAllReview({ movie_id: parseInt(id), limit: pageSize, offset: current })
    );

    await dispatch(setShow(!show));
  };

  const createReview = async (movie_id: string) => {
    navigate("/movies/review/create", { state: { movie_id } });
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        borderBottom: "1px solid black",
      }}
    >
      <CardHeader title={movie_name} />
      <CardContent>
        <Typography variant="h5" component="div">
          {description}
        </Typography>
        <Typography sx={{ mb: 1.5, lineHeight: 2 }} color="text.secondary">
          {director_name}
        </Typography>
      </CardContent>
      {/* <CardHeader></CardHeader> */}
      <CardActions>
        <Button
          size="small"
          disabled={user_id !== curr_user}
          onClick={() => {
            updateMovie(movie);
          }}
        >
          UPDATE
        </Button>
        <Button
          size="small"
          disabled={user_id !== curr_user}
          onClick={() => {
            deleteMovie(id);
          }}
        >
          DELETE
        </Button>
        <Button
          size="small"
          onClick={() => {
            viewReview(movie.id);
          }}
        >
          Reviews
        </Button>
        <Button
          size="small"
          onClick={() => {
            createReview(movie.id);
          }}
        >
          CREATE Reviews
        </Button>
        <Button size="small" onClick={createMovie}>
          CREATE Movie
        </Button>
      </CardActions>
    </Card>
  );
};
const Movie = () => {
  const { movies }: any = useAppSelector((state) => state?.movies);
  const { show, reviews }: any = useAppSelector((state) => state?.reviews);

  const user: any = localStorage.getItem("user");
  const userData = JSON.parse(user);
  const curr_user = userData?.data?.login?.user?.id;

  const dispatch = useAppDispatch();
  const getMovie = useCallback(async () => {
    const movies: any = await dispatch(
      getMovieItemAsync({ limit: 4, offset: 0 })
    );

    if (movies.payload.data.getAllMovies.statusCode === 200) {
      //   toast.success(movies.payload.data.getAllMovies.message);
    }
    if (movies.payload.data.getAllMovies.statusCode !== 200) {
      throw {
        message: movies.payload.data.getAllMovies.message,
        code: movies.payload.data.getAllMovies.statusCode,
      };
    }
  }, [dispatch]);

  const { pagination }: any = useAppSelector((state) => state?.movies);
  const limit: number = pagination && pagination.limit;
  const offset: number = pagination && pagination.offset;
  const count: number = pagination && pagination.count;
  const pageSize = limit;
  const totalPage = count / pageSize;
  const [curr, setCurr] = useState(1);

  const handlePagination = async (e: any, page: number) => {
    setCurr(page);
    let current = (curr - 1) * pageSize;
    const pages = await dispatch(
      getMovieItemAsync({ limit: pageSize, offset: current })
    );
  };

  useEffect(() => {
    getMovie();
  }, [getMovie]);

  return (
    <>
      <Box
        sx={{
          flex: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Sort />
        {show ? (
          reviews
            ?.slice()
            .sort((review: any) => (review.user_id === curr_user ? -1 : 1))
            .map((review: any) => <Review key={review.id} review={review} />)
        ) : (
          <div>No Reviews for this movie</div>
        )}
      </Box>
      <Box
        sx={{
          border: "1px solid black",
          minWidth: 27,
          flex: 10,
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          columnGap: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {movies?.map((movie: Props) => (
          <Cards key={movie.id} movie={movie} />
        ))}
        <Pagination
          color="secondary"
          size="small"
          page={curr}
          count={Math.floor(totalPage)}
          onChange={(e, page) => {
            handlePagination(e, page);
          }}
        />
      </Box>
    </>
  );
};

export default Movie;
