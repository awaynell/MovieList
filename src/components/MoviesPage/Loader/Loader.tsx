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
    <Box
      sx={{
        width: { width },
        height: { height },
        display: { display },
        alignItems: "center",
        justifyContent: "center",
        pt: 2,
      }}>
      <CircularProgress disableShrink color='primary' />
    </Box>
  );
};

export default Loader;
