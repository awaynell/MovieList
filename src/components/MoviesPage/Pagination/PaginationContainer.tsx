import React, { FC, SetStateAction } from "react";
import { Box } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useDispatch, useSelector } from "react-redux";
import { currentPage, totalPages } from "../../../redux/selectors";
import Pagination from "@mui/material/Pagination";
import "./Pagination.scss";
import { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../../theme/theme";
import { setCurrentPage } from "../../../redux/actionCreators";

interface PaginationProps {
  allOfPages: any;
  setPage: any;
}

const PaginationContainer: FC<PaginationProps> = React.memo(({ allOfPages, setPage }) => {
  const curPage = useSelector(currentPage);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<unknown>, page: number): void => {
    setPage(page);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className='pagination'>
        <Pagination
          variant='text'
          color='primary'
          defaultPage={curPage ? curPage : 1}
          page={curPage}
          siblingCount={1}
          boundaryCount={1}
          hideNextButton={document.body.offsetWidth <= 1024 ? false : true}
          hidePrevButton={document.body.offsetWidth <= 1024 ? false : true}
          size='small'
          count={allOfPages > 500 ? 500 : allOfPages}
          onChange={handleChange}
          sx={{ color: "red" }}
        />
      </Box>
    </ThemeProvider>
  );
});

export default PaginationContainer;
