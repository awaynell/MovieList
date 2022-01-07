import { ThemeProvider } from "@emotion/react";
import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { theme } from "../../../theme/theme";

const Loader = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "50vw", height: "50vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress disableShrink color='primary' />
      </Box>
    </ThemeProvider>
  );
};

export default Loader;
