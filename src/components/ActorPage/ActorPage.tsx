import { ThemeProvider } from "@emotion/react";
import { Fade, Box, Typography, Rating, Chip, Button } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../hooks/useData";
import { theme } from "../../theme/theme";
import Loader from "../MoviesPage/Loader/Loader";
import "./ActorPage.scss";

const ActorPage = () => {
  const { id } = useParams();
  const [backdropLoading, setBackdropLoading] = useState<boolean>(true);

  console.log(id);

  const [actorDetails, loadingActorDetails, errorActorDetails] = useData(`/person/${id}`, {
    language: "ru_RU",
  });
  console.log("actorDetails: ", actorDetails);

  return (
    <ThemeProvider theme={theme}>
      {loadingActorDetails ? (
        <Loader display='flex' width='100%' />
      ) : (
        <>
          <Box className='actor-wrapper' sx={{ mt: 4 }}>
            <Box className='actor-details'>
              <Fade in={!loadingActorDetails} style={{ transitionDelay: "150ms" }}>
                <Box className='actor-poster' sx={{ width: "45%", height: "100%", mt: 1 }}>
                  <img src={`https://image.tmdb.org/t/p/w500/${actorDetails.profile_path}`} />
                </Box>
              </Fade>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Fade in={!loadingActorDetails} style={{ transitionDelay: "300ms" }}>
                  <Box>
                    <Typography sx={{ fontWeight: "500", fontSize: "1.3em", mr: 3, width: "100%" }}>{actorDetails.name}</Typography>
                    {!loadingActorDetails && actorDetails.also_known_as.length !== 0 && (
                      <Typography sx={{ color: "gray", mb: 2, fontSize: "0.7em" }}>
                        {actorDetails.also_known_as.filter((name: string) => name.match(/^[?!,.а-яА-ЯёЁ0-9\s]+$/))[0]}
                      </Typography>
                    )}
                  </Box>
                </Fade>
                <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
                  <Fade in={!loadingActorDetails} style={{ transitionDelay: "600ms" }}>
                    <Box className='actor-overview'>
                      <Typography sx={{ mb: 2 }}>{`Дата рождения: ${actorDetails.birthday}`}</Typography>
                      <Typography>{`Биография: ${actorDetails.biography}`}</Typography>
                    </Box>
                  </Fade>
                  <Fade in={!loadingActorDetails} style={{ transitionDelay: "900ms" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography component='legend'>{actorDetails.vote_average}</Typography>
                    </Box>
                  </Fade>
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </ThemeProvider>
  );
};

export default ActorPage;
