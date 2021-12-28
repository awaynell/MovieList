import { CircularProgress } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiKey } from "../../API/apiKey";
import { useData } from "../../hooks/useData";
import { trendingData } from "../../redux/selectors";

interface MoviesPageProps {
  data: any;
  loading: boolean;
  error?: any;
}

const MoviesPage: FC<MoviesPageProps> = ({ data, loading, error }) => {
  console.log("data: ", data);
  return (
    <div>
      {data.length === 0 ? (
        <CircularProgress />
      ) : (
        data.results.map((movie: any) => {
          return (
            <>
              <img src={"https://image.tmdb.org/t/p/w300" + movie.poster_path} alt='' />
              <div key={movie.id}>{movie.title}</div>
            </>
          );
        })
      )}
    </div>
  );
};

export default MoviesPage;
