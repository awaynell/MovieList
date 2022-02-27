import { ThemeProvider } from "@emotion/react";
import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Fade, Grow, Rating, Typography, Zoom } from "@mui/material";
import React, { FC, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { endpoint, apiKey } from "../../API/apiInfo";
import { useData } from "../../hooks/useData";
import { setCurrentPage, setDataAction } from "../../redux/actionCreators";
import { currentPage, selectedGenres, selectedYear, sortValue, totalPages } from "../../redux/selectors";
import { theme } from "../../theme/theme";
import PageUp from "../UI/PageUp/PageUp";
import FiltersContainer from "./Filters/FiltersContainer/FiltersContainer";
import Loader from "./Loader/Loader";
import LoginModal from "./LoginModal/LoginModal";
import PaginationCont from "./Pagination/PaginationContainer";
import * as queryString from "query-string";
import { RESET_GENRES } from "../../redux/actionTypes";
import { useParams } from "react-router-dom";
import MovieList from "./MovieList/MovieList";

const MoviesPage: FC = React.memo(() => {
  const curPage = useSelector(currentPage);

  const [imgIsLoad, setImgIsLoad] = useState<boolean>(true);
  const [page, setPage] = useState<number>(curPage);
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [films, setFilms] = useState<any>([]);
  const [error, setError] = useState<boolean>(false);

  const genres: any[] = useSelector(selectedGenres);
  const allOfPages = useSelector(totalPages);

  const sortBy = useSelector(sortValue);
  const year = useSelector(selectedYear);

  const dispatch = useDispatch();

  // const [data, loading, error] = useData("discover/movie", {
  //   language: "ru-RU",
  //   with_genres: genres.join(","),
  //   page: page,
  //   sort_by: sortBy,
  //   primary_release_year: year,
  //   limit: 10,
  // });

  const fetchFilms = async (route: string, query: object) => {
    const URL = `${endpoint}${route}?${"api_key=" + apiKey}&${queryString.stringify(query)}`;
    try {
      setIsLoad(true);
      const response = await fetch(URL);
      const filmsData = await response.json();
      setFilms(filmsData);
      dispatch(setDataAction(filmsData));
    } catch {
      setError(true);
    } finally {
      setIsLoad(false);
    }
  };

  dispatch(setCurrentPage(page));
  useEffect(() => {
    let genreIDs: any = [];
    if (genres.length !== 0) {
      genres.map((genre) => genreIDs.push(genre.id));
    }
    fetchFilms("discover/movie", {
      language: "ru-RU",
      with_genres: genreIDs.join(","),
      page: curPage,
      sort_by: sortBy,
      primary_release_year: year,
      limit: 10,
    });
    genreIDs = [];
    setImgIsLoad(true);
  }, [genres, sortBy, year, curPage]);

  if (error) {
    return <Box sx={{ width: "100vw", mt: 10, display: "flex", justifyContent: "center" }}>Ошибка! Что-то пошло не так.</Box>;
  }

  return (
    <Box
      sx={{
        mt: 2,
        display: "flex",
        flexWrap: "nowrap",
        flexDirection: "row-reverse",
      }}
    >
      <Box>
        <Box sx={{ display: "flex", justifyContent: "end", flexDirection: "column", pt: 0.75, width: "25vw" }}>
          <FiltersContainer />
          <PaginationCont setPage={setPage} allOfPages={allOfPages} />
        </Box>
        <PageUp />
      </Box>
      <div>
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-end", width: "70vw" }}>
          {isLoad ? <Loader display='flex' width='80%' /> : <MovieList films={films} imgIsLoad={imgIsLoad} setImgIsLoad={setImgIsLoad} page={page} />}
        </Box>
      </div>
    </Box>
  );
});

// TODO
// Разобраться почему при переходе на список фильмов к просмотру не появляются значки добавленного в watchlist
// Сделать роуты на фильмы

export default MoviesPage;
