import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
// import { useAppSelector } from "../../app/store/configureStore";
import { createMovieAsync } from "../movie/movieSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { stat } from "fs";
import { createReview, getAllReview } from "./reviewSlice";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function CreateReview() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  console.log(state.movie_id);
  const { pagination }: any = useAppSelector((state) => state?.movies);
  const limit: number = pagination && pagination.limit;
  const offset: number = pagination && pagination.offset;
  const count: number = pagination && pagination.count;
  const pageSize = limit;
  const totalPage = count / pageSize;
  const [curr, setCurr] = React.useState(1);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      let current = (curr - 1) * pageSize;

      const user: any = localStorage.getItem("user");
      const userData = JSON.parse(user);
      const id = userData.data.login.user.id;

      const review: any = {
        comment: data.get("comment"),
        rating: data.get("rating"),
        user_id: parseInt(id),
        movie_id: state.movie_id,
      };

      const response: any = await dispatch(createReview(review));

      await dispatch(
        getAllReview({
          limit: pageSize,
          offset: current,
          movie_id: state.movie_id,
        })
      );
      console.log(response);
      if (response.payload.data.createReview.statusCode === 200) {
        toast.success(response.payload.data.createReview.message);
        navigate("/movies");
      }
      if (response.payload.data.createReview.statusCode !== 200) {
        throw {
          message: response.payload.data.createReview.message,
          code: response.payload.data.createReview.statusCode,
        };
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Create Review
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="comment"
              label="Comment"
              name="comment"
              autoComplete="comment"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="rating"
              label="rating"
              id="rating"
              autoComplete="rating"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
