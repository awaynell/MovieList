import { ThemeProvider } from "@emotion/react";
import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Fade, Grow, Rating, Typography, Zoom } from "@mui/material";
import React, { FC, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { endpoint, apiKey } from "../../API/apiInfo";
import { useData } from "../../hooks/useData";
import { setDataAction } from "../../redux/actionCreators";
import { selectedGenres, selectedYear, sortValue } from "../../redux/selectors";
import { theme } from "../../theme/theme";
import PageUp from "../UI/PageUp/PageUp";
import FiltersContainer from "./Filters/FiltersContainer/FiltersContainer";
import Loader from "./Loader/Loader";
import LoginModal from "./LoginModal/LoginModal";
import PaginationCont from "./Pagination/PaginationContainer";
import * as queryString from "query-string";
import { RESET_GENRES } from "../../redux/actionTypes";

const MovieList = React.lazy(() => import("./MovieList/MovieList"));

const MoviesPage: FC = React.memo(() => {
  const [imgIsLoad, setImgIsLoad] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [films, setFilms] = useState<any>([]);
  const [error, setError] = useState<boolean>(false);

  const genres: any[] = useSelector(selectedGenres);

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

  useEffect(() => {
    let genreIDs: any = [];
    if (genres.length !== 0) {
      genres.map((genre) => genreIDs.push(genre.id));
    }
    console.log("genreIDs: ", genreIDs);
    setIsLoad(true);
    fetchFilms("discover/movie", {
      language: "ru-RU",
      with_genres: genreIDs.join(","),
      page: page,
      sort_by: sortBy,
      primary_release_year: year,
      limit: 10,
    });
    genreIDs = [];
    // setImgIsLoad(true);
  }, [genres, sortBy, year, page]);

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
      <LoginModal />
      <Box>
        <Box sx={{ display: "flex", justifyContent: "end", flexDirection: "column", pt: 0.75 }}>
          <FiltersContainer />
          <PaginationCont setPage={setPage} />
        </Box>
        <PageUp />
      </Box>
      <div>
        {isLoad ? (
          <Box sx={{ width: "70vw", height: "50vh" }}>
            <Loader display='flex' width='50vw' height='50vh' />
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-end", width: "70vw" }}>
            <Suspense fallback={<Loader display='flex' width='100%' height='100%' />}>
              <MovieList films={films} imgIsLoad={imgIsLoad} setImgIsLoad={setImgIsLoad} />
            </Suspense>
          </Box>
        )}
      </div>
    </Box>
  );
});

export default MoviesPage;
