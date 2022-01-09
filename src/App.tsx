import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useData } from "./hooks/useData";
import MoviesPage from "./components/MoviesPage/MoviesPage";
import "./App.scss";
import { setDataAction } from "./redux/actionCreators";
import "./App.scss";
import Header from "./components/Header/Header";
import { currentPage, selectedGenres } from "./redux/selectors";

export const App = () => {
  return (
    <>
      <Header />
      <MoviesPage />
    </>
  );
};

export default App;
