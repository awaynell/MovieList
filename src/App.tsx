import { useState } from "react";
import { useDispatch } from "react-redux";
import { apiKey } from "./API/apiKey";
import { useData } from "./hooks/useData";
import MoviesPage from "./components/MoviesPage/MoviesPage";
import { setDataAction } from "./redux/actionCreators";
import "./App.scss";
import Header from "./components/Header/Header";

export const App = () => {
  const [page, setPage] = useState<number>(1);
  const [data, loading, error] = useData("/trending/movie/day", {
    api_key: apiKey,
    language: "ru-RU",
    page: page,
  });
  console.log("data: ", data);

  return (
    <>
      <Header />
      <MoviesPage data={data} loading={loading} />
    </>
  );
};

export default App;
