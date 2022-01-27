import { Fab } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import "./PageUp.scss";
import { theme } from "../../../theme/theme";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";
import React, { useState } from "react";

const PageUp = React.memo(() => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [dynamicHeight, setDynamicHeight] = useState<number>(0);
  console.log("dynamicHeight: ", dynamicHeight);

  window.onscroll = (event: Event) => {
    if (window.scrollY > 1500) {
      console.log("work");
      setIsVisible(true);
      console.log("isVisible", isVisible);
    } else {
      setIsVisible(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Fab sx={{ display: "block" }}>
        <UpIcon />
      </Fab>
    </ThemeProvider>
  );
});

export default PageUp;
