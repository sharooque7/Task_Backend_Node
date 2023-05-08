import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAppDispatch } from "../../app/store/configureStore";
import { createMovieAsync } from "../movie/movieSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

export default function Create() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const user: any = localStorage.getItem("user");
      const userData = JSON.parse(user);
      const id = userData.data.login.user.id;

      const movie: any = {
        movie_name: data.get("movie_name"),
        description: data.get("description"),
        director_name: data.get("director_name"),
        release_date: data.get("release_date"),
        user_id: parseInt(id),
      };
      const response: any = await dispatch(createMovieAsync(movie));
      if (response.payload.data.createMovie.statusCode === 201) {
        toast.success(response.payload.data.createMovie.message);
        navigate("/movies");
      }
      if (response.payload.data.createMovie.statusCode !== 201) {
        throw {
          message: response.payload.data.createMovie.message,
          code: response.payload.data.createMovie.statusCode,
        };
      }
    } catch (error: any) {
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
            Create Movie
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
              id="movie_name"
              label="Movie name"
              name="movie_name"
              autoComplete="movie_name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="description"
              id="description"
              autoComplete="description"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="director_name"
              label="Director name"
              id="director_name"
              autoComplete="director_name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="release_date"
              label="Release date"
              type="date"
              id="release_date"
              autoComplete="release_date"
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
