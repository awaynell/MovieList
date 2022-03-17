import { ThemeProvider } from "@emotion/react";
import { Box, CircularProgress } from "@mui/material";
import React, { FC } from "react";
import { theme } from "../../../theme/theme";

interface LoaderProps {
  width: string;
  height?: string;
  display: string;
}

const Loader: FC<LoaderProps> = ({ width, height, display }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: { width }, height: { height }, display: { display }, alignItems: "center", justifyContent: "center", pt: 2 }}>
        <CircularProgress disableShrink color='primary' />
      </Box>
    </ThemeProvider>
  );
};

export default Loader;
