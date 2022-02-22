import "./MoviePage.scss";
import { Box, Chip, Rating, ThemeProvider, Typography } from "@mui/material";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../hooks/useData";
import { theme } from "../../theme/theme";
import Loader from "../MoviesPage/Loader/Loader";
import StarIcon from "@mui/icons-material/Star";

interface MoviePageProps {
  movie?: object;
}

const MoviePage: FC<MoviePageProps> = ({ movie }) => {
  const { id } = useParams();
  const [movieDetails, loadingMovieDetails, error] = useData(`/movie/${id}`, {
    language: "ru-RU",
  });
  const [movieTrailers, loadingMovieTrailers, errorMovieTrailers] = useData(`/movie/${id}/videos`, {
    language: "ru-RU",
  });

  console.log(movieDetails);
  console.log("movieTrailers: ", movieTrailers);
  return (
    <ThemeProvider theme={theme}>
      {loadingMovieDetails ? (
        <Loader display='flex' width='100%' />
      ) : (
        <>
          <Box
            className='movie-backdrop'
            sx={{
              background: `url(https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}) no-repeat`,
            }}
          ></Box>
          <Box className='movie-wrapper'>
            <Typography sx={{ fontWeight: "500", fontSize: "3vw", mt: 4 }}>{movieDetails.title}</Typography>
            <Box className='movie-details'>
              <Typography sx={{ pl: 10, pr: 10, fontSize: "2vw", overflow: "auto" }}>{movieDetails.overview}</Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Rating
                    precision={0.5}
                    size='large'
                    readOnly
                    defaultValue={movieDetails.vote_average}
                    max={10}
                    emptyIcon={<StarIcon style={{ opacity: 1, color: "#efe1ce" }} fontSize='inherit' />}
                  />
                  <Typography component='legend'>{movieDetails.vote_average}</Typography>
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                  {movieDetails.genres.map(({ id, name }: { id: number; name: string }) => {
                    return <Chip key={id} label={name} />;
                  })}
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </ThemeProvider>
  );
};

export default MoviePage;
