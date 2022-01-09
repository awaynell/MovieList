import React from "react";
import { Box } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useDispatch, useSelector } from "react-redux";
import { totalPages } from "../../../redux/selectors";
import Pagination from "@mui/material/Pagination";
import "./Pagination.scss";
import { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../../theme/theme";
import { setPage } from "../../../redux/actionCreators";

const PaginationCont = React.memo(() => {
  const allOfPages = useSelector(totalPages);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setPage(page));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%" }}>
        <Pagination
          variant='text'
          color='primary'
          defaultPage={1}
          siblingCount={1}
          size='small'
          count={allOfPages > 500 ? 500 : allOfPages}
          onChange={handleChange}
          sx={{ color: "red" }}
        />
      </Box>
    </ThemeProvider>
  );
});

export default PaginationCont;
