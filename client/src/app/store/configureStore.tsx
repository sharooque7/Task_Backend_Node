import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { loginSlice } from "../../componets/signin/loginSlice";
import { movieSlice } from "../../componets/movie/movieSlice";
import { reviewSlice } from "../../componets/review/reviewSlice";

export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    movies: movieSlice.reducer,
    reviews: reviewSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
