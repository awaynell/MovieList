import { ThemeProvider } from "@emotion/react";
import { Box } from "@mui/material";
import React from "react";
import Genres from "./Genres/Genres";
import SortBy from "./SortBy/SortBy";
import { theme } from "../../../../theme/theme";

const FiltersContainer = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Genres />
        <SortBy />
      </Box>
    </ThemeProvider>
  );
};

export default FiltersContainer;
