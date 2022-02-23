import "./MoviePage.scss";
import { Box, Button, Chip, Fade, Rating, ThemeProvider, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../hooks/useData";
import { theme } from "../../theme/theme";
import Loader from "../MoviesPage/Loader/Loader";
import StarIcon from "@mui/icons-material/Star";
import ModalTrailer from "./ModalTrailer/ModalTrailer";

interface MoviePageProps {
  movie?: object;
}

const MoviePage: FC<MoviePageProps> = ({ movie }) => {
  const { id } = useParams();
  const [isOpenModalTrailer, setIsOpenModalTrailer] = useState<boolean>(false);
  const [movieDetails, loadingMovieDetails, error] = useData(`/movie/${id}`, {
    language: "ru-RU",
  });
  const [movieTrailers, loadingMovieTrailers, errorMovieTrailers] = useData(`/movie/${id}/videos`, {
    language: "ru-RU",
  });

  console.log(movieDetails);
  console.log("movieTrailers: ", movieTrailers.results);
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
          <Box className='movie-wrapper' sx={{ mt: 4 }}>
            <Box className='movie-details'>
              <Fade in={!loadingMovieDetails} style={{ transitionDelay: "150ms" }}>
                <Box className='movie-poster' sx={{ width: "50%", height: "100%", mt: 1 }}>
                  <img src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} />
                </Box>
              </Fade>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Fade in={!loadingMovieDetails} style={{ transitionDelay: "300ms" }}>
                  <Typography sx={{ fontWeight: "500", fontSize: "1.3em", mr: 3, width: "100%" }}>{movieDetails.title}</Typography>
                </Fade>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Fade in={!loadingMovieDetails} style={{ transitionDelay: "600ms" }}>
                    <Box>
                      <Typography sx={{ fontSize: "0.7em", width: "80%" }}>{movieDetails.overview}</Typography>
                    </Box>
                  </Fade>
                  <Fade in={!loadingMovieDetails} style={{ transitionDelay: "900ms" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Rating
                        precision={0.1}
                        size='large'
                        readOnly
                        defaultValue={movieDetails.vote_average}
                        max={10}
                        emptyIcon={<StarIcon style={{ opacity: 0.5, color: "#efe1ce" }} fontSize='inherit' />}
                      />
                      <Typography component='legend'>{movieDetails.vote_average}</Typography>
                    </Box>
                  </Fade>
                  <Fade in={!loadingMovieDetails} style={{ transitionDelay: "1000ms" }}>
                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                      {movieDetails.genres.map(({ id, name }: { id: number; name: string }) => {
                        return <Chip key={id} label={name} />;
                      })}
                    </Box>
                  </Fade>
                  {!loadingMovieTrailers && movieTrailers.results.length !== 0 && (
                    <>
                      <ModalTrailer youtubeID={movieTrailers.results[0].key} isOpen={isOpenModalTrailer} setIsOpen={setIsOpenModalTrailer} />
                      <Button onClick={() => setIsOpenModalTrailer(true)}>Смотреть трейлер</Button>
                    </>
                  )}
                  {!loadingMovieTrailers && movieTrailers.results.length === 0 && <Typography>Трейлеры отсутствуют</Typography>}
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
