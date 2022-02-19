import { Home } from "@material-ui/icons";
import React from "react";
import { Routes, Route } from "react-router-dom";
import FavouriteMovieList from "../MoviesPage/FavouriteMovieList/FavouriteMovieList";
import MoviesPage from "../MoviesPage/MoviesPage";
import Watchlist from "../MoviesPage/Watchlist/Watchlist";

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<MoviesPage />} />
      <Route path='favourite' element={<FavouriteMovieList />} />
      <Route path='watchlist' element={<Watchlist />} />
    </Routes>
  );
};

export default AppRouter;
