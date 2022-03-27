import { Fab } from "@mui/material";
import "./PageUp.scss";
import { theme } from "../../../theme/theme";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";
import React, { useEffect, useState } from "react";

const PageUp = React.memo(() => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [style, setStyle] = useState<object>({ opacity: "0", transition: "0.3s opacity" });

  window.onscroll = (event: Event) => {
    if (document.documentElement.scrollTop > 850) {
      setIsVisible(true);
      setStyle({ opacity: "1", transition: "0.3s opacity" });
    } else if (document.documentElement.scrollTop < 200) {
      setIsVisible(false);
      setStyle({ opacity: "0", transition: "0.3s opacity" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Fab sx={style} onClick={scrollToTop}>
      <UpIcon />
    </Fab>
  );
});

export default PageUp;
