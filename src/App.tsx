import MoviesPage from "./components/MoviesPage/MoviesPage";
import "./App.scss";
import Header from "./components/Header/Header";
import AppRouter from "./components/AppRouter/AppRouter";
import LoginModal from "./components/MoviesPage/LoginModal/LoginModal";
import { Box, Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme/theme";
import { useEffect, useState } from "react";

  return (
        <>
          <Header />
          <LoginModal />
          <AppRouter />
                </>
  );
};

export default App;
