import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Box, Button, Link, TextField, Toolbar, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { isShowModal, setSearchPage, setSearchQuery } from "../../redux/actionCreators";
import { userInfo } from "../../redux/selectors";
import { theme } from "../../theme/theme";
import { ADD_USERINFO_START, DELETE_USERINFO } from "../../redux/actionTypes";
import { getSessionIDFromCookie } from "../../helpers/authHelpers/getSessionIDFromCookie";
import { getUser, getUserInfo } from "../../helpers/authHelpers/getUser";
import { useNavigate } from "react-router-dom";

const Header = React.memo(() => {
  const [avatarBackground, setAvatarBackground] = useState<string>("gray");
  const dispatch = useDispatch();
  const userInfoData = useSelector(userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (getSessionIDFromCookie().value !== undefined) {
      dispatch({ type: ADD_USERINFO_START });
    }
    setAvatarBackground(`#${Math.floor(Math.random() * 16777215).toString(15)}`);
    console.log("render");
  }, []);

  const handleChange = (searchQuery: string) => {
    if (searchQuery.length === 0) {
      return;
    }
    dispatch(setSearchQuery(searchQuery));
    dispatch(setSearchPage(1));
    navigate(`search`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, height: "8.5vh" }} className='header'>
        <AppBar position='static' sx={{ backgroundColor: "transparent", color: "#efe1ce" }}>
          <Toolbar sx={{ display: "flex" }}>
            <Typography
              fontWeight={300}
              letterSpacing={1.25}
              variant='h6'
              component='div'
              sx={{ cursor: "pointer", whiteSpace: "nowrap", mr: "auto" }}
              onClick={() => navigate("")}
            >
              MOVIE LIST
            </Typography>
            <TextField
              sx={{ width: "10%", ml: 2, mr: 2, mb: 1, display: userInfoData.id ? "none" : "block" }}
              size='small'
              onChange={(e) => {
                handleChange(e.target.value.trim());
              }}
            ></TextField>
            {userInfoData.id ? (
              <>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                  <Button onClick={() => navigate("favourite")}>Favourite movies</Button>
                  <Button onClick={() => navigate("watchlist")}>My watchlist</Button>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
                  <TextField
                    sx={{ width: "50%", ml: 2, mr: 2 }}
                    size='small'
                    onChange={(e) => {
                      handleChange(e.target.value);
                    }}
                  ></TextField>
                  {userInfoData.avatar.tmdb.avatar_path === null ? (
                    <Avatar sx={{ backgroundColor: avatarBackground, mr: 0.5 }} />
                  ) : (
                    <Avatar alt='Remy Sharp' src={`https://image.tmdb.org/t/p/w500/${userInfoData.avatar.tmdb.avatar_path}`} sx={{ mr: 0.5 }} />
                  )}
                  <Typography sx={{ mr: 2 }}>{userInfoData.username}</Typography>
                  <Button variant='contained' color='primary' onClick={() => dispatch({ type: DELETE_USERINFO })}>
                    <Typography fontWeight={400} letterSpacing={1.2} color='#efe1ce'>
                      Выйти
                    </Typography>
                  </Button>
                </Box>
              </>
            ) : (
              <Button variant='contained' color='primary' onClick={() => dispatch(isShowModal(true))}>
                <Typography fontWeight={400} letterSpacing={1.2} color='#efe1ce'>
                  Войти
                </Typography>
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
});

export default Header;
