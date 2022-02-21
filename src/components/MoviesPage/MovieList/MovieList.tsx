import { ThemeProvider } from "@emotion/react";
import { Zoom, Box, Card, Fade, CardMedia, CardContent, Typography, Rating, Tooltip, Alert, Snackbar } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { theme } from "../../../theme/theme";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { favouriteIDs, userInfo, watchlistIDs } from "../../../redux/selectors";
import { apiKey } from "../../../API/apiInfo";
import { getSessionIDFromCookie } from "../../../helpers/authHelpers/getSessionIDFromCookie";
import { useData } from "../../../hooks/useData";
import { setFavouriteFilm } from "../../../helpers/setFavouriteFilm";
import { setFavouritesMovies, setWatchlist, updateFavourites, updateWatchlist } from "../../../redux/actionCreators";
import { getFavouriteMovies } from "../../../helpers/getFavouriteMovies";
import { getWatchlist } from "../../../helpers/getWatchlist";
import { setWatchlistMovie } from "../../../helpers/setWatchlistMovie";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import MoviePage from "../../MoviePage/MoviePage";

interface MovieListProps {
  films: any;
  imgIsLoad: boolean;
  setImgIsLoad: any;
  style?: object;
  page?: number;
}

const MovieList: FC<MovieListProps> = ({ films, imgIsLoad, setImgIsLoad, style, page }) => {
  const [openSuccessAdded, setOpenSuccessAdded] = useState<boolean>(false);
  const [openSuccessDeleted, setOpenSuccessDeleted] = useState<boolean>(false);

  const { id: userID } = useSelector(userInfo);
  const favID = useSelector(favouriteIDs);
  const watchID = useSelector(watchlistIDs);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const buttonFavouriteHandler = (movieID: number) => {
    const isFavourite = favID.includes(movieID);
    console.log("buttonFavouriteHandler: work");
    dispatch(updateFavourites({ userID, movieID, isFavourite }));
    if (!isFavourite) {
      setOpenSuccessAdded(true);
    }
    if (isFavourite) {
      setOpenSuccessDeleted(true);
    }
  };

  const buttonWatchlistHandler = (movieID: number) => {
    const isWatched = watchID.includes(movieID);
    console.log("buttonWatchlistHandler: work");
    dispatch(updateWatchlist({ userID, movieID, isWatched }));
    if (!isWatched) {
      setOpenSuccessAdded(true);
    }
    if (isWatched) {
      setOpenSuccessDeleted(true);
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
        <Zoom in={movie.length !== 0} unmountOnExit>
          <Box
            sx={
              style && !!Object.keys(style).length
                ? style
                : {
                    p: 1.5,
                    display: "flex",
                    backgroundColor: "$backgroundColor",
                    width: "33vw",
                    flex: "1 1 auto",
                  }
            }
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
                  onClick={() => navigate(`/movie/${movie.id}`)}
                />
              </Fade>
              <CardContent sx={{ display: "flex", flexDirection: "column", width: "50%" }} onClick={() => navigate(`/movie/${movie.id}`)}>
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
                {userID !== undefined && (
                  <Box sx={{ display: "flex", mt: "auto", width: "100%", justifyContent: "flex-end" }}>
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
            <Snackbar open={openSuccessAdded} autoHideDuration={1500} onClose={handleClose}>
              <Alert onClose={handleClose} severity='success' sx={{ width: "100%" }}>
                Добавлено успешно!
              </Alert>
            </Snackbar>
            <Snackbar open={openSuccessDeleted} autoHideDuration={1500} onClose={handleClose}>
              <Alert onClose={handleClose} severity='error' sx={{ width: "100%" }}>
                Успешно удалено!
              </Alert>
            </Snackbar>
          </Box>
        </Zoom>
      </ThemeProvider>
    );
  });
};

export default MovieList;
