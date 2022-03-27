import { Box } from "@mui/material";
import React from "react";
import Genres from "./Genres/Genres";
import SortBy from "./SortBy/SortBy";
import { theme } from "../../../../theme/theme";
import "./FiltersContainer.scss";

const FiltersContainer = () => {
  return (
    <Box className='filters'>
      <Genres />
      <SortBy />
    </Box>
  );
};

export default FiltersContainer;
