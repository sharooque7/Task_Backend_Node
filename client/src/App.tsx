import { Container } from "@mui/material";
import SignIn from "./componets/signin/SignIn";
// import SignUp from "./componets/signup/SignUp";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      {/* <SignIn /> */}
      {/* <SignUp /> */}
      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default App;
