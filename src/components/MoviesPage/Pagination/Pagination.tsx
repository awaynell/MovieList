import { ButtonGroup, Button, PaginationItem, Box } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useDispatch, useSelector } from "react-redux";
import { currentPage, totalPages } from "../../../redux/selectors";
import Pagination from "@mui/material/Pagination";
import "./Pagination.scss";
import { useState } from "react";
import { setPage } from "../../../redux/actionCreators";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../../theme/theme";

const PaginationCont = () => {
  const allOfPages = useSelector(totalPages);

  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setPage(page));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ pl: 1, width: "85%" }}>
        <Pagination
          variant='text'
          color='primary'
          defaultPage={1}
          size='small'
          count={allOfPages > 500 ? 500 : allOfPages}
          onChange={handleChange}
          sx={{ color: "red" }}
        />
      </Box>
    </ThemeProvider>
  );
};

export default PaginationCont;
