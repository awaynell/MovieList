import "./MoviePage.scss";
import { usePalette } from "react-palette";
import { Box, Button, Chip, Fade, hexToRgb, Rating, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../hooks/useData";
import { theme } from "../../theme/theme";
import Loader from "../MoviesPage/Loader/Loader";
import StarIcon from "@mui/icons-material/Star";
import ModalTrailer from "./ModalTrailer/ModalTrailer";
import CarouselContainer from "./Carousel/CarouselCastContainer";

const MoviePage = () => {
  const { id } = useParams();
  const [isOpenModalTrailer, setIsOpenModalTrailer] = useState<boolean>(false);
  const [backdropLoading, setBackdropLoading] = useState<boolean>(true);
  const [dominantColor, setDominantColor] = useState<string | undefined>("transparent");

  const [movieDetails, loadingMovieDetails, error] = useData(`/movie/${id}`, {
    language: "ru-RU",
  });
  const [movieTrailers, loadingMovieTrailers, errorMovieTrailers] = useData(`/movie/${id}/videos`, {
    language: "ru-RU",
  });
  const [movieCast, loadingMovieCast, errorMovieCast] = useData(`/movie/${id}/credits`, {
    language: "ru-RU",
  });

  const { data: palette, loading: loadingPalette } = usePalette(
    `https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`,
  );

  window.onresize = () => {
    !!palette && getADominantColor();
  };
  window.onload = () => {
    !!palette && getADominantColor();
  };

  const getADominantColor = () => {
    if (document.body.offsetWidth <= 768) {
      setDominantColor(palette.darkMuted);
    } else if (document.body.offsetWidth > 768) {
      setDominantColor("transparent");
    }
  };

  useEffect(() => {
    if (!!palette) {
      getADominantColor();
    }
  }, [loadingMovieDetails, palette]);

  return (
    <>
      {loadingMovieDetails ? (
        <Loader display='flex' width='100%' />
      ) : (
        <>
          <Box className='movie-wrapper' style={{}}>
            <Fade in={!loadingMovieDetails} style={{ transitionDelay: "300ms" }}>
              <img
                className='movie-backdrop'
                onLoad={() => setBackdropLoading(false)}
                src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`}
                style={{ opacity: backdropLoading ? 0 : 1, transition: "1s opacity" }}
              />
            </Fade>
            <Box className='movie-details'>
              <Fade in={!loadingMovieDetails} style={{ transitionDelay: "150ms" }}>
                <Box className='movie-poster'>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
                    onClick={() =>
                      (window.location.href = `https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`)
                    }
                  />
                  {!loadingMovieTrailers && movieTrailers.results.length !== 0 && (
                    <>
                      <ModalTrailer
                        youtubeID={movieTrailers.results[0].key}
                        isOpen={isOpenModalTrailer}
                        setIsOpen={setIsOpenModalTrailer}
                      />
                      <Fade in={!loadingMovieTrailers} style={{ transitionDelay: "1200ms" }}>
                        <Button
                          className='movie-btnTrailer'
                          sx={{}}
                          onClick={() => setIsOpenModalTrailer(true)}>
                          Смотреть трейлер
                        </Button>
                      </Fade>
                    </>
                  )}
                </Box>
              </Fade>
              <Box className='movie-titles'>
                <Fade in={!loadingMovieDetails} style={{ transitionDelay: "300ms" }}>
                  <Box>
                    <Typography className='movie-title'>{movieDetails.title}</Typography>
                    <Typography className='movie-titleOriginal'>
                      {movieDetails.original_title}
                    </Typography>
                  </Box>
                </Fade>
                <Box className='movie-ins'>
                  <Fade in={!loadingMovieDetails} style={{ transitionDelay: "600ms" }}>
                    <Box>
                      <Typography className='movie-overview'>{movieDetails.overview}</Typography>
                    </Box>
                  </Fade>
                  <Fade in={!loadingMovieDetails} style={{ transitionDelay: "900ms" }}>
                    <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                      <Rating
                        precision={0.1}
                        size={document.body.offsetWidth < 376 ? "small" : "medium"}
                        readOnly
                        defaultValue={movieDetails.vote_average}
                        max={10}
                        emptyIcon={
                          <StarIcon style={{ opacity: 0.5, color: "#efe1ce" }} fontSize='inherit' />
                        }
                      />
                      <Typography component='legend'>{movieDetails.vote_average}</Typography>
                    </Box>
                  </Fade>
                  <Fade in={!loadingMovieDetails} style={{ transitionDelay: "1000ms" }}>
                    <Box sx={{ display: "flex", flexWrap: "wrap", fontSize: "1.5rem" }}>
                      {movieDetails.genres.map(({ id, name }: { id: number; name: string }) => {
                        return <Chip key={id} label={name} />;
                      })}
                    </Box>
                  </Fade>
                  {!loadingMovieTrailers && movieTrailers.results.length === 0 && (
                    <Fade in={!loadingMovieTrailers} style={{ transitionDelay: "1200ms" }}>
                      <Typography sx={{ mt: 2 }}>Трейлеры отсутствуют</Typography>
                    </Fade>
                  )}
                </Box>
                <Fade
                  in={!loadingPalette && !loadingMovieCast}
                  style={{ transitionDelay: "1300ms" }}>
                  <div className='movie-actors' style={{ backgroundColor: `${dominantColor}` }}>
                    <CarouselContainer cast={movieCast.cast} />
                  </div>
                </Fade>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default MoviePage;
