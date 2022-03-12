import { ThemeProvider } from "@emotion/react";
import { Box } from "@mui/material";
import React from "react";
import Genres from "./Genres/Genres";
import SortBy from "./SortBy/SortBy";
import { theme } from "../../../../theme/theme";
import "./FiltersContainer.scss";

const FiltersContainer = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box className='filters'>
        <Genres />
        <SortBy />
      </Box>
    </ThemeProvider>
  );
};

export default FiltersContainer;
