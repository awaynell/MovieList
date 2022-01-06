import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useData } from "./hooks/useData";
import MoviesPage from "./components/MoviesPage/MoviesPage";
import { setDataAction } from "./redux/actionCreators";
import "./App.scss";
import Header from "./components/Header/Header";
import { currentPage, selectedGenres } from "./redux/selectors";

export const App = () => {
  const page = useSelector(currentPage);
  console.log("page: ", page);
  const genres: any[] = useSelector(selectedGenres);
  const [data, loading, error] = useData("discover/movie", {
    language: "ru-RU",
    with_genres: genres.join(","),
    page: page,
  });
  console.log("loading: ", loading);
  console.log("error:" + " " + error);
  const dispatch = useDispatch();
  dispatch(setDataAction(data));

  return (
    <>
      <Header />
      <MoviesPage data={data} loading={loading} error={error} />
    </>
  );
};

export default App;
