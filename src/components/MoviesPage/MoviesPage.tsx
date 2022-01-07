import { ThemeProvider } from "@emotion/react";
import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Rating, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { theme } from "../../theme/theme";
import FiltersContainer from "./Filters/FiltersContainer/FiltersContainer";
import Loader from "./Loader/Loader";
import PaginationCont from "./Pagination/PaginationCont";

interface MoviesPageProps {
  data: any;
  loading: boolean;
  error?: any;
}

const MoviesPage: FC<MoviesPageProps> = ({ data, loading, error }) => {
  console.log("data: ", data);

  if (error.length !== 0) {
    return <div>Ошибка! {error[0]}</div>;
  }
  return (
    <Box
      sx={{
        mt: 2,
        display: "flex",
        flexWrap: "nowrap",
      }}
    >
      <Box>
        <Box sx={{ display: "flex", justifyContent: "start", flexDirection: "column" }}>
          <FiltersContainer />
          <PaginationCont />
        </Box>
      </Box>
      <div>
        {loading && data ? (
          <Loader />
        ) : (
          <>
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "start", width: "70vw" }}>
              {data.results.map((movie: any) => {
                return (
                  <ThemeProvider theme={theme} key={movie.id}>
                    <Box
                      sx={{
                        p: 1.5,
                        display: "flex",
                        backgroundColor: "$backgroundColor",
                        justifyContent: "start",
                        width: "33vw",
                        flex: "1 1 auto",
                      }}
                    >
                      <Card sx={{ display: "flex", flexDirection: "row", backgroundColor: "#383b47", color: "white", ml: 1.5 }}>
                        <CardMedia
                          component='img'
                          src={
                            movie.poster_path === null
                              ? `https://cdn.shopk.it/assets/store/img/no-img.png`
                              : `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
                          }
                          sx={{ width: "45%" }}
                        />
                        <CardContent sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
                          <Typography gutterBottom variant='h5' component='div'>
                            {movie.title}
                          </Typography>
                          <Typography component='legend'>Rating: {movie.vote_average} stars</Typography>
                          <Rating precision={0.1} size='small' readOnly defaultValue={movie.vote_average} max={10} sx={{ color: "$primaryColor" }} />
                          <Typography sx={{ mt: 1 }}>
                            {movie.overview.length > 150 ? movie.overview.substring(0, 150) + "..." : movie.overview}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Box>
                  </ThemeProvider>
                );
              })}
            </Box>
          </>
        )}
      </div>
    </Box>
  );
};

export default MoviesPage;
