import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userInfo, watchlistIDs } from "../../../redux/selectors";
import Loader from "../Loader/Loader";
import MovieList from "../MovieList/MovieList";
import { Box, Typography } from "@mui/material";
import PageUp from "../../UI/PageUp/PageUp";
import PaginationContainer from "../Pagination/PaginationContainer";
import { getWatchlist } from "../../../helpers/getWatchlist";

const Watchlist = () => {
  const [imgIsLoad, setImgIsLoad] = useState<boolean>(true);
  const [watchedMovies, setWatchedMovies] = useState<{ results: []; total_pages: number }>({ results: [], total_pages: 1 });
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const watchedID = useSelector(watchlistIDs);
  const { id } = useSelector(userInfo);

  const getWatchedMovie = () => {
    getWatchlist(id, {
      language: "ru-RU",
      page: page,
    })
      .then((json) => setWatchedMovies(json))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    getWatchedMovie();
  }, [watchedID, page]);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start", width: "95vw" }}>
      {loading ? (
        <Loader display='flex' width='100%' />
      ) : watchedMovies.results.length === 0 ? (
        <Typography sx={{ width: "100%", textAlign: "center", mt: 3 }}>У вас нет выбранных для просмотра фильмов</Typography>
      ) : (
        <>
          <MovieList
            films={watchedMovies}
            imgIsLoad={imgIsLoad}
            setImgIsLoad={setImgIsLoad}
            style={{ display: "flex", flex: "1 1 auto", width: "33vw", p: 1, alignItems: "flex-end" }}
            page={page}
          />
          <PageUp />
        </>
      )}
    </Box>
  );
};

export default Watchlist;
