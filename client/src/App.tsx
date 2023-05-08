import { Container, CssBaseline } from "@mui/material";
import SignIn from "./componets/signin/SignIn";
// import SignUp from "./componets/signup/SignUp";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <CssBaseline />
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <Container
        sx={{ mt: 4, flexDirection: "row", display: "flex", width: "100%" }}
      >
        <Outlet />
      </Container>
    </>
  );
};

export default App;
