import { Fade, Box, Typography, Rating, Chip, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Lazy, Mousewheel } from "swiper";
import { useData } from "../../hooks/useData";
import { theme } from "../../theme/theme";
import Loader from "../MoviesPage/Loader/Loader";
import "./ActorPage.scss";

import "swiper/css";
import "swiper/css/mousewheel";
import { usePalette } from "react-palette";

const ActorPage = () => {
  const { id } = useParams();
  const [backdropLoading, setBackdropLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  console.log(id);

  const [actorDetails, loadingActorDetails, errorActorDetails] = useData(`/person/${id}`, {
    language: "ru-RU",
  });

  const [movieCredits, loadingMovieCredits, errorMovieCredits] = useData(
    `/person/${id}/movie_credits`,
    {
      language: "ru-RU",
    },
  );
  console.log("movieCredits: ", movieCredits);

  const { data: palette, loading: loadingPalette } = usePalette(
    `https://image.tmdb.org/t/p/w500/${actorDetails.profile_path}`,
  );
  console.log("palette: ", palette);

  return (
    <>
      {loadingActorDetails ? (
        <Loader display='flex' width='100%' />
      ) : (
        <>
          <Box className='actor-wrapper' sx={{ pt: 4 }}>
            <Box className='actor-details'>
              <Fade in={!loadingActorDetails} style={{ transitionDelay: "150ms" }}>
                <Box className='actor-poster' sx={{ width: "45%", height: "100%", mt: 1 }}>
                  <img src={`https://image.tmdb.org/t/p/w500/${actorDetails.profile_path}`} />
                </Box>
              </Fade>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Fade in={!loadingActorDetails} style={{ transitionDelay: "300ms" }}>
                  <Box>
                    <Typography sx={{ fontWeight: "500", fontSize: "1.3em", mr: 3, width: "100%" }}>
                      {actorDetails.name}
                    </Typography>
                    {!loadingActorDetails && actorDetails.also_known_as.length !== 0 && (
                      <Typography sx={{ color: "gray", mb: 2, fontSize: "0.7em" }}>
                        {
                          actorDetails.also_known_as.filter((name: string) =>
                            name.match(/^[?!,.а-яА-ЯёЁ0-9\s]+$/),
                          )[0]
                        }
                      </Typography>
                    )}
                  </Box>
                </Fade>
                <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
                  <Fade in={!loadingActorDetails} style={{ transitionDelay: "600ms" }}>
                    <Box className='actor-overview'>
                      <Typography
                        sx={{ mb: 2 }}>{`Дата рождения: ${actorDetails.birthday}`}</Typography>
                      <Typography>{`Биография: ${actorDetails.biography}`}</Typography>
                    </Box>
                  </Fade>
                  <Fade in={!loadingMovieCredits} style={{ transitionDelay: "1000ms" }}>
                    <Box className='actor-movieCarousel'>
                      {!loadingMovieCredits && (
                        <Swiper
                          modules={[Lazy, Mousewheel]}
                          lazy={true}
                          spaceBetween={20}
                          slidesPerView={2}
                          mousewheel={true}
                          style={{
                            opacity: loadingMovieCredits ? 0 : 1,
                            transition: "1s opacity",
                          }}
                          breakpoints={{
                            1200: {
                              slidesPerView: 5,
                              spaceBetween: 65,
                            },
                            1000: {
                              slidesPerView: 4,
                              spaceBetween: 65,
                            },
                            700: {
                              slidesPerView: 5,
                              spaceBetween: 90,
                            },
                            300: {
                              slidesPerView: 3,
                              spaceBetween: 50,
                            },
                          }}>
                          {movieCredits.cast
                            .filter((movie: any) => movie.poster_path !== null)
                            .map((movie: any, i: number) => {
                              return (
                                <SwiperSlide key={movie.id} style={{ width: "90%" }}>
                                  <Box
                                    sx={{ width: "90%", cursor: "pointer" }}
                                    onClick={() => navigate(`/movie/${movie.id}`)}>
                                    <img
                                      style={{
                                        height: "25vh",
                                        border: "none",
                                        borderRadius: "5px",
                                      }}
                                      className='swiper-lazy'
                                      data-src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                    />
                                    <Typography
                                      sx={{ opacity: 0 }}
                                      className='swiper-lazy'
                                      data-src={null}>
                                      {movie.title}
                                    </Typography>
                                  </Box>
                                </SwiperSlide>
                              );
                            })}
                        </Swiper>
                      )}
                    </Box>
                  </Fade>
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default ActorPage;
