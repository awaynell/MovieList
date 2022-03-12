import MoviesPage from "./components/MoviesPage/MoviesPage";
import "./App.scss";
import Header from "./components/Header/Header";
import AppRouter from "./components/AppRouter/AppRouter";
import LoginModal from "./components/MoviesPage/LoginModal/LoginModal";
import { Box, Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme/theme";
import { useEffect, useState } from "react";

export const App = () => {
  const [mobileView, setMobileView] = useState<boolean>(false);
  useEffect(() => {
    function resizeOnMobile() {
      if (window.innerWidth < 876) {
        setMobileView(true);
      } else {
        setMobileView(false);
      }
    }
    // window.addEventListener("resize", resizeOnMobile);

    return () => window.removeEventListener("resize", resizeOnMobile);
  });

  return (
    <>
      {mobileView ? (
        <Box sx={{ width: "100vw", height: "100vh", justifyContent: "center", display: "flex", alignItems: "center" }}>
          Мобильная версия появится позже
        </Box>
      ) : (
        <>
          <Header />
          <LoginModal />
          <AppRouter />
        </>
      )}
    </>
  );
};

export default App;
