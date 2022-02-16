import { Home } from "@material-ui/icons";
import React from "react";
import { Routes, Route } from "react-router-dom";
import FavouriteMovieList from "../MoviesPage/FavouriteMovieList/FavouriteMovieList";
import MoviesPage from "../MoviesPage/MoviesPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<MoviesPage />} />
      <Route path='favourite' element={<FavouriteMovieList />} />
    </Routes>
  );
};

export default AppRouter;
