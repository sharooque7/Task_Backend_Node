import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignIn from "../componets/signin/SignIn";
import SignUp from "../componets/signup/SignUp";
import Movie from "../componets/movie/Movie";
import Create from "../componets/movie/Create";
import Update from "../componets/movie/Update";
import CreateReview from "../componets/review/CreateReview";
import UpdateReview from "../componets/review/updateReview";

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
      {
        path: "movies",
        element: <Movie />,
      },
      {
        path: "movies/create",
        element: <Create />,
      },
      {
        path: "movies/update",
        element: <Update />,
      },
      {
        path: "movies/review/create",
        element: <CreateReview />,
      },
      {
        path: "movies/review/update",
        element: <UpdateReview />,
      },
    ],
  },
]);
