import { AppBar, Avatar, Box, Button, Toolbar, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isShowModal } from "../../redux/actionCreators";
import { userInfo } from "../../redux/selectors";
import { theme } from "../../theme/theme";
import { ADD_USERINFO_START, DELETE_USERINFO } from "../../redux/actionTypes";
import { getSessionIDFromCookie } from "../../helpers/authHelpers/getSessionIDFromCookie";
import { getUser, getUserInfo } from "../../helpers/authHelpers/getUser";

const Header = React.memo(() => {
  const dispatch = useDispatch();
  const userInfoData = useSelector(userInfo);

  useEffect(() => {
    if (getSessionIDFromCookie().value !== undefined) {
      dispatch({ type: ADD_USERINFO_START });
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static' sx={{ backgroundColor: "#282D3C", color: "#efe1ce" }}>
          <Toolbar>
            <Typography fontWeight={300} letterSpacing={1.25} variant='h6' component='div' sx={{ flexGrow: 1 }}>
              MOVIE LIST
            </Typography>
            {userInfoData.id ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {userInfoData.avatar.tmdb.avatar_path === null ? (
                  <Avatar sx={{ backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(15)}`, mr: 0.5 }} />
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
