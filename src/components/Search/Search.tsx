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
import "./Search.scss";

const Search = React.memo(() => {
  const [imgIsLoad, setImgIsLoad] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const dispatch = useDispatch();

  const searchQ = useSelector(searchQuery);
  const loading = useSelector(searchLoading);
  const pageOfSearch = useSelector(searchPage);
  const searchedFilms = useSelector(searchedMovies);

  const handleChange = (event: React.ChangeEvent<unknown>, page: number): void => {
    setPage(page);
  };

  useEffect(() => {
    dispatch(setSearchPage(page));
  }, [page]);

  if (searchQ.length === 0) {
    return <Typography sx={{ width: "100%", height: "100%", textAlign: "center", mt: 10 }}>Введите текст в поисковую строку</Typography>;
  }
  if (!loading && searchedFilms.results.length === 0) {
    return <Typography sx={{ width: "100%", height: "100%", textAlign: "center", mt: 10 }}>Фильмов не найдено</Typography>;
  }
  // console.log("searchedMovie: ", searchedMovie);
  return (
    <Box className='searchMovies-wrapper'>
      {loading && <Loader display='flex' width='100%' height='50%' />}
      {loading === false && searchedFilms && searchQ.length !== 0 && (
        <>
          <MovieList style={{ display: "flex", width: "100%", p: 1 }} films={searchedFilms} imgIsLoad={imgIsLoad} setImgIsLoad={setImgIsLoad} />
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
