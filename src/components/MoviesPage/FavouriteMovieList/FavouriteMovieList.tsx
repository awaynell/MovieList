import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useData } from "../../../hooks/useData";
import { favouriteIDs, userInfo } from "../../../redux/selectors";
import { apiKey } from "../../../API/apiInfo";
import { getSessionIDFromCookie } from "../../../helpers/authHelpers/getSessionIDFromCookie";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import MovieList from "../MovieList/MovieList";
import { Box, Typography } from "@mui/material";
import { getFavouriteMovies } from "../../../helpers/getFavouriteMovies";
import PageUp from "../../UI/PageUp/PageUp";
import PaginationContainer from "../Pagination/PaginationContainer";

const FavouriteMovieList = () => {
  const [imgIsLoad, setImgIsLoad] = useState<boolean>(true);
  const [favMovies, setFavMovies] = useState<{ results: []; total_pages: number }>({ results: [], total_pages: 1 });
  console.log("favMovies: ", favMovies);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const favID = useSelector(favouriteIDs);

  const { id } = useSelector(userInfo);

  // const [data, loading, error] = useData(`/account/${id}/favorite/movies`, {
  //   api_key: apiKey,
  //   session_id: getSessionIDFromCookie().value,
  //   language: "ru-RU",
  // });

  const getFavMovies = () => {
    getFavouriteMovies(id, {
      language: "ru-RU",
      page: page,
    })
      .then((json) => setFavMovies(json))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    getFavMovies();
  }, [favID, page]);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start", width: "95vw" }}>
      {loading ? (
        <Loader display='flex' width='100%' />
      ) : favMovies.results.length === 0 ? (
        <Typography sx={{ width: "100%", textAlign: "center", mt: 3 }}>У вас нет любимых фильмов</Typography>
      ) : (
        <>
          <MovieList
            films={favMovies}
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

export default FavouriteMovieList;
