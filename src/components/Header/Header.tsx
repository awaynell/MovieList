import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Box, Button, IconButton, Link, Menu, MenuItem, MenuList, TextField, Toolbar, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { isShowModal, setSearchPage, setSearchQuery } from "../../redux/actionCreators";
import { userInfo } from "../../redux/selectors";
import { theme } from "../../theme/theme";
import { ADD_USERINFO_START, DELETE_USERINFO } from "../../redux/actionTypes";
import { getSessionIDFromCookie } from "../../helpers/authHelpers/getSessionIDFromCookie";
import { getUser, getUserInfo } from "../../helpers/authHelpers/getUser";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import "./Header.scss";

const Header = React.memo(() => {
  const [avatarBackground, setAvatarBackground] = useState<string>("gray");
  const [openMobileMenu, setOpenMobieMenu] = useState<boolean>(false);
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
            <Box
              className='searchInput-wrapper'
              sx={[{ order: userInfoData.id ? 3 : 0 }]}
              component='form'
              onFocus={(e: EventTarget | any) => {
                const target: HTMLInputElement | HTMLTextAreaElement = e.target.offsetParent.offsetParent;
                console.log(target);
                target.style.width = "100%";
              }}
              onBlur={(e: EventTarget | any) => {
                const target: HTMLInputElement | HTMLTextAreaElement = e.target.offsetParent.offsetParent;
                console.log(target);
                target.style.width = "50%";
              }}
            >
              <TextField
                placeholder='Пишите для поиска..'
                size='small'
                onChange={(e) => {
                  handleChange(e.target.value);
                }}
              ></TextField>
            </Box>
            {userInfoData.id ? (
              <>
                <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", justifyContent: "center", width: "50%", mr: "auto" }}>
                  <Button onClick={() => navigate("favourite")}>Favourite movies</Button>
                  <Button onClick={() => navigate("watchlist")}>My watchlist</Button>
                </Box>
                <Box
                  sx={{
                    display: { xs: "block", sm: "none" },
                  }}
                >
                  <IconButton
                    size='large'
                    aria-label='account of current user'
                    aria-controls='menu-appbar'
                    aria-haspopup='true'
                    color='inherit'
                    onClick={() => setOpenMobieMenu(true)}
                    sx={{ order: 3 }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    open={openMobileMenu}
                    onClose={() => setOpenMobieMenu(false)}
                    anchorOrigin={{
                      vertical: "center",
                      horizontal: "center",
                    }}
                  >
                    <MenuList sx={{ width: "100%", height: "100%", p: 0, m: 0 }}>
                      <MenuItem onClick={() => setOpenMobieMenu(false)}>
                        <Button onClick={() => navigate("favourite")} sx={{ width: "100%", fontSize: "1rem" }}>
                          Favourite movies
                        </Button>
                      </MenuItem>
                      <MenuItem onClick={() => setOpenMobieMenu(false)}>
                        <Button onClick={() => navigate("watchlist")} sx={{ width: "100%", fontSize: "1rem" }}>
                          My watchlist
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        {userInfoData.avatar.tmdb.avatar_path === null ? (
                          <Avatar sx={{ backgroundColor: avatarBackground, mr: 0.5 }} />
                        ) : (
                          <Avatar alt='Remy Sharp' src={`https://image.tmdb.org/t/p/w500/${userInfoData.avatar.tmdb.avatar_path}`} sx={{ mr: 0.5 }} />
                        )}
                        <Typography sx={{ mr: 2, width: "100%", fontSize: "1rem", justifyContent: "center" }}>{userInfoData.username}</Typography>
                      </MenuItem>
                      <MenuItem onClick={() => setOpenMobieMenu(false)} sx={{ mr: 2, width: "100%", fontSize: "1rem", justifyContent: "center" }}>
                        <Button variant='contained' color='primary' onClick={() => dispatch({ type: DELETE_USERINFO })}>
                          <Typography fontWeight={400} letterSpacing={1.2} color='#efe1ce'>
                            Выйти
                          </Typography>
                        </Button>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
                <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", order: 4 }}>
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
