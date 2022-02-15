import { ThemeProvider } from "@emotion/react";
import { Zoom, Box, Card, Fade, CardMedia, CardContent, Typography, Rating } from "@mui/material";
import React, { FC } from "react";
import { theme } from "../../theme/theme";
import Loader from "./Loader/Loader";

interface MovieListProps {
  films: any;
  imgIsLoad: boolean;
  setImgIsLoad: any;
}

const MovieList: FC<MovieListProps> = ({ films, imgIsLoad, setImgIsLoad }) => {
  console.log(films.results.slice(0, 10));

  return films.results.slice(0, 10).map((movie: any, i: number) => {
    return (
      <ThemeProvider theme={theme} key={movie.id}>
        <Zoom in={movie.length !== 0} unmountOnExit>
          <Box
            sx={{
              p: 1.5,
              display: "flex",
              backgroundColor: "$backgroundColor",
              width: "33vw",
              flex: "1 1 auto",
            }}
          >
            <Card sx={{ display: "flex", flexDirection: "row", backgroundColor: "#383b47", color: "white", ml: 1.5, width: "100%" }}>
              <Loader display={imgIsLoad ? "flex" : "none"} width='50%' />
              <Fade in={!imgIsLoad} style={{ transitionDelay: "100ms" }}>
                <CardMedia
                  component='img'
                  onLoad={() => setImgIsLoad(false)}
                  src={
                    movie.poster_path === null
                      ? `https://cdn.shopk.it/assets/store/img/no-img.png`
                      : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  }
                  sx={[
                    { width: "50%" },
                    imgIsLoad && {
                      display: "none",
                    },
                    !imgIsLoad && {
                      display: "",
                    },
                  ]}
                />
              </Fade>
              <CardContent sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
                <Typography gutterBottom variant='h5' component='div'>
                  {movie.title}
                </Typography>
                <Typography component='legend'>Рейтинг: {movie.vote_average} stars</Typography>
                <Rating precision={0.1} size='small' readOnly defaultValue={movie.vote_average} max={10} sx={{ color: "$primaryColor" }} />
                <Typography sx={{ mt: 1, width: "100%" }}>
                  {movie.overview.length === 0
                    ? "Описание отсутствует"
                    : movie.overview.length > 150
                    ? movie.overview.substring(0, 150) + "..."
                    : movie.overview}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Zoom>
      </ThemeProvider>
    );
  });
};

export default MovieList;
