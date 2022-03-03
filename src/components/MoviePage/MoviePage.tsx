import "./MoviePage.scss";
import { Box, Button, Chip, Fade, Rating, ThemeProvider, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../hooks/useData";
import { theme } from "../../theme/theme";
import Loader from "../MoviesPage/Loader/Loader";
import StarIcon from "@mui/icons-material/Star";
import ModalTrailer from "./ModalTrailer/ModalTrailer";
import CarouselContainer from "./Carousel/CarouselContainer";

const MoviePage = () => {
  const { id } = useParams();
  const [isOpenModalTrailer, setIsOpenModalTrailer] = useState<boolean>(false);
  const [backdropLoading, setBackdropLoading] = useState<boolean>(true);

  const [movieDetails, loadingMovieDetails, error] = useData(`/movie/${id}`, {
    language: "ru-RU",
  });
  console.log("movieDetails: ", movieDetails);
  const [movieTrailers, loadingMovieTrailers, errorMovieTrailers] = useData(`/movie/${id}/videos`, {
    language: "ru-RU",
  });
  const [movieCast, loadingMovieCast, errorMovieCast] = useData(`/movie/${id}/credits`, {
    language: "ru-RU",
  });

  return (
    <ThemeProvider theme={theme}>
      {loadingMovieDetails ? (
        <Loader display='flex' width='100%' />
      ) : (
        <>
          <Fade in={!loadingMovieDetails} style={{ transitionDelay: "300ms" }}>
            <img
              className='movie-backdrop'
              onLoad={() => setBackdropLoading(false)}
              src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`}
              style={{ opacity: backdropLoading ? 0 : 1, transition: "1s opacity" }}
            ></img>
          </Fade>
          <Box className='movie-wrapper' sx={{ mt: 4 }}>
            <Box className='movie-details'>
              <Fade in={!loadingMovieDetails} style={{ transitionDelay: "150ms" }}>
                <Box className='movie-poster' sx={{ width: "45%", height: "100%", mt: 1 }}>
                  <img src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} />
                </Box>
              </Fade>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Fade in={!loadingMovieDetails} style={{ transitionDelay: "300ms" }}>
                  <Box>
                    <Typography sx={{ fontWeight: "500", fontSize: "1.3em", mr: 3, width: "100%" }}>{movieDetails.title}</Typography>
                    <Typography sx={{ color: "gray", mb: 2, fontSize: "0.7em" }}>{movieDetails.original_title}</Typography>
                  </Box>
                </Fade>
                <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
                  <Fade in={!loadingMovieDetails} style={{ transitionDelay: "600ms" }}>
                    <Box>
                      <Typography className='movie-overview'>{movieDetails.overview}</Typography>
                    </Box>
                  </Fade>
                  <Fade in={!loadingMovieDetails} style={{ transitionDelay: "900ms" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Rating
                        precision={0.1}
                        size='medium'
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
                      <Fade in={!loadingMovieTrailers} style={{ transitionDelay: "1200ms" }}>
                        <Button sx={{ width: "20%", mt: 2 }} onClick={() => setIsOpenModalTrailer(true)}>
                          Смотреть трейлер
                        </Button>
                      </Fade>
                    </>
                  )}
                  {!loadingMovieTrailers && movieTrailers.results.length === 0 && (
                    <Fade in={!loadingMovieTrailers} style={{ transitionDelay: "1200ms" }}>
                      <Typography sx={{ mt: 2 }}>Трейлеры отсутствуют</Typography>
                    </Fade>
                  )}
                </Box>
                {!loadingMovieCast && <CarouselContainer cast={movieCast.cast} />}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </ThemeProvider>
  );
};

export default MoviePage;
