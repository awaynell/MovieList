import { ThemeProvider } from "@emotion/react";
import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Rating, Typography } from "@mui/material";
import React, { FC, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useData } from "../../hooks/useData";
import { setDataAction } from "../../redux/actionCreators";
import { currentPage, selectedGenres, sortValue } from "../../redux/selectors";
import { theme } from "../../theme/theme";
import FiltersContainer from "./Filters/FiltersContainer/FiltersContainer";
import Loader from "./Loader/Loader";
import PaginationCont from "./Pagination/PaginationCont";

// interface MoviesPageProps {
//   data: any;
//   loading: boolean;
//   error?: any;
// }

const MoviesPage: FC = React.memo(() => {
  const [imgIsLoad, setImgIsLoad] = useState<boolean>(true);

  const page = useSelector(currentPage);
  const genres: any[] = useSelector(selectedGenres);
  const sortBy = useSelector(sortValue);

  const [data, loading, error] = useData("discover/movie", {
    language: "ru-RU",
    with_genres: genres.join(","),
    page: page,
    sort_by: sortBy,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDataAction(data));
    setImgIsLoad(true);
  }, [loading]);

  if (error.length !== 0) {
    return <div>Ошибка! {error[0]}</div>;
  }

  return (
    <Box
      sx={{
        mt: 2,
        display: "flex",
        flexWrap: "nowrap",
      }}
    >
      <Box>
        <Box sx={{ display: "flex", justifyContent: "start", flexDirection: "column" }}>
          <FiltersContainer />
          <PaginationCont />
        </Box>
      </Box>
      <div>
        {data && loading ? (
          <Box sx={{ width: "50vw", height: "50vh" }}>
            <Loader display='flex' width='50vw' height='50vh' />
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "start", width: "70vw" }}>
            {data.results.map((movie: any) => {
              return (
                <ThemeProvider theme={theme} key={movie.id}>
                  <Box
                    sx={{
                      p: 1.5,
                      display: "flex",
                      backgroundColor: "$backgroundColor",
                      width: "33vw",
                      flex: "1 1 auto",
                    }}
                  >
                    <Card sx={{ display: "flex", flexDirection: "row", backgroundColor: "#383b47", color: "white", ml: 1.5 }}>
                      <Loader display={imgIsLoad ? "flex" : "none"} width='50%' />
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
