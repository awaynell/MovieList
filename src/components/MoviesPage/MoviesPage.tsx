import { ThemeProvider } from "@emotion/react";
import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Fade, Grow, Rating, Typography, Zoom } from "@mui/material";
import React, { FC, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useData } from "../../hooks/useData";
import { setDataAction, setYears, setYearsStarting } from "../../redux/actionCreators";
import { selectedGenres, selectedYear, sortValue } from "../../redux/selectors";
import { theme } from "../../theme/theme";
import FiltersContainer from "./Filters/FiltersContainer/FiltersContainer";
import Loader from "./Loader/Loader";
import LoginModal from "./LoginModal/LoginModal";
import PaginationCont from "./Pagination/PaginationContainer";

// interface MoviesPageProps {
//   data: any;
//   loading: boolean;
//   error?: any;
// }

const MoviesPage: FC = React.memo(() => {
  const [imgIsLoad, setImgIsLoad] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const genres: any[] = useSelector(selectedGenres);
  const sortBy = useSelector(sortValue);
  const year = useSelector(selectedYear);

  const [data, loading, error] = useData("discover/movie", {
    language: "ru-RU",
    with_genres: genres.join(","),
    page: page,
    sort_by: sortBy,
    primary_release_year: year,
    limit: 10,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDataAction(data));
    setImgIsLoad(true);
  }, [loading]);

  console.log(error);

  if (error.length !== 0) {
    return <Box sx={{ width: "100vw", mt: 10, display: "flex", justifyContent: "center" }}>Ошибка! Что-то пошло не так.</Box>;
  }

  return (
    <Box
      sx={{
        mt: 2,
        display: "flex",
        flexWrap: "nowrap",
      }}
    >
      <LoginModal />
      <Box>
        <Box sx={{ display: "flex", justifyContent: "start", flexDirection: "column" }}>
          <FiltersContainer />
          <PaginationCont setPage={setPage} />
        </Box>
      </Box>
      <div>
        {data && loading ? (
          <Box sx={{ width: "70vw", height: "50vh" }}>
            <Loader display='flex' width='50vw' height='50vh' />
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "start", width: "70vw" }}>
            {data.results.map((movie: any, i: number) => {
              return (
                <ThemeProvider theme={theme} key={movie.id}>
                  <Zoom in={movie} unmountOnExit>
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
                                : `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
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
            })}
          </Box>
        )}
      </div>
    </Box>
  );
});

export default MoviesPage;
