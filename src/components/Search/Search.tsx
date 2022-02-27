import { Pagination, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useData } from "../../hooks/useData";
import { searchedMovies, searchLoading, searchPage, searchQuery } from "../../redux/selectors";
import MovieList from "../MoviesPage/MovieList/MovieList";
import * as queryString from "query-string";
import PaginationContainer from "../MoviesPage/Pagination/PaginationContainer";
import Loader from "../MoviesPage/Loader/Loader";
import { setSearchPage } from "../../redux/actionCreators";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../theme/theme";

const Search = React.memo(() => {
  const [imgIsLoad, setImgIsLoad] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const dispatch = useDispatch();

  const searchQ = useSelector(searchQuery);
  const loading = useSelector(searchLoading);
  const pageOfSearch = useSelector(searchPage);
  const searchedFilms = useSelector(searchedMovies);
  console.log("searchedFilms: ", searchedFilms);

  const handleChange = (event: React.ChangeEvent<unknown>, page: number): void => {
    setPage(page);
  };

  useEffect(() => {
    dispatch(setSearchPage(page));
  }, [page]);

  if (searchQ.length === 0) {
    return <Typography>Введите текст в поисковую строку</Typography>;
  }
  // if (!loading && searchedFilms.results.length === 0) {
  //   return <Typography>Фильмов не найдено</Typography>;
  // }
  // console.log("searchedMovie: ", searchedMovie);
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start", width: "95vw" }}>
      {loading && <Loader display='flex' width='100%' height='50%' />}
      {loading === false && (
        <>
          <MovieList
            style={{ display: "flex", width: "33%", flex: "1 1 auto", p: 1, alignItems: "stretch" }}
            films={searchedFilms}
            imgIsLoad={imgIsLoad}
            setImgIsLoad={setImgIsLoad}
          />
          <ThemeProvider theme={theme}>
            <Pagination
              variant='text'
              color='primary'
              page={pageOfSearch}
              count={searchedFilms.total_pages}
              onChange={handleChange}
              sx={{ color: "red", width: "100%" }}
            />
          </ThemeProvider>
        </>
      )}
    </Box>
  );
});

export default Search;
