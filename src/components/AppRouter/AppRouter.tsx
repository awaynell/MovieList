import { Home } from "@material-ui/icons";
import React from "react";
import { Routes, Route } from "react-router-dom";
import ActorPage from "../ActorPage/ActorPage";
import MoviePage from "../MoviePage/MoviePage";
import FavouriteMovieList from "../MoviesPage/FavouriteMovieList/FavouriteMovieList";
import MoviesPage from "../MoviesPage/MoviesPage";
import Watchlist from "../MoviesPage/Watchlist/Watchlist";
import Search from "../Search/Search";

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<MoviesPage />} />
      <Route path='favourite' element={<FavouriteMovieList />} />
      <Route path='watchlist' element={<Watchlist />} />
      <Route path='movie/:id' element={<MoviePage />} />
      <Route path='search' element={<Search />} />
      <Route path='person/:id' element={<ActorPage />} />
    </Routes>
  );
};

export default AppRouter;
