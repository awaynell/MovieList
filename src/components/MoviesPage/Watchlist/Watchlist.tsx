import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userInfo, watchlistIDs } from "../../../redux/selectors";
import Loader from "../Loader/Loader";
import MovieList from "../MovieList/MovieList";
import { Box, Typography } from "@mui/material";
import PageUp from "../../UI/PageUp/PageUp";
import PaginationContainer from "../Pagination/PaginationContainer";
import { getWatchlist } from "../../../helpers/getWatchlist";
import "./Watchlist.scss";

const Watchlist = () => {
  const [imgIsLoad, setImgIsLoad] = useState<boolean>(true);
  const [watchedMovies, setWatchedMovies] = useState<{ results: []; total_pages: number }>({
    results: [],
    total_pages: 1,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const watchedID = useSelector(watchlistIDs);
  const { id } = useSelector(userInfo);

  const getWatchedMovie = () => {
    getWatchlist(id, {
      language: "ru-RU",
      page: page,
    })
      .then((json) =>
        setWatchedMovies({
          ...watchedMovies,
          results: json,
          total_pages: Math.trunc(json.length / 20),
        }),
      )
      .then(() => setLoading(false));
  };

  useEffect(() => {
    getWatchedMovie();
  }, [watchedID]);

  return (
    <Box className='watchlist-wrapper'>
      {loading ? (
        <Loader display='flex' width='100%' />
      ) : watchedMovies.results.length === 0 ? (
        <Typography sx={{ width: "100%", textAlign: "center", mt: 3 }}>
          У вас нет выбранных для просмотра фильмов
        </Typography>
      ) : (
        <>
          <MovieList
            films={watchedMovies}
            imgIsLoad={imgIsLoad}
            setImgIsLoad={setImgIsLoad}
            page={page}
            style={{ flex: "1 1 48%" }}
          />
          <PageUp />
        </>
      )}
    </Box>
  );
};

export default Watchlist;
