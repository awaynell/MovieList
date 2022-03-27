import "./MoviesPage.scss";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Fade,
  Grow,
  Rating,
  Typography,
  Zoom,
} from "@mui/material";
import React, { FC, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { endpoint, apiKey } from "../../API/apiInfo";
import { addGenre, removeGenre, setCurrentPage, setDataAction } from "../../redux/actionCreators";
import {
  currentPage,
  selectedGenres,
  selectedYear,
  sortValue,
  totalPages,
} from "../../redux/selectors";
import PageUp from "../UI/PageUp/PageUp";
import FiltersContainer from "./Filters/FiltersContainer/FiltersContainer";
import Loader from "./Loader/Loader";
import PaginationCont from "./Pagination/PaginationContainer";
import * as queryString from "query-string";
import MovieList from "./MovieList/MovieList";
import { Genre } from "./Filters/FiltersContainer/Genres/Genres";
import { theme } from "../../theme/theme";

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
  const choosedGenres = useSelector(selectedGenres);

  const dispatch = useDispatch();

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
    return (
      <Box sx={{ width: "100vw", mt: 10, display: "flex", justifyContent: "center" }}>
        Ошибка! Что-то пошло не так.
      </Box>
    );
  }

  const deleteGenreFromState = (id: string, genreName: string) => {
    let newArray: any = [...choosedGenres];
    for (let i = 0; i < newArray.length; i++) {
      if (newArray[i].id === id) {
        newArray = newArray.filter((genreObj: any) => genreObj.id !== id);
        dispatch(removeGenre(id));
        return false;
      }
    }
  };

  return (
    <Box className='moviesPage-wrapper'>
      <Box>
        <Box className='moviesPage-sidebar'>
          <FiltersContainer />
          <PaginationCont setPage={setPage} allOfPages={allOfPages} />
        </Box>
        <PageUp />
      </Box>
      <div>
        <Box className='genres-chip'>
          {choosedGenres.length !== 0 &&
            choosedGenres.map((genre: Genre) => (
              <Chip
                color='primary'
                key={genre.id}
                label={genre.genreName}
                sx={{ color: "#363945", m: 0.3 }}
                onDelete={() => deleteGenreFromState(genre.id, genre.genreName)}
              />
            ))}
        </Box>
        <Box className='moviesPage-content'>
          {isLoad ? (
            <Loader display='flex' width='80%' />
          ) : (
            <MovieList
              films={films}
              imgIsLoad={imgIsLoad}
              setImgIsLoad={setImgIsLoad}
              page={page}
            />
          )}
        </Box>
      </div>
    </Box>
  );
});

export default MoviesPage;
