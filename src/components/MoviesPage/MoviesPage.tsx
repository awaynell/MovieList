import { ThemeProvider } from "@emotion/react";
import { Box, Card, CardContent, CardMedia, CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { theme } from "../../theme/theme";

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
        <Grid container spacing={1} sx={{ mt: 1, mb: 1 }}>
          {/* <div style={{}}>Filters</div> */}
          {data.results.map((movie: any) => {
            return (
              <ThemeProvider theme={theme}>
                <Grid item xs={6} sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      backgroundColor: "#383b47",
                      border: "1px solid red",
                      color: "#efe1ce",
                      width: "45vw",
                    }}
                    // onMouseOver={() => {
                    //   console.log("mouse over");
                    //   setIsMouseOver(true);
                    // }}
                    // onMouseLeave={() => {
                    //   console.log("mouse over");
                    //   setIsMouseOver(false);
                    // }}
                  >
                    <CardMedia component='img' sx={{}} src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} />
                    <Box sx={{ display: "flex" }}>
                      {isMouseOver ? (
                        <CardContent sx={{}}>
                          <Typography component='div' variant='h5'>
                            {movie.title}
                          </Typography>
                        </CardContent>
                      ) : (
                        <></>
                      )}
                    </Box>
                  </Card>
                </Grid>
              </ThemeProvider>
            );
          })}
        </Grid>
      )}
    </div>
  );
};

export default MoviesPage;
