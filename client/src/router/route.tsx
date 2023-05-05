import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import SignIn from "../componets/signin/SignIn";
import SignUp from "../componets/signup/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <SignIn />,
      },
      {
        path: "register",
        element: <SignUp />,
      },
    ],
  },
]);
