import { ThemeProvider } from "@emotion/react";
import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Fade, Grow, Rating, Typography, Zoom } from "@mui/material";
import React, { FC, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { endpoint, apiKey } from "../../API/apiInfo";
import { useData } from "../../hooks/useData";
import { setDataAction, setYears, setYearsStarting } from "../../redux/actionCreators";
import { selectedGenres, selectedYear, sortValue } from "../../redux/selectors";
import { theme } from "../../theme/theme";
import PageUp from "../UI/PageUp/PageUp";
import FiltersContainer from "./Filters/FiltersContainer/FiltersContainer";
import Loader from "./Loader/Loader";
import LoginModal from "./LoginModal/LoginModal";
import PaginationCont from "./Pagination/PaginationContainer";
import * as queryString from "query-string";

const MovieList = React.lazy(() => import("../MoviesPage/MovieList"));

const MoviesPage: FC = React.memo(() => {
  const [imgIsLoad, setImgIsLoad] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [films, setFilms] = useState<any>([]);

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
    const response = await fetch(URL);
    const filmsData = await response.json();
    setFilms(filmsData);
    dispatch(setDataAction(filmsData));
    setIsLoad(false);
  };

  useEffect(() => {
    setIsLoad(true);
    fetchFilms("discover/movie", {
      language: "ru-RU",
      with_genres: genres.join(","),
      page: page,
      sort_by: sortBy,
      primary_release_year: year,
      limit: 10,
    });
    // setImgIsLoad(true);
  }, [genres, sortBy, year, page]);

  // if (error.length !== 0) {
  //   return <Box sx={{ width: "100vw", mt: 10, display: "flex", justifyContent: "center" }}>Ошибка! Что-то пошло не так.</Box>;
  // }

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
            {/* {films.results.map((movie: any, i: number) => {
              return (
                <ThemeProvider theme={theme} key={movie.id}>
                  <Zoom in={movie.length !== 0} unmountOnExit>
                    <Box
                      sx={{
                        p: 1.5,
                        display: "flex",
                        backgroundColor: "$backgroundColor",
                        width: "33vw",
                        flex: "1 1 auto",
                      }}
                    >
                      <Card sx={{ display: "flex", flexDirection: "row", backgroundColor: "#383b47", color: "white", ml: 1.5, width: "100%" }}>
                        <Loader display={imgIsLoad ? "flex" : "none"} width='50%' />
                        <Fade in={!imgIsLoad} style={{ transitionDelay: "100ms" }}>
                          <CardMedia
                            component='img'
                            onLoad={() => setImgIsLoad(false)}
                            src={
                              movie.poster_path === null
                                ? `https://cdn.shopk.it/assets/store/img/no-img.png`
                                : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                            }
                            sx={[
                              { width: "50%" },
                              imgIsLoad && {
                                display: "none",
                              },
                              !imgIsLoad && {
                                display: "",
                              },
                            ]}
                          />
                        </Fade>
                        <CardContent sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
                          <Typography gutterBottom variant='h5' component='div'>
                            {movie.title}
                          </Typography>
                          <Typography component='legend'>Рейтинг: {movie.vote_average} stars</Typography>
                          <Rating precision={0.1} size='small' readOnly defaultValue={movie.vote_average} max={10} sx={{ color: "$primaryColor" }} />
                          <Typography sx={{ mt: 1, width: "100%" }}>
                            {movie.overview.length === 0
                              ? "Описание отсутствует"
                              : movie.overview.length > 150
                              ? movie.overview.substring(0, 150) + "..."
                              : movie.overview}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Box>
                  </Zoom>
                </ThemeProvider>
              );
            })} */}
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
