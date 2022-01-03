import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiKey } from "./API/apiKey";
import { useData } from "./hooks/useData";
import MoviesPage from "./components/MoviesPage/MoviesPage";
import { setDataAction } from "./redux/actionCreators";
import "./App.scss";
import Header from "./components/Header/Header";
import { selectedGenres } from "./redux/selectors";

export const App = () => {
  const [page, setPage] = useState<number>(1);
  const genres: any[] = useSelector(selectedGenres);
  console.log("genres: ", genres);
  const [data, loading, error] = useData("discover/movie", {
    language: "ru-RU",
    page: page,
    with_genres: genres.join(","),
  });

  const dispatch = useDispatch();
  dispatch(setDataAction(data));
  console.log("data: ", data);

  return (
    <>
      <Header />
      <MoviesPage data={data} loading={loading} />
    </>
  );
};

export default App;
