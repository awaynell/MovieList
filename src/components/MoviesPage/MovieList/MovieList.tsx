import { ThemeProvider } from "@emotion/react";
import "./MovieList.scss";
import { Box, Card, Fade, CardMedia, CardContent, Typography, Rating, Tooltip, Alert, Snackbar } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { theme } from "../../../theme/theme";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getFavouriteMovies } from "../../../helpers/getFavouriteMovies";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import { getSessionIDFromCookie } from "../../../helpers/authHelpers/getSessionIDFromCookie";
import { getWatchlist } from "../../../helpers/getWatchlist";
import { updateFavourites, updateWatchlist, setFavouritesMovies, setWatchlist } from "../../../redux/actionCreators";
import { userInfo, favouriteIDs, watchlistIDs } from "../../../redux/selectors";
import Slide, { SlideProps } from "@mui/material/Slide";

interface MovieListProps {
  films: any;
  imgIsLoad: boolean;
  setImgIsLoad: (load: boolean) => void;
  style?: object;
  page?: number;
}

const MovieList: FC<MovieListProps> = React.memo(({ films, imgIsLoad, setImgIsLoad, style, page }) => {
  const [openSuccessAdded, setOpenSuccessAdded] = useState<boolean>(false);
  const [openSuccessDeleted, setOpenSuccessDeleted] = useState<boolean>(false);

  const { id: userID } = useSelector(userInfo);
  const favID = useSelector(favouriteIDs);
  const watchID = useSelector(watchlistIDs);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const buttonFavouriteHandler = (movieID: number) => {
    const isFavourite = favID.includes(movieID);
    if (!isFavourite) {
      setOpenSuccessAdded(true);
    }
    if (isFavourite) {
      setOpenSuccessDeleted(true);
    }
    dispatch(updateFavourites({ userID, movieID, isFavourite }));
  };

  const buttonWatchlistHandler = (movieID: number) => {
    const isWatched = watchID.includes(movieID);
    dispatch(updateWatchlist({ userID, movieID, isWatched }));
    if (!isWatched) {
      setOpenSuccessAdded(true);
      return;
    }
    if (isWatched) {
      setOpenSuccessDeleted(true);
      return;
    }
  };

  const getInitialData = async () => {
    const favID = await getFavouriteMovies(userID, {
      language: "ru-RU",
    });
    const favIDs = favID.results.map((item: { id: number }) => item.id);
    dispatch(setFavouritesMovies(favIDs));
    const watchlistID = await getWatchlist(userID, {
      language: "ru-RU",
    });
    const watchlistIDs = watchlistID.results.map((item: { id: number }) => item.id);
    dispatch(setWatchlist(watchlistIDs));
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessAdded(false);
    setOpenSuccessDeleted(false);
  };

  useEffect(() => {
    if (getSessionIDFromCookie().value !== undefined) {
      getInitialData();
    }
  }, []);

  return films.results.map((movie: any, i: number) => {
    return (
      <ThemeProvider theme={theme} key={movie.id}>
        <Fade in={movie.length !== 0} style={{ transitionDelay: `${100 * i}ms` }}>
          <Box className='movieCard-wrapper' sx={style}>
            <Card className='movieCard'>
              <Loader display={imgIsLoad ? "flex" : "none"} width='50%' height='100%' />
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
                      cursor: "pointer",
                    },
                  ]}
                  onClick={() => navigate(`/movie/${movie.id}`)}
                />
              </Fade>
              <CardContent className='movieCard-content'>
                <Typography gutterBottom variant='h5' component='div' onClick={() => navigate(`/movie/${movie.id}`)} sx={{ cursor: "pointer" }}>
                  {movie.title}
                </Typography>
                <Typography component='legend'>Рейтинг: {movie.vote_average} stars</Typography>
                <Rating
                  className='movieCard-rating'
                  precision={0.5}
                  size='small'
                  readOnly
                  defaultValue={movie.vote_average}
                  emptyIcon={<StarIcon style={{ opacity: 0.5, color: "#efe1ce" }} fontSize='inherit' />}
                  max={10}
                />
                <Typography sx={{ mt: 1, width: "100%" }}>
                  {movie.overview.length === 0
                    ? "Описание отсутствует"
                    : movie.overview.length > 150
                    ? movie.overview.substring(0, 150) + "..."
                    : movie.overview}
                </Typography>
                {userID !== undefined && (
                  <Box className='movieCard-buttons'>
                    {!favID.includes(movie.id) ? (
                      <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 300 }} title='Добавить фильм в любимые'>
                        <FavoriteBorderIcon sx={{ cursor: "pointer" }} onClick={() => buttonFavouriteHandler(movie.id)} />
                      </Tooltip>
                    ) : (
                      <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 300 }} title='Удалить фильм из любимых'>
                        <FavoriteIcon sx={{ cursor: "pointer" }} onClick={() => buttonFavouriteHandler(movie.id)} />
                      </Tooltip>
                    )}
                    {!watchID.includes(movie.id) ? (
                      <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 300 }} title='Добавить фильм в список просмотра'>
                        <BookmarkBorderIcon sx={{ cursor: "pointer" }} onClick={() => buttonWatchlistHandler(movie.id)} />
                      </Tooltip>
                    ) : (
                      <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 300 }} title='Удалить фильм из списка просмотра'>
                        <BookmarkIcon sx={{ cursor: "pointer" }} onClick={() => buttonWatchlistHandler(movie.id)} />
                      </Tooltip>
                    )}
                  </Box>
                )}
              </CardContent>
            </Card>
            <Snackbar className='successAddSnackbar' open={openSuccessAdded} autoHideDuration={500} onClose={handleClose}>
              <Alert onClose={handleClose} severity='success' sx={{ width: "100%" }}>
                Добавлено успешно!
              </Alert>
            </Snackbar>
            <Snackbar className='successDeleteSnackbar' open={openSuccessDeleted} autoHideDuration={500} onClose={handleClose}>
              <Alert onClose={handleClose} severity='error' sx={{ width: "100%" }}>
                Успешно удалено!
              </Alert>
            </Snackbar>
          </Box>
        </Fade>
      </ThemeProvider>
    );
  });
});

export default MovieList;
