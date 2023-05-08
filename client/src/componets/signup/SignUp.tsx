import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import agent from "../../app/api/agent";
import { useNavigate, Link as Swap } from "react-router-dom";
import { toast } from "react-toastify";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="texaction.payload.data.getAllMovies.moviesaction.payload.data.getAllMovies.moviest.secondary"
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

export default function SignUp() {
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userdata = {
      user_name: data.get("user_name"),
      email: data.get("email_id"),
      password: data.get("password"),
    };

    const graphqlQuery = {
      query: `
mutation {
  register(input:{name:"${userdata.user_name}",email:"${userdata.email}",password:"${userdata.password}"}) {
    message
    statusCode
    error {
      code
      message
    }
  }
}`,
    };
    try {
      const user = await agent.singlepoint.api(graphqlQuery);

      if (user.data.register.statusCode !== 200) {
        throw {
          message: user.data.register.message,
          code: user.data.register.statusCode,
        };
      }
      if (user.data.register.statusCode === 200) {
        toast.success(user.data.register.message);
        navigate("/login");
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="username"
                  name="user_name"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email_id"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2"></Link>
                <Swap to="/login">
                  <Link>{"Already have an account? Sign in"}</Link>
                </Swap>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
