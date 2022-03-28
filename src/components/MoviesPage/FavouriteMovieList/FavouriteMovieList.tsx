import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useData } from "../../../hooks/useData";
import { favouriteIDs, userInfo } from "../../../redux/selectors";
import { apiKey } from "../../../API/apiInfo";
import { getSessionIDFromCookie } from "../../../helpers/authHelpers/getSessionIDFromCookie";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import MovieList from "../MovieList/MovieList";
import { Box, Pagination, Typography } from "@mui/material";
import { getFavouriteMovies } from "../../../helpers/getFavouriteMovies";
import PaginationContainer from "../Pagination/PaginationContainer";
import "./FavouriteMovieList.scss";

const FavouriteMovieList = () => {
  const [imgIsLoad, setImgIsLoad] = useState<boolean>(true);
  const [favMovies, setFavMovies] = useState<{ results: []; total_pages: number }>({
    results: [],
    total_pages: 1,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const favID = useSelector(favouriteIDs);

  const { id } = useSelector(userInfo);

  const getFavMovies = () => {
    getFavouriteMovies(id, {
      language: "ru-RU",
      page: page,
    })
      .then((json) =>
        setFavMovies({ ...favMovies, results: json, total_pages: Math.trunc(json.length / 20) }),
      )
      .then(() => setLoading(false));
  };

  useEffect(() => {
    getFavMovies();
  }, [favID]);

  return (
    <Box className='favMovies-wrapper'>
      {loading ? (
        <Loader display='flex' width='100%' />
      ) : favMovies.results.length === 0 ? (
        <Typography className='favMovies-undefined'>У вас нет любимых фильмов</Typography>
      ) : (
        <>
          <MovieList
            films={favMovies}
            imgIsLoad={imgIsLoad}
            setImgIsLoad={setImgIsLoad}
            page={page}
            style={{ flex: "1 1 48%" }}
          />
        </>
      )}
    </Box>
  );
};

export default FavouriteMovieList;
