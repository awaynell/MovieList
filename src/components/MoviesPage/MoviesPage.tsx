import { ThemeProvider } from "@emotion/react";
import { Box, Card, CardContent, CardMedia, CircularProgress, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { theme } from "../../theme/theme";
import FiltersContainer from "./Filters/FiltersContainer/FiltersContainer";
import PaginationCont from "./Pagination/Pagination";

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
    <div>
      {loading && data.length === 0 ? (
        <CircularProgress />
      ) : (
        <>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              flexWrap: "nowrap",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "start", flexDirection: "column" }}>
              <FiltersContainer />
              <PaginationCont />
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", width: "80vw" }}>
              {data.results.map((movie: any) => {
                return (
                  <ThemeProvider theme={theme} key={movie.id}>
                    <Box
                      sx={{
                        p: 1.5,
                        display: "flex",
                        backgroundColor: "$backgroundColor",
                        alignItems: "baseline",
                        width: "30vw",
                      }}
                    >
                      <Card sx={{ display: "flex", flexDirection: "column", backgroundColor: "#383b47", color: "white", ml: 1.5, width: "85%" }}>
                        <CardMedia
                          component='img'
                          src={
                            movie.poster_path === null
                              ? `https://greenhousevillage.ru/wp-content/uploads/2021/06/photo_default.png`
                              : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                          }
                          sx={{ width: "100%", height: "55vh" }}
                        />
                        <CardContent>
                          <Typography gutterBottom variant='h5' component='div'>
                            {movie.title}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Box>
                  </ThemeProvider>
                );
              })}
            </Box>
          </Box>
        </>
      )}
    </div>
  );
};

export default MoviesPage;
