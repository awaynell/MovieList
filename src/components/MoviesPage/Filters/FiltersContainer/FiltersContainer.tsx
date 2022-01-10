import { Box } from "@mui/material";
import React from "react";
import Genres from "./Genres/Genres";
import SortBy from "./SortBy/SortBy";

const FiltersContainer = () => {
  return (
    <>
      <Genres />
      <SortBy />
    </>
  );
};

export default FiltersContainer;
