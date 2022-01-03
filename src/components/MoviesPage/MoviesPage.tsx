import { ThemeProvider } from "@emotion/react";
import { Box, Card, CardContent, CardMedia, CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { theme } from "../../theme/theme";
import FiltersContainer from "../Filters/FiltersContainer/FiltersContainer";

interface MoviesPageProps {
  data: any;
  loading: boolean;
  error?: any;
}

const MoviesPage: FC<MoviesPageProps> = ({ data, loading, error }) => {
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  console.log("data: ", data);
  return (
    <div>
      {data.length === 0 ? (
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
            <Box sx={{ flex: "0 0 25vw" }}>
              <FiltersContainer />
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "start", width: "70vw" }}>
              {data.results.map((movie: any) => {
                return (
                  <ThemeProvider theme={theme}>
                    <Box
                      sx={{
                        p: 1.5,
                        display: "flex",
                        backgroundColor: "#363945",
                        width: "30vw",
                      }}
                    >
                      <Card sx={{ display: "flex", flexDirection: "column", backgroundColor: "#383b47", color: "white", ml: 1.5, width: "100%" }}>
                        <CardMedia
                          component='img'
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          sx={{ width: "100%", height: "45vw" }}
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
