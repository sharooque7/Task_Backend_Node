import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAppDispatch } from "../../app/store/configureStore";
import { useAppSelector } from "../../app/store/configureStore";
import { updateMovie } from "../movie/movieSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { stat } from "fs";

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

export default function Update() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { state } = useLocation();

  const initialState = {
    movie_name: state.movie_name,
    movie_id: state.id,
    description: state.description,
    release_date: state.release_date,
    director_name: state.director_name,
  };

  const [values, setValues] = useState(initialState);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const user: any = localStorage.getItem("user");
      const userData = JSON.parse(user);
      const user_id = userData.data.login.user.id;

      const movie: any = {
        movie_name: data.get("movie_name"),
        description: data.get("description"),
        director_name: data.get("director_name"),
        release_date: data.get("release_date"),
        user_id: parseInt(user_id),
        movie_id: parseInt(initialState.movie_id),
      };
      const response: any = await dispatch(updateMovie(movie));
      console.log(response);
      if (response?.payload?.data?.updateMovie?.statusCode === 200) {
        toast.success(response?.payload?.data?.updateMovie?.message);
        navigate("/movies");
      }
      if (response?.payload?.data?.updateMovie?.statusCode !== 200) {
        throw {
          message: response?.payload?.data?.updateMovie?.message,
          code: response?.payload?.data?.updateMovie?.statusCode,
        };
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
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
              value={values.movie_name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="description"
              id="description"
              autoComplete="description"
              value={values.description}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="director_name"
              label="Director name"
              id="director_name"
              autoComplete="director_name"
              value={values.director_name}
              onChange={handleChange}
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
              onChange={handleChange}
              value={values.release_date}
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
